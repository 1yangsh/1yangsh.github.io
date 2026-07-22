export const profile = {
  name: '양승현',
  nameEn: 'Seunghyeon Yang',
  role: 'Data Engineer',
  headline: '데이터가 신뢰받는 구조를 만듭니다',
  summary:
    '백엔드 1년을 거쳐 데이터 엔지니어로 4년. 수집부터 활용까지 파이프라인 전 구간을 직접 설계하고 운영합니다.',
  email: 'ysh410@gmail.com',
  github: 'https://github.com/1yangsh',
  linkedin: 'https://www.linkedin.com/in/yangseunghyeon/',
} as const;

/**
 * 히어로 패널 — 사내 데이터 규모·비용·성능 수치는 넣지 않는다.
 * 공개 저장소이므로 역량 범위만 드러내고, 구체적인 숫자는 면접에서 구두로 보강한다.
 */
export const metrics = [
  { value: '4년+', label: '데이터 엔지니어링' },
  { value: 'Batch · CDC', label: '파이프라인' },
  { value: 'GCP · K8s', label: '인프라 운영' },
  { value: 'E2E', label: '수집 → 마트 → 활용' },
] as const;

export const strengths = [
  {
    title: 'End-to-End',
    body: '원천 수집부터 데이터 마트까지 전 구간을 직접 설계했습니다. 기술 하나가 아니라 데이터가 어떻게 흘러야 하는지를 봅니다.',
  },
  {
    title: '인프라 × 데이터',
    body: 'Kubernetes·GCP·GitOps 운영 경험이 있어, 파이프라인 장애를 인프라 레벨까지 내려가 직접 추적합니다.',
  },
  {
    title: '자동화',
    body: '반복되고 휴먼 에러가 나기 쉬운 운영을 발견하면 파이프라인으로 바꿉니다. 수동 SQL 운영을 배치로 전환한 사례가 대표적입니다.',
  },
] as const;

export const timeline = [
  {
    period: '2022.06 — 현재',
    org: '쏘카',
    role: 'Data Engineer',
    note: '배치 플랫폼 구축, 운영DB→웨어하우스 파이프라인, 가격·면책 산정 서버, CDC 레이크하우스',
  },
  {
    period: '2021.06 — 2022.06',
    org: '해줌',
    role: 'Software Engineer',
    note: '태양광 발전 데이터 수집 플랫폼, 기상 데이터 파이프라인 자동화',
  },
] as const;

export const stack = [
  { group: 'Orchestration', items: ['Airflow', 'dbt'] },
  { group: 'Warehouse & Lakehouse', items: ['BigQuery', 'Apache Iceberg'] },
  { group: 'Streaming & CDC', items: ['Kafka'] },
  { group: 'Infrastructure', items: ['Kubernetes', 'GKE', 'EKS', 'Helm', 'Datadog'] },
  { group: 'Language', items: ['Python', 'SQL'] },
] as const;
