#!/usr/bin/env node
const fs = require('fs');
const {google} = require('googleapis');
const Papa = require('papaparse');
const yargs = require('yargs/yargs');
const {hideBin} = require('yargs/helpers');

async function main() {
  const argv = yargs(hideBin(process.argv))
    .option('siteUrl', {type: 'string', demandOption: true, describe: 'GSC siteUrl (e.g. https://www.genially.com)'} )
    .option('ranges', {type: 'array', demandOption: true, describe: 'Pairs of start/end dates: start1 end1 start2 end2 ... (YYYY-MM-DD)'})
    .option('output', {type: 'string', default: 'gsc', describe: 'output file prefix'})
    .option('informational', {type: 'boolean', default: false, describe: 'apply simple Spanish informational filter on queries'})
    .argv;

  const auth = new google.auth.GoogleAuth({
    scopes: ['https://www.googleapis.com/auth/webmasters.readonly']
  });
  const authClient = await auth.getClient();
  const searchconsole = google.searchconsole({version: 'v1', auth: authClient});

  const ranges = argv.ranges; // array expected length multiple of 2
  if (ranges.length % 2 !== 0) throw new Error('ranges must contain pairs of start/end dates');

  const informationalRegex = /^(como|qué|que|por qué|porqué|cómo|cuando|cuándo|dónde|donde|cuál|cual|cómo hacer|cómo crear)/i;

  for (let i=0; i<ranges.length; i+=2) {
    const startDate = ranges[i];
    const endDate = ranges[i+1];
    console.log(`Fetching GSC rows for ${startDate} → ${endDate}`);

    const allRows = [];
    let startRow = 0;
    const rowLimit = 25000;
    while (true) {
      const req = {
        siteUrl: argv.siteUrl,
        requestBody: {
          startDate,
          endDate,
          dimensions: ['query','country','device'],
          rowLimit,
          startRow,
        }
      };

      const res = await searchconsole.searchanalytics.query(req);
      const rows = (res.data && res.data.rows) || [];
      if (!rows.length) break;

      for (const r of rows) {
        const [query, country, device] = r.keys || ['','',''];
        if (argv.informational && !informationalRegex.test(query)) continue;
        allRows.push({
          query,
          country,
          device,
          clicks: r.clicks || 0,
          impressions: r.impressions || 0,
          ctr: r.ctr || 0,
          position: r.position || 0,
        });
      }

      if (rows.length < rowLimit) break;
      startRow += rowLimit;
    }

    const file = `${argv.output}-${startDate}_to_${endDate}.csv`;
    fs.writeFileSync(file, Papa.unparse(allRows));
    console.log(`Wrote ${allRows.length} rows to ${file}`);
  }
}

main().catch(err => { console.error(err); process.exit(1); });
