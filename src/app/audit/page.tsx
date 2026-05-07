"use client";
import { generateAudit, AuditResult } from "@/lib/audit";
import { useEffect, useState } from "react";
import AuditResultCard from "@/components/AuditResultCard";

export default function AuditPage() {
  const [toolName, setToolName] = useState("");
  const [monthlySpend, setMonthlySpend] = useState("");
  const [teamSize, setTeamSize] = useState("");
  const [result, setResult] = useState<AuditResult | null>(null);
  useEffect(() => {
  const savedTool = localStorage.getItem("toolName");
  const savedSpend = localStorage.getItem("monthlySpend");
  const savedTeam = localStorage.getItem("teamSize");

  if (savedTool) setToolName(savedTool);
  if (savedSpend) setMonthlySpend(savedSpend);
  if (savedTeam) setTeamSize(savedTeam);
}, []);

useEffect(() => {
  localStorage.setItem("toolName", toolName);
  localStorage.setItem("monthlySpend", monthlySpend);
  localStorage.setItem("teamSize", teamSize);
}, [toolName, monthlySpend, teamSize]);
  const handleAudit = () => {
  const audit = generateAudit(
    toolName,
    Number(monthlySpend),
    Number(teamSize)
    
  );

  setResult(audit);
};

  return (
    <main className="min-h-screen bg-black px-6 py-20 text-white">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-bold">
          AI Spend Audit
        </h1>

        <p className="mt-3 text-zinc-400">
          Tell us about your AI stack and monthly spending.
        </p>

        <div className="mt-10 space-y-6">
          <div>
            
  <label className="mb-2 block text-sm font-medium">
    AI Tool
  </label>

  <select
    value={toolName}
    onChange={(e) => setToolName(e.target.value)}
    className="w-full rounded-2xl border border-white/10 bg-black text-white px-4 py-3 outline-none"
  >
    <option value="">Select a tool</option>

    <option
  className="bg-black text-white"
  value="ChatGPT Team"
>
  ChatGPT Team
</option>

    <option value="ChatGPT Plus">
      ChatGPT Plus
    </option>

    <option value="Cursor Business">
      Cursor Business
    </option>

    <option value="Cursor Pro">
      Cursor Pro
    </option>

    <option value="Claude Team">
      Claude Team
    </option>

    <option value="GitHub Copilot Enterprise">
      GitHub Copilot Enterprise
    </option>

    <option value="Gemini Pro">
      Gemini Pro
    </option>
  </select>
</div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Monthly Spend ($)
            </label>

            <input
              type="number"
              value={monthlySpend}
              onChange={(e) => setMonthlySpend(e.target.value)}
              placeholder="500"
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none placeholder:text-zinc-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Team Size
            </label>

            <input
              type="number"
              value={teamSize}
              onChange={(e) => setTeamSize(e.target.value)}
              placeholder="10"
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none placeholder:text-zinc-500"
            />
          </div>

          <button
            onClick={handleAudit}
            className="w-full rounded-2xl bg-white py-4 font-semibold text-black transition hover:bg-zinc-200"
          >
            Generate Audit
          </button>
          {result && <AuditResultCard result={result} />}
        </div>
      </div>
    </main>
  );
}