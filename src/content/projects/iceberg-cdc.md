---
title: Iceberg 기반 CDC 파이프라인
period: "2025.12 — 2026.03"
org: 쏘카
summary: 하루 한 번 도는 배치의 지연과 삭제 누락을 CDC로 바꿔본 PoC.
stack: [Apache Iceberg, Kafka, Debezium, Strimzi, Schema Registry, BigLake]
order: 1
---

## 문제

운영 DB를 하루 한 번 스냅샷으로 가져오는 구조였습니다. 데이터가 최대 하루 늦게 반영되고, 그 사이의 변경 이력은 남지 않으며, 원본에서 삭제된 행이 웨어하우스에 그대로 남아 있었습니다.

## 접근

binlog를 Debezium으로 읽어 Kafka로 보내고, Iceberg 테이블로 싱크했습니다.

메시지 포맷은 JSON 대신 Avro와 Schema Registry를 썼습니다. CDC는 컬럼 추가가 잦은데 JSON은 타입이 일정하지 않고 용량도 컸습니다. 호환성 정책은 BACKWARD로 뒀습니다. 컨슈머가 먼저 새 스키마를 받는 순서가 이 환경에 맞다고 봤습니다.

싱크 커넥터는 Confluent 대신 Apache 구현을 썼습니다. BigLake Metastore를 지원해야 별도 ETL 없이 웨어하우스에서 같은 테이블을 조회할 수 있는데, Confluent 쪽은 지원하지 않았습니다.

## 결과

지연이 하루에서 분 단위로 줄었습니다. Row-level Delete로 삭제가 반영되고, Time Travel로 과거 시점 조회가 가능해졌습니다. 메시지 크기는 Avro로 바꾸면서 줄었습니다.

팀에서는 기존 방식으로 충분하지 않냐는 의견이 있었습니다. PoC를 만들어 Time Travel과 삭제 감지를 보여주고, 도입 비용도 같이 정리해 공유했습니다.

## 배운 것

새 기술은 도입해야 한다고 말하는 것보다 동작하는 것을 보여주는 편이 빨랐습니다.
