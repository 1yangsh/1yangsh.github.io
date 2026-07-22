---
title: Airflow 구축 및 운영
period: "2022.06 — 2023.05"
org: 쏘카
summary: Docker Compose로 돌던 Airflow를 Kubernetes로 옮기고 이중화와 시크릿 관리를 붙인 작업.
stack: [Airflow, Kubernetes, Helm, Workload Identity, Datadog]
order: 3
---

## 문제

Docker Compose로 띄운 Airflow였습니다. 이중화가 없어 스케줄러가 죽으면 배치 전체가 멈췄고, 태스크끼리 파이썬 의존성이 충돌했으며, 메타DB에 커넥션 정보가 평문으로 들어 있었습니다.

## 접근

관리형 서비스와 직접 구축을 비교했습니다. 비용이 절반 수준이었고 커스텀 오퍼레이터를 자유롭게 쓸 수 있어서 직접 구축으로 갔습니다.

실행기는 KubernetesExecutor를 썼습니다. 태스크마다 파드가 뜨니 의존성이 분리됩니다. 대신 파드 기동 오버헤드가 있어서, 짧은 태스크가 많은 DAG에서는 그만큼 손해라는 걸 감안했습니다.

시크릿은 메타DB에서 빼내 Secret Manager로 옮기고, Workload Identity로 파드에서 키 파일 없이 접근하도록 했습니다.

## 결과

웹서버와 스케줄러를 이중화하고 PDB와 프로브를 걸어 노드 교체 중에도 배치가 이어집니다. DAG 파싱 시간이 길어지는 문제는 비-DAG 파일 파싱을 막고 파싱 주기를 조정해 줄였습니다.

DAG 컨벤션은 문서만으로는 지켜지지 않았습니다. 생성 단계에서 강제되도록 자동화하고 나서야 복붙 실수가 줄었습니다.

## 배운 것

Airflow 도입 초기에 KubernetesExecutor를 바로 쓰자고 했지만 팀은 운영 부담을 걱정했습니다. 밀어붙이는 대신 어떤 조건을 넘으면 다시 보자고 합의해뒀고, 몇 달 뒤 그 시점이 왔을 때 팀이 이해한 상태로 전환했습니다.
