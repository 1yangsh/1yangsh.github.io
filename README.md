# 1yangsh.github.io

데이터 엔지니어 양승현의 포트폴리오. [1yangsh.github.io](https://1yangsh.github.io)

Astro 정적 빌드, 이미지·외부 폰트 없이 타이포그래피와 지표 중심으로 구성했습니다.
`main` 브랜치에 푸시하면 GitHub Actions가 GitHub Pages로 배포합니다.

## 구조

```text
src/
├── content/projects/   # 프로젝트 상세 — 마크다운 (문제 / 접근 / 결과 / 배운 것)
├── content.config.ts   # 프로젝트 frontmatter 스키마
├── data/profile.ts     # 이름·지표·경력·기술 스택
├── components/         # Hero, ThemeToggle
├── layouts/Base.astro  # 공통 head·네비·푸터·테마 스크립트
├── pages/
│   ├── index.astro
│   └── projects/[...slug].astro
└── styles/global.css   # 디자인 토큰 (라이트/다크)
```

## 내용 수정

- 이름·지표·경력·스택 → `src/data/profile.ts`
- 프로젝트 추가 → `src/content/projects/` 에 마크다운 파일 하나. frontmatter의 `order`가 정렬 순서.
- 색·간격 → `src/styles/global.css` 상단 토큰

## 명령어

| Command           | Action                        |
| ----------------- | ----------------------------- |
| `npm install`     | 의존성 설치                   |
| `npm run dev`     | 개발 서버 (`localhost:4321`)  |
| `npm run build`   | `./dist/` 로 정적 빌드        |
| `npm run preview` | 빌드 결과 로컬 확인           |

## 원칙

공개 저장소이므로 사내 절대 수치(용량·비용·내부 스키마)는 넣지 않습니다.
규모감과 개선폭은 상대값으로만 표현합니다.
