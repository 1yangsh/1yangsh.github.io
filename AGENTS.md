## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Bilingual content

This site is bilingual — Korean at `/` and English at `/en/`. Korean is the source of truth.

Whenever you edit any of the following, invoke the **`portfolio-i18n-sync`** skill and update the English counterpart in the same commit:

- `src/content/projects/ko/**` → mirror at `src/content/projects/en/**`
- `src/data/profile.ts` (`*ByLocale.ko` blocks) → mirror in `*ByLocale.en`
- `src/data/i18n.ts` (`ko:` values) → mirror in `en:` values

The skill lives at `~/.claude/skills/portfolio-i18n-sync/SKILL.md` and includes the glossary and parity checks.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
