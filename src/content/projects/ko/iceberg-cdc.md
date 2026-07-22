---
title: Iceberg 기반 CDC 파이프라인
period: "2025.12 — 2026.03"
org: 쏘카
summary: 하루 한 번 도는 배치의 지연과 삭제 누락을 CDC로 바꿔본 PoC.
stack: [Apache Iceberg, Kafka, Debezium, Strimzi, Schema Registry, BigLake]
order: 1
---

## Situation

운영 DB를 하루 한 번 스냅샷으로 가져오는 구조였습니다. 데이터가 최대 하루 늦게 반영되고, 그 사이의 변경 이력은 남지 않으며, 원본에서 삭제된 행이 웨어하우스에 그대로 남아 있었습니다.

## Task

배치 주기를 당겨서 해결할 문제인지, 변경 로그를 직접 읽는 방식으로 바꿔야 할 문제인지 판단해야 했습니다. 후자가 실제 데이터에서 동작하는지 검증하는 것이 과제였습니다.

## Action

binlog를 Debezium으로 읽어 Kafka로 보내고, Iceberg 테이블로 싱크했습니다.

메시지 포맷은 JSON 대신 Avro와 Schema Registry를 썼습니다. CDC는 컬럼 추가가 잦은데 JSON은 타입이 일정하지 않고 용량도 컸습니다. 호환성 정책은 BACKWARD로 뒀습니다. 컨슈머가 먼저 새 스키마를 받는 순서가 이 환경에 맞다고 봤습니다.

싱크 커넥터는 Confluent 대신 Apache 구현을 썼습니다. BigLake Metastore를 지원해야 별도 ETL 없이 웨어하우스에서 같은 테이블을 조회할 수 있는데, Confluent 쪽은 지원하지 않았습니다.

## Result

- 반영 지연 최대 24시간 → 분 단위
- 원본 물리 삭제가 웨어하우스에 반영 (Row-level Delete), 이전에는 감지 불가
- 과거 시점 조회 가능 (Time Travel), 중간 변경 이력 보존
- 메시지 크기 건당 약 1KB → 100~200B (Avro 전환, 약 80% 감소)
- PoC 기준 4개 통과 — E2E 적재, BigLake 연동, Time Travel, 재시작 후 at-least-once
