export const profile = {
  name: '양승현',
  nameEn: 'Seunghyeon Yang',
  role: 'Data Engineer',
  headline: '데이터 파이프라인을 만들고 운영합니다',
  summary:
    '백엔드 1년을 거쳐, 4년째 운영 DB의 데이터를 웨어하우스로 옮기고 분석가가 쓸 수 있게 다듬고 있는 데이터 엔지니어입니다.',
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
    title: '수집부터 마트까지',
    body: '원천에서 데이터를 가져오는 것부터 분석가가 쓰는 마트까지 전 구간을 다뤘습니다. 한 단계에서 문제가 생겨도 앞뒤를 같이 놓고 볼 수 있습니다.',
  },
  {
    title: '인프라도 같이 봅니다',
    body: 'Kubernetes와 GCP 위에서 파이프라인을 운영해왔습니다. 장애가 나면 애플리케이션 로그에서 멈추지 않고 인프라 쪽까지 확인합니다.',
  },
  {
    title: '수동 작업을 줄입니다',
    body: '사람이 반복해서 처리하던 일을 파이프라인으로 옮기는 작업을 여러 번 했습니다. 수동 SQL 운영을 배치로 바꾼 것이 대표적입니다.',
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
  { group: 'Infrastructure', items: ['Docker', 'Kubernetes', 'GKE', 'EKS', 'Helm', 'Datadog'] },
  { group: 'Language', items: ['Python', 'SQL'] },
] as const;
