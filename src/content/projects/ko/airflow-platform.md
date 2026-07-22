---
title: Airflow 구축 및 운영
period: "2022.06 — 2023.05"
org: 쏘카
summary: Docker Compose로 돌던 Airflow를 Kubernetes로 옮기고 이중화와 시크릿 관리를 붙인 작업.
stack: [Airflow, Kubernetes, Helm, Workload Identity, Datadog]
order: 3
---

## Situation

Docker Compose로 띄운 Airflow였습니다. 이중화가 없어 스케줄러가 죽으면 배치 전체가 멈췄고, 태스크끼리 파이썬 의존성이 충돌했으며, 메타DB에 커넥션 정보가 평문으로 들어 있었습니다.

## Task

한 대가 죽어도 배치가 이어지게 하고, 태스크 간 의존성을 분리하고, 평문으로 놓인 커넥션 정보를 걷어내야 했습니다.

## Action

관리형 서비스와 직접 구축을 비교했습니다. 비용이 절반 수준이었고 커스텀 오퍼레이터를 자유롭게 쓸 수 있어서 직접 구축으로 갔습니다.

실행기는 KubernetesExecutor를 썼습니다. 태스크마다 파드가 뜨니 의존성이 분리됩니다. 대신 파드 기동 오버헤드가 있어서, 짧은 태스크가 많은 DAG에서는 그만큼 손해라는 걸 감안했습니다.

시크릿은 메타DB에서 빼내 Secret Manager로 옮기고, Workload Identity로 파드에서 키 파일 없이 접근하도록 했습니다.

## Result

- 웹서버·스케줄러 이중화 + PDB·프로브 적용 → 노드 교체 중 배치 중단 없음
- 태스크별 파드 격리로 의존성 충돌 해소, 대신 파드 기동 10~30초 오버헤드 발생
- 관리형 서비스 대비 운영 비용 절반 수준, Spot 노드로 30~50% 추가 절감
- 메타DB 평문 커넥션 0건, 파드 내 서비스 계정 키 파일 제거 (Workload Identity)
- 비-DAG 파일 파싱 차단·주기 조정으로 DAG 파싱 시간 단축
- 컨벤션을 생성 단계에서 강제하도록 자동화한 뒤 복붙 실수 감소
