export type AuditResult = {
  id?: number;
  tool: string;
  monthlySpend: number;
  teamSize: number;
  recommendation: string;
  monthlySavings: number;
  annualSavings: number;
  reason: string;
};

type PricingRule = {
  estimatedPricePerUser: number;
  cheaperAlternative?: string;
  cheaperAlternativePrice?: number;
};

const pricingRules: Record<string, PricingRule> = {
  "ChatGPT Plus": {
    estimatedPricePerUser: 20,
  },
  "ChatGPT Team": {
    estimatedPricePerUser: 30,
    cheaperAlternative: "ChatGPT Plus",
    cheaperAlternativePrice: 20,
  },
  "Cursor Pro": {
    estimatedPricePerUser: 20,
  },
  "Cursor Business": {
    estimatedPricePerUser: 40,
    cheaperAlternative: "Cursor Pro",
    cheaperAlternativePrice: 20,
  },
  "Claude Team": {
    estimatedPricePerUser: 35,
  },
  "GitHub Copilot Enterprise": {
    estimatedPricePerUser: 39,
    cheaperAlternative: "GitHub Copilot Business",
    cheaperAlternativePrice: 19,
  },
  "Gemini Pro": {
    estimatedPricePerUser: 20,
  },
};

export function generateAudit(
  toolName: string,
  monthlySpend: number,
  teamSize: number
): AuditResult {
  const rule = pricingRules[toolName];

  if (!rule) {
    return {
      tool: toolName,
      monthlySpend,
      teamSize,
      recommendation: "Manual review recommended",
      monthlySavings: 0,
      annualSavings: 0,
      reason:
        "We do not have enough pricing data for this tool yet, so this stack should be reviewed manually.",
    };
  }

  const expectedSpend = rule.estimatedPricePerUser * teamSize;
  const overspendThreshold = expectedSpend * 1.3;

  if (monthlySpend > overspendThreshold) {
    const monthlySavings = Math.max(
      0,
      Math.round(monthlySpend - expectedSpend)
    );

    return {
      tool: toolName,
      monthlySpend,
      teamSize,
      recommendation: "Review billing against estimated market pricing",
      monthlySavings,
      annualSavings: monthlySavings * 12,
      reason: `Based on estimated public pricing, this setup should cost around $${expectedSpend}/month for ${teamSize} user(s). Your entered spend is significantly higher, so the billing may include unused seats, add-ons, tax, or overestimated usage.`,
    };
  }

  if (
    rule.cheaperAlternative &&
    rule.cheaperAlternativePrice &&
    teamSize <= 3
  ) {
    const alternativeSpend = rule.cheaperAlternativePrice * teamSize;

    if (alternativeSpend < monthlySpend) {
      const monthlySavings = Math.max(
        0,
        Math.round(monthlySpend - alternativeSpend)
      );

      return {
        tool: toolName,
        monthlySpend,
        teamSize,
        recommendation: `Consider ${rule.cheaperAlternative}`,
        monthlySavings,
        annualSavings: monthlySavings * 12,
        reason: `For a small team of ${teamSize}, ${rule.cheaperAlternative} may cover the same core workflow at an estimated $${alternativeSpend}/month.`,
      };
    }
  }

  return {
    tool: toolName,
    monthlySpend,
    teamSize,
    recommendation: "Current setup looks optimized",
    monthlySavings: 0,
    annualSavings: 0,
    reason:
      "Your entered spend is close to estimated public market pricing for this tool and team size.",
  };
}