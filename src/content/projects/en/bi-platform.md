---
title: Self-service BI Deployment Platform
period: "2026.07"
org: SOCAR
role: Sole owner of design and implementation — engine, portal, and deployment pipeline
summary: An internal dashboard platform where analysts push SQL and HTML, and CI ships each as an independent service.
stack: [Go, BigQuery, Cloud Run, Firebase, React, GitHub Actions]
order: 6
---

## Situation

Internal dashboard demand was high, but standing one up meant setting up a server, auth, and deployment from scratch every time. Some of the resulting dashboards exposed queries in the browser or shipped without cost controls in place, letting expensive scans run unchecked.

## Task

Let authors publish dashboards without touching infrastructure, while the platform itself enforces the query-exposure and cost boundaries.

## Action

Kept the author's surface area small and pushed security and cost handling onto the platform. Authors write a manifest, some SQL, and some HTML. Push the folder and CI deploys each dashboard as an independent service; the portal stitches them into a single view.

Three things are enforced by the platform: queries never leave the server, auth is handled centrally in one place, and units are isolated across different origins.

Used AI agents to move implementation quickly, while the architecture, security boundaries, and cost thresholds were decisions I made myself.

## Result

- Dashboard deployment unit shrunk to a single folder (manifest + SQL + HTML)
- 1 unit = 1 independent service; origin separation isolates units from each other
- Query scan volume measured before deployment; pipeline blocks anything above the threshold
- Authors write no server code and no deployment configuration
- Engine, portal, and CI/CD delivered in a 2-week sprint (176 commits)
