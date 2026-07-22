import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    period: z.string(),
    org: z.string(),
    /** 카드에 노출되는 한 줄 요약 */
    summary: z.string(),
    /** 맡은 역할·범위. 팀 성과와 본인 기여를 구분하기 위한 것이므로 확인된 내용만 적는다. */
    role: z.string().optional(),
    stack: z.array(z.string()),
    /** 카드 정렬 순서 — 작을수록 먼저 */
    order: z.number(),
  }),
});

export const collections = { projects };
