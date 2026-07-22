---
title: Real-time Pricing & Waiver Server
period: "2024.06 — 2024.12"
org: SOCAR
summary: A dynamic pricing server that sets prices per region and vehicle type in real time, based on utilization and idle-rate demand.
stack: [gRPC, FastAPI, NumPy, EKS, Argo CD, Locust]
order: 5
---

## Situation

Demand by region and vehicle type shifts sharply through the day, but pricing was close to fixed — idle cars piled up in some places while popular regions and vehicles sold out fast. What we needed was a dynamic pricing system that adjusts prices per region and vehicle type in real time, based on utilization and idle-rate demand.

## Task

Compute prices at reservation time reflecting per-region and per-vehicle utilization and idle rate, and respond fast enough to render inline on the reservation screen. It had to launch on a fixed date, hold up under peak traffic, and capacity had to be set from measurements rather than guesswork.

## Action

Built the pricing logic to take utilization and idle-rate signals aggregated by region and vehicle type, and multiply the base fare by adjustment coefficients to produce the final price. Adjustment bands and floor/ceiling values were extracted into configuration so policy changes wouldn't require a deployment.

Went with gRPC because the calls are service-to-service and no browser hits it directly. Small payloads and enforced schemas mattered more than the loss of ad-hoc curl debugging, which we accepted.

Since pricing is computed for each region/vehicle combination, rewrote the Python loop as NumPy vector operations. Compared before and after with load tests, not gut feel.

Deployed with GitOps, splitting the application repo from the config repo. Pricing-policy tuning could ship independently of application deployments.

## Result

- Real-time per-region and per-vehicle-type pricing applied at reservation time
- Response time ~200ms → 130ms (NumPy vectorization, ~35% reduction)
- Load tests held error rate under 0.1% at twice the expected peak traffic
- HPA sized by back-calculating pod count from measured throughput — leaner resource footprint than a guessed sizing
- Pricing-policy changes ship with a single commit to the config repo, and rolling back is a single revert
- Remaining optimizations deferred to post-launch, completed within 2 weeks of production traffic with no incidents
