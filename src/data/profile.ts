export type Locale = 'ko' | 'en';

const shared = {
  name: '양승현',
  nameEn: 'Seunghyeon Yang',
  email: 'ysh410@gmail.com',
  github: 'https://github.com/1yangsh',
  linkedin: 'https://www.linkedin.com/in/yangseunghyeon/',
} as const;

/**
 * 로케일별 프로필. 구조를 동일하게 맞춰야 컴포넌트가 그대로 재사용된다.
 * 한글판이 원본이고 영문판은 번역이다 — 한글판을 고치면 영문도 함께 갱신한다.
 */
export const profiles = {
  ko: {
    ...shared,
    role: 'Data Engineer',
    headline: '데이터 파이프라인을 만들고 운영합니다',
    summary:
      '반복되는 불편함을 자동화로 해결하고, 견고한 데이터 인프라를 구축하기 위해 끊임없이 고민하는 데이터 엔지니어입니다.',
  },
  en: {
    ...shared,
    role: 'Data Engineer',
    headline: 'I build and operate data pipelines',
    summary:
      'A data engineer who keeps looking for ways to automate repetitive pain points and build resilient data infrastructure.',
  },
} as const;

/**
 * 히어로 패널 — 사내 데이터 규모·비용·성능 수치는 넣지 않는다.
 * 공개 저장소이므로 역량 범위만 드러내고, 구체적인 숫자는 면접에서 구두로 보강한다.
 */
export const metricsByLocale = {
  ko: [
    { value: '4년+', label: '데이터 엔지니어링' },
    { value: 'Batch · CDC', label: '파이프라인' },
    { value: 'GCP · K8s', label: '인프라 운영' },
    { value: 'E2E', label: '수집 → 마트 → 활용' },
  ],
  en: [
    { value: '4+ yrs', label: 'Data Engineering' },
    { value: 'Batch · CDC', label: 'Pipelines' },
    { value: 'GCP · K8s', label: 'Infrastructure' },
    { value: 'End-to-end', label: 'Ingest → Mart → Use' },
  ],
} as const;

export const strengthsByLocale = {
  ko: [
    {
      title: '데이터 파이프라인 최적화 및 자동화',
      body: 'Airflow 기반의 배치 파이프라인 고도화와 클라우드 인프라 자동화를 통해 데이터 플랫폼의 운영 안정성을 확보해 왔습니다.',
    },
    {
      title: '데이터 환경 조성',
      body: 'Raw Data 가공부터 BigQuery 기반의 데이터 웨어하우스 구축까지 전 과정을 전담하며, 데이터 기반의 의사결정이 가능한 환경을 조성하였습니다.',
    },
    {
      title: '시스템 설계 및 운영',
      body: 'gRPC/FastAPI를 활용한 대용량 트래픽 처리 경험과 GitOps(ArgoCD, Helm) 기반의 배포 자동화를 통해 효율적인 MSA 환경을 구축하는 데 강점이 있습니다.',
    },
  ],
  en: [
    {
      title: 'Pipeline optimization & automation',
      body: 'Hardened batch pipelines on Airflow and automated cloud infrastructure to keep data platforms reliably running in production.',
    },
    {
      title: 'Building the data environment',
      body: 'Owned the full path from raw data processing to a BigQuery-based warehouse, so the organization can make decisions grounded in data.',
    },
    {
      title: 'System design & operations',
      body: 'Handled high-traffic workloads with gRPC/FastAPI and shipped MSA services reliably through GitOps (ArgoCD, Helm) — that combination is my strong suit.',
    },
  ],
} as const;

export const timelineByLocale = {
  ko: [
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
  ],
  en: [
    {
      period: '2022.06 — Present',
      org: 'SOCAR',
      role: 'Data Engineer',
      note: 'Batch platform, operational DB → warehouse pipelines, real-time pricing server, CDC lakehouse',
    },
    {
      period: '2021.06 — 2022.06',
      org: 'Haezoom',
      role: 'Software Engineer',
      note: 'Solar power data ingestion platform, weather data pipeline automation',
    },
  ],
} as const;

export const stackByLocale = {
  ko: [
    { group: 'Orchestration', items: ['Airflow', 'dbt'] },
    { group: 'Warehouse & Lakehouse', items: ['BigQuery', 'Apache Iceberg'] },
    { group: 'Streaming & CDC', items: ['Kafka'] },
    { group: 'Infrastructure', items: ['Docker', 'Kubernetes', 'GKE', 'EKS', 'Helm', 'Datadog'] },
    { group: 'Language', items: ['Python', 'SQL'] },
  ],
  en: [
    { group: 'Orchestration', items: ['Airflow', 'dbt'] },
    { group: 'Warehouse & Lakehouse', items: ['BigQuery', 'Apache Iceberg'] },
    { group: 'Streaming & CDC', items: ['Kafka'] },
    { group: 'Infrastructure', items: ['Docker', 'Kubernetes', 'GKE', 'EKS', 'Helm', 'Datadog'] },
    { group: 'Language', items: ['Python', 'SQL'] },
  ],
} as const;

/** 하위 호환 — 로케일이 없는 기존 참조는 한글판을 반환한다. */
export const profile = profiles.ko;
export const metrics = metricsByLocale.ko;
export const strengths = strengthsByLocale.ko;
export const timeline = timelineByLocale.ko;
export const stack = stackByLocale.ko;
