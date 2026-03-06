Usage instructions for extracting GSC and GA4 data to validate hypotheses

Prerequisites
- Set `GOOGLE_APPLICATION_CREDENTIALS` to a service account JSON with access to Search Console and GA4 (or use ADC).
- Install deps: `npm install` (adds `@google-analytics/data` and `yargs` which are included in project `package.json`).

GSC extraction (queries by query/country/device)
Example: extract H1 2024 and H2 2024 and keep only informational queries

```bash
node scripts/gsc-extract.js --siteUrl=https://www.genially.com --ranges 2024-01-01 2024-06-30 2024-07-01 2024-12-31 --informational --output=gsc_2024
```

This produces CSV files like `gsc_2024-2024-01-01_to_2024-06-30.csv` with columns: `query,country,device,clicks,impressions,ctr,position`.

GA4 extraction (sessions and conversions by landing page)
Example: extract sessions/conversions for Q3 2025 and Q4 2025

```bash
node scripts/ga4-extract.js --propertyId=YOUR_GA4_PROPERTY_ID --startDate=2025-07-01 --endDate=2025-09-30 --output=ga4_q3_2025
```

Outputs a CSV `ga4_q3_2025-2025-07-01_to_2025-09-30.csv` with `pagePath,sessions,conversions`.

Notes and next steps
- Use the GSC CSVs to compute CTR, impressions and position deltas between ranges (H1 vs H2, Q3 vs Q4/Q1). Group by `country` (e.g., ES) and `device`.
- For Hypothesis 1: filter the GSC CSVs to `country=ES` and/or `country` in Europe, and compare CTR and impressions around the rollout dates of AI Overviews/AI Mode.
- For Hypothesis 2: join GA4 file (sessions, conversions) with GSC CTR by `pagePath` (or normalized landing URL). Classify pages into `informational/templates` vs `product/pricing` and compute CTR vs sessions vs CVR (= conversions/sessions).
- If you want, I can add a comparison script that reads two CSVs and outputs delta metrics and summary tables.
