#!/usr/bin/env node
const fs = require('fs');
const {BetaAnalyticsDataClient} = require('@google-analytics/data');
const Papa = require('papaparse');
const yargs = require('yargs/yargs');
const {hideBin} = require('yargs/helpers');

async function main() {
  const argv = yargs(hideBin(process.argv))
    .option('propertyId', {type: 'string', demandOption: true, describe: 'GA4 property id (numeric)'})
    .option('startDate', {type: 'string', demandOption: true})
    .option('endDate', {type: 'string', demandOption: true})
    .option('output', {type: 'string', default: 'ga4', describe: 'output file prefix'})
    .option('conversionEvent', {type: 'string', describe: 'conversion event name (optional) for CVR calculation)'} )
    .argv;

  const client = new BetaAnalyticsDataClient();

  const request = {
    property: `properties/${argv.propertyId}`,
    dateRanges: [{startDate: argv.startDate, endDate: argv.endDate}],
    dimensions: [{name: 'pagePath'}],
    metrics: [{name: 'sessions'}, {name: 'conversions'}],
    limit: 100000,
  };

  console.log(`Running GA4 report for ${argv.startDate} → ${argv.endDate}`);
  const [response] = await client.runReport(request);

  const rows = [];
  const dimensionHeaders = response.dimensionHeaders || [];
  const metricHeaders = response.metricHeaders || [];
  for (const row of response.rows || []) {
    const dims = (row.dimensionValues || []).map(d => d.value);
    const metrics = (row.metricValues || []).map(m => m.value);
    rows.push({
      pagePath: dims[0] || '',
      sessions: metrics[0] || '0',
      conversions: metrics[1] || '0'
    });
  }

  const file = `${argv.output}-${argv.startDate}_to_${argv.endDate}.csv`;
  fs.writeFileSync(file, Papa.unparse(rows));
  console.log(`Wrote ${rows.length} rows to ${file}`);
}

main().catch(err => { console.error(err); process.exit(1); });
