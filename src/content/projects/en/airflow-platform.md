---
title: Airflow Build-out and Operation
period: "2022.06 — 2023.05"
org: SOCAR
summary: Moved Docker Compose Airflow onto Kubernetes with high availability and proper secrets handling.
stack: [Airflow, Kubernetes, Helm, Workload Identity, Datadog]
order: 3
---

## Situation

Airflow was running on Docker Compose. There was no redundancy — a scheduler death halted all batches — Python dependencies collided across tasks, and connection details sat in the metadata DB as plaintext.

## Task

Keep batches running even if one host dies, decouple task-level dependencies, and remove the plaintext connection details.

## Action

Compared a managed offering against a self-hosted build. Cost came out to about half and custom operators were free to use, so we went with self-hosted.

Chose KubernetesExecutor as the executor. A pod per task isolates dependencies. The tradeoff — pod startup overhead that hurts DAGs with lots of short tasks — was accepted knowingly.

Moved secrets out of the metadata DB into Secret Manager, and used Workload Identity so pods could reach it without key files.

## Result

- Web server and scheduler both redundant with PDB and probes applied — no batch interruption during node replacement
- Per-task pod isolation resolved dependency conflicts, at the cost of a 10–30s pod-startup overhead
- Operating cost around half of the managed option, another 30–50% saved with Spot nodes
- 0 plaintext connections in the metadata DB, service-account key files removed from pods (Workload Identity)
- DAG parsing time reduced by blocking non-DAG file parsing and tuning cadence
- Copy-paste mistakes dropped after enforcing conventions at the DAG generation step
