---
title: CDC Medallion Layer
period: "2026.04 — 2026.06"
org: SOCAR
summary: A dbt layer that turns raw CDC change logs into tables analysts can query directly.
stack: [dbt, BigQuery, BigLake, Airflow]
order: 2
---

## Situation

CDC ingestion was in place, but what landed was a log of INSERT/UPDATE/DELETE events. To use it, analysts had to filter out deletes, pick the latest state for each key, and clean up duplicates — and they were writing the same SQL over and over to do it.

## Task

Reshape the change log into something analysts can query directly, and make that reshaping run on a schedule automatically.

## Action

Split the bronze layer in two: a view that preserves recent change history, and a table that keeps only the latest state per key. Trying to combine both — "keep UPDATE history" and "one row per key" — didn't fit into a single model, so it was cleaner to separate the roles. Silver merges the two by priority into a view that enforces key uniqueness.

Wrote a custom macro for the merge instead of using dbt's built-in strategy. The default couldn't reflect hard deletes and would overwrite the latest value when events arrived out of order.

Partitioned by creation time rather than event time. Event time shifts every time a row is updated, so pruning breaks down and queries devolve into full scans.

## Result

- 107 full-rebuild validations passed; silver-layer key uniqueness verified
- A single failed run self-heals on the next execution (30 minutes later) — 0 manual recoveries
- Analyst-facing layer is a view, so bronze updates are reflected immediately
- 0 leftover `__dbt_tmp` tables; previously they lingered for up to 12 hours
- The repeated delete-filter and latest-state SQL each analyst was writing was replaced by a single query
