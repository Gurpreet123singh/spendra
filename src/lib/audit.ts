export type AuditResult = {
  recommendation: string;
  monthlySavings: number;
  annualSavings: number;
  reason: string;
};

export function generateAudit(
  toolName: string,
  monthlySpend: number,
  teamSize: number
): AuditResult {
  if (
    toolName.toLowerCase().includes("chatgpt") &&
    teamSize <= 2 &&
    monthlySpend > 50
  ) {
    return {
      recommendation: "Downgrade to ChatGPT Plus",
      monthlySavings: 30,
      annualSavings: 360,
      reason:
        "Small teams usually do not require ChatGPT Team features.",
    };
  }

  if (
    toolName.toLowerCase().includes("cursor") &&
    teamSize <= 3 &&
    monthlySpend > 60
  ) {
    return {
      recommendation: "Switch to Cursor Pro",
      monthlySavings: 40,
      annualSavings: 480,
      reason:
        "Cursor Business may be unnecessary for small developer teams.",
    };
  }

  return {
    recommendation: "Current setup looks optimized",
    monthlySavings: 0,
    annualSavings: 0,
    reason:
      "We could not identify any major overspending in your stack.",
  };
}