import type { Locale } from './profile';

/**
 * UI 문자열은 여기 한곳에서 관리한다. 새 문자열을 추가할 때 두 로케일에 반드시 함께 넣는다.
 */
export const ui = {
  nav: {
    about: { ko: 'About', en: 'About' },
    experience: { ko: 'Experience', en: 'Experience' },
    projects: { ko: 'Projects', en: 'Projects' },
    contact: { ko: 'Contact', en: 'Contact' },
    allProjects: { ko: '← 전체 프로젝트', en: '← All projects' },
    langSwitchLabel: { ko: '언어 전환', en: 'Switch language' },
    skipToMain: { ko: '본문으로 건너뛰기', en: 'Skip to main content' },
    themeToggleLabel: { ko: '테마 전환', en: 'Toggle theme' },
    mainMenu: { ko: '주요 메뉴', en: 'Main menu' },
  },
  hero: {
    metricsLabel: { ko: '핵심 지표', en: 'Highlights' },
  },
  section: {
    about: { ko: 'About', en: 'About' },
    experience: { ko: 'Experience', en: 'Experience' },
    projects: { ko: 'Projects', en: 'Projects' },
  },
  project: {
    more: { ko: '자세히 →', en: 'Read more →' },
    roleKey: { ko: '역할', en: 'Role' },
    nextProject: { ko: '다음 프로젝트', en: 'Next project' },
    nextNavLabel: { ko: '다음 프로젝트', en: 'Next project' },
  },
  contact: {
    title: {
      ko: { plain: "Let's", accent: ' talk' },
      en: { plain: "Let's", accent: ' talk' },
    },
    lede: {
      ko: '데이터 엔지니어링, 데이터 인프라, 혹은 흥미로운 기술 문제와 기회에 대해\n언제든 편하게 이야기 나누는 것을 환영합니다.',
      en: 'Always up for a conversation about data engineering, data infrastructure,\nor interesting technical problems and opportunities.',
    },
    emailAriaLabel: {
      ko: (email: string) => `이메일 보내기 — ${email}`,
      en: (email: string) => `Send email — ${email}`,
    },
  },
  foot: {
    builtWith: {
      ko: 'Built with Astro · Deployed on GitHub Pages',
      en: 'Built with Astro · Deployed on GitHub Pages',
    },
  },
} as const;

/**
 * 로케일별 홈 경로. Astro i18n의 `prefixDefaultLocale: false` 규칙과 맞춰야 한다.
 */
export const homePath = {
  ko: '/',
  en: '/en/',
} as const;

export const projectsPath = (locale: Locale, slug?: string) => {
  const base = locale === 'ko' ? '/projects/' : '/en/projects/';
  return slug ? `${base}${slug}/` : base;
};

/**
 * 현재 페이지의 다른 로케일 URL을 만든다. 홈은 홈끼리, 프로젝트 상세는 같은 slug의 상대 페이지로.
 */
export const alternateUrl = (currentPath: string, currentLocale: Locale): string => {
  const target: Locale = currentLocale === 'ko' ? 'en' : 'ko';

  // 프로젝트 상세: /projects/<slug>/ 또는 /en/projects/<slug>/
  const projectMatch = currentPath.match(/^\/(?:en\/)?projects\/([^/]+)\/?$/);
  if (projectMatch) return projectsPath(target, projectMatch[1]);

  return homePath[target];
};

export const localeLabel = {
  ko: 'KO',
  en: 'EN',
} as const;
