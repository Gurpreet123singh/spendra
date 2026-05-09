"use client";

import AuditResultCard from "@/components/AuditResultCard";
import { generateAudit, AuditResult } from "@/lib/audit";
import { generateSummary } from "@/lib/summary";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function AuditPage() {
  const [toolName, setToolName] = useState("");
  const [monthlySpend, setMonthlySpend] = useState("");
  const [teamSize, setTeamSize] = useState("");
  const [results, setResults] = useState<AuditResult[]>([]);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

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

  const handleAudit = async () => {
    setError("");
    setSuccess("");

    if (!toolName || !monthlySpend || !teamSize) {
      setError("Please fill all fields before generating the audit.");
      return;
    }

    setLoading(true);

    const audit = generateAudit(
      toolName,
      Number(monthlySpend),
      Number(teamSize)
    );

    const { data } = await supabase
      .from("audits")
      .insert({
        tool_name: toolName,
        monthly_spend: Number(monthlySpend),
        team_size: Number(teamSize),
        recommendation: audit.recommendation,
        monthly_savings: audit.monthlySavings,
        annual_savings: audit.annualSavings,
      })
      .select()
      .single();

    setResults((prev) => [
      {
        ...audit,
        id: data?.id,
      },
      ...prev,
    ]);

    setLoading(false);

    setSuccess("Audit generated successfully.");

    setToolName("");
    setMonthlySpend("");
    setTeamSize("");
  };

  const totalMonthlySavings = results.reduce(
    (sum, result) => sum + result.monthlySavings,
    0
  );

  const totalAnnualSavings = results.reduce(
    (sum, result) => sum + result.annualSavings,
    0
  );

  const summary = generateSummary(results);

  return (
    <main className="min-h-screen bg-black px-6 py-20 text-white">
      <Link
  href="/"
  className="fixed left-6 top-6 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-300 transition hover:bg-white/10 hover:text-white"
>
  ← Back to Home
</Link>
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-bold">AI Spend Audit</h1>

        <p className="mt-3 text-zinc-400">
          Tell us about your AI stack and monthly spending.
        </p>

        {results.length > 0 && (
          <div className="mt-8 rounded-3xl border border-green-500/20 bg-green-500/10 p-6">
            <p className="text-sm uppercase tracking-wide text-green-300">
              Total Potential Savings
            </p>

            <div className="mt-4 grid gap-6 md:grid-cols-2">
              <div>
                <p className="text-zinc-300">Monthly Savings</p>

                <h2 className="mt-2 text-5xl font-bold text-green-400">
                  ${totalMonthlySavings}
                </h2>
              </div>

              <div>
                <p className="text-zinc-300">Annual Savings</p>

                <h2 className="mt-2 text-5xl font-bold text-green-400">
                  ${totalAnnualSavings}
                </h2>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-5">
              <p className="text-sm uppercase tracking-wide text-zinc-400">
                AI Summary
              </p>

              <p className="mt-3 leading-7 text-zinc-200">
                {summary}
              </p>
            </div>

            {totalMonthlySavings >= 500 && (
              <div className="mt-6 rounded-2xl border border-white/10 bg-black/30 p-5">
                <h3 className="text-xl font-semibold">
                  Unlock Bigger Savings with Credex
                </h3>

                <p className="mt-2 text-zinc-400">
                  Your team may qualify for discounted AI infrastructure credits
                  through Credex partnerships.
                </p>

                <button className="mt-4 rounded-full bg-white px-5 py-3 font-semibold text-black transition hover:bg-zinc-200">
                  Book Credex Consultation
                </button>
              </div>
            )}
          </div>
        )}

        <div className="mt-10 space-y-6">
          <div>
            <label className="mb-2 block text-sm font-medium">
              AI Tool
            </label>

            <select
              value={toolName}
              onChange={(e) => setToolName(e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-black px-4 py-3 text-white outline-none"
            >
              <option className="bg-black text-white" value="">
                Select a tool
              </option>

              <option className="bg-black text-white" value="ChatGPT Team">
                ChatGPT Team
              </option>

              <option className="bg-black text-white" value="ChatGPT Plus">
                ChatGPT Plus
              </option>

              <option className="bg-black text-white" value="Cursor Business">
                Cursor Business
              </option>

              <option className="bg-black text-white" value="Cursor Pro">
                Cursor Pro
              </option>

              <option className="bg-black text-white" value="Claude Team">
                Claude Team
              </option>

              <option
                className="bg-black text-white"
                value="GitHub Copilot Enterprise"
              >
                GitHub Copilot Enterprise
              </option>

              <option className="bg-black text-white" value="Gemini Pro">
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

          {error && (
            <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {error}
            </div>
          )}

          {success && (
            <div className="rounded-2xl border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm text-green-300">
              {success}
            </div>
          )}

          <button
            type="button"
            onClick={handleAudit}
            disabled={loading}
            className="w-full cursor-pointer rounded-2xl bg-white py-4 font-semibold text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Generating Audit..." : "Generate Audit"}
          </button>

          <div className="space-y-6">
  {results.length === 0 ? (
    <div className="rounded-3xl border border-dashed border-white/10 bg-white/[0.02] p-10 text-center">
      <h3 className="text-2xl font-semibold">
        No audits generated yet
      </h3>

      <p className="mt-3 text-zinc-400">
        Generate your first AI spend audit to uncover potential savings.
      </p>
    </div>
  ) : (
    results.map((result, index) => (
      <AuditResultCard
        key={index}
        result={result}
      />
    ))
  )}
</div>
        </div>
      </div>
    </main>
  );
}