---
title: Iceberg-based CDC Pipeline
period: "2025.12 — 2026.03"
org: SOCAR
summary: A PoC that swapped a once-a-day batch for CDC to fix stale reads and missing deletes.
stack: [Apache Iceberg, Kafka, Debezium, Strimzi, Schema Registry, BigLake]
order: 1
---

## Situation

The operational DB was pulled into the warehouse as a once-a-day snapshot. Data lagged by up to a day, the intermediate change history was lost, and rows deleted at the source were left behind in the warehouse.

## Task

The question was whether the problem could be solved by tightening the batch cadence, or whether we needed to switch to reading the change log directly. The task was to verify the latter approach on real data.

## Action

Read binlog with Debezium, shipped events through Kafka, and sank them into Iceberg tables.

Used Avro with Schema Registry instead of JSON for the message format. CDC involves frequent column additions, and JSON is loose about types and heavier on the wire. Compatibility policy was set to BACKWARD — having consumers pick up the new schema first fit this environment best.

Chose the Apache implementation of the sink connector over Confluent's. BigLake Metastore support was required so the warehouse could query the same table without a separate ETL step, and the Confluent connector did not offer it.

## Result

- Ingestion lag: up to 24h → minutes
- Physical deletes at the source now reflected in the warehouse (row-level delete); previously undetectable
- Point-in-time queries (time travel) enabled, intermediate change history preserved
- Message size: ~1KB → 100–200B per event (Avro migration, ~80% reduction)
- 4 PoC criteria passed — E2E ingestion, BigLake integration, time travel, at-least-once after restart
