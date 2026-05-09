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

export function generateAudit(
  toolName: string,
  monthlySpend: number,
  teamSize: number
): AuditResult {
  if (
    toolName.toLowerCase().includes("chatgpt team") &&
    teamSize <= 2 &&
    monthlySpend > 50
  ) {
    return {
      tool: toolName,
      monthlySpend: monthlySpend,
      teamSize: teamSize,
      recommendation: "Downgrade to ChatGPT Plus",
      monthlySavings: 30,
      annualSavings: 360,
      reason: "Small teams usually do not require ChatGPT Team features.",
    };
  }

  if (
    toolName.toLowerCase().includes("cursor business") &&
    teamSize <= 3 &&
    monthlySpend > 60
  ) {
    return {
      tool: toolName,
      monthlySpend: monthlySpend,
      teamSize: teamSize,
      recommendation: "Switch to Cursor Pro",
      monthlySavings: 40,
      annualSavings: 480,
      reason: "Cursor Business may be unnecessary for small developer teams.",
    };
  }

  if (
    toolName.toLowerCase().includes("copilot enterprise") &&
    monthlySpend > 40
  ) {
    return {
      tool: toolName,
      monthlySpend: monthlySpend,
      teamSize: teamSize,
      recommendation: "Use GitHub Copilot Business",
      monthlySavings: 20,
      annualSavings: 240,
      reason: "Enterprise plans are often unnecessary for smaller teams.",
    };
  }

  return {
    tool: toolName,
    monthlySpend: monthlySpend,
    teamSize: teamSize,
    recommendation: "Current setup looks optimized",
    monthlySavings: 0,
    annualSavings: 0,
    reason: "We could not identify any major overspending in your stack.",
  };
}