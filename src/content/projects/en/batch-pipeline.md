---
title: Operational DB → Warehouse Batch Pipeline
period: "2023.06 — 2024.01"
org: SOCAR
summary: A multi-stage ingestion path with a dbt transformation layer, designed to be gentle on the operational DB and safe to reprocess.
stack: [Airflow, BigQuery, dbt, Airbyte]
order: 4
---

## Situation

Data had to move from the operational DB into the warehouse. A direct connection put load on the DB and forced a full re-read on any failure. Cross-cloud egress cost was also on the table.

## Task

Lower the operational DB load, and build an ingestion path that can be reprocessed on failure without hitting the source again. Also move the post-ingestion transformations into something manageable.

## Action

Placed object storage as an intermediate stage. Read once from the source into files, and every downstream stage that fails can reprocess from those files without touching the source.

Reads run against the read replica during off-hours, sliced by primary-key range. OFFSET-based paging slows down as it walks further in, so we didn't use it.

Standardized the load step on partition-level overwrite. Reprocessing is only safe if running the same date multiple times yields the same result. Code tables loaded in full, transactional tables incrementally, with a few days of buffer for late-arriving data.

Moved transformations onto dbt. Before, SQL was hardcoded into application code — no reuse, no tests, no documentation.

## Result

- Query scan volume dropped 70–80% after partitioning and clustering
- On mid-stage failure, reprocessing runs from the staged files without re-querying the source
- 3 reconciliation points — source row count, ±0.01% variance vs. source right after load, dbt tests after transformation
- Operational DB access restricted to read replica during off-hours
- The dbt migration surfaced table-to-table lineage and folded schema tests into the pipeline
