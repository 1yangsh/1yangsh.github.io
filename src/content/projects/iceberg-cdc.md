---
title: Iceberg 기반 CDC 파이프라인
period: "2025.12 — 2026.03"
org: 쏘카
summary: 하루 한 번 도는 배치의 지연과 삭제 미감지를 CDC로 걷어낸 레이크하우스 PoC.
stack: [Apache Iceberg, Kafka, Debezium, Strimzi, Schema Registry, BigLake]
order: 1
---

## 문제

운영 DB를 하루 한 번 스냅샷으로 퍼오는 구조였습니다. 세 가지가 걸렸습니다. 데이터가 최대 하루 늦고, 그 사이 오간 중간 상태는 통째로 사라지며, 원본에서 물리 삭제된 행은 웨어하우스에 그대로 남았습니다.

## 접근

binlog를 Debezium으로 읽어 Kafka로 흘리고, Iceberg 테이블에 직접 싱크했습니다.

메시지 포맷은 JSON 대신 Avro + Schema Registry로 잡았습니다. CDC는 컬럼 추가가 잦은데 JSON은 타입이 흔들리고 용량도 컸습니다. 호환성 정책은 BACKWARD — 컨슈머가 먼저 새 스키마를 받는 순서가 CDC 환경에 맞았습니다.

싱크 커넥터는 Confluent 대신 Apache 구현을 골랐습니다. 결정적인 이유 하나였습니다. BigLake Metastore를 지원해야 별도 ETL 없이 웨어하우스에서 같은 테이블을 바로 조회할 수 있었고, Confluent 쪽은 그게 안 됐습니다.

## 결과

일 단위 지연이 분 단위로 줄었고, Iceberg의 Row-level Delete로 물리 삭제가 반영되기 시작했습니다. Time Travel로 과거 시점 조회도 가능해졌습니다. 메시지 크기는 Avro 전환만으로 대폭 줄었습니다.

팀에서는 처음에 기존 방식으로 충분하지 않냐는 의견이 있었습니다. 설득 대신 PoC를 만들어 Time Travel과 삭제 감지를 직접 시연했고, 도입 비용도 같이 문서화해 공유했습니다. 결론은 팀이 냈습니다.

## 배운 것

새 기술은 도입해야 한다고 주장하는 것보다 동작하는 것을 보여주는 쪽이 빨랐습니다.
