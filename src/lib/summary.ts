import { AuditResult } from "./audit";

export function generateSummary(results: AuditResult[]) {
  const totalSavings = results.reduce(
    (sum, result) => sum + result.monthlySavings,
    0
  );

  if (totalSavings === 0) {
    return "Your current AI stack already appears well optimized. We could not identify any major unnecessary spending based on your selected tools and team size.";
  }

  if (totalSavings < 100) {
    return "Your AI stack has a few optimization opportunities. Small plan adjustments could reduce monthly spending while keeping similar workflows and productivity.";
  }

  if (totalSavings < 500) {
    return "Your current AI spending shows moderate optimization potential. Several tools appear to be on higher-tier plans than your team likely requires.";
  }

  return "Your organization may be significantly overspending on AI tooling. Optimizing enterprise subscriptions and infrastructure sourcing could unlock substantial annual savings.";
}