import { AuditResult } from "@/lib/audit";

export default function AuditResultCard({
  result,
}: {
  result: AuditResult;
}) {
  return (
    <div className="mt-10 rounded-3xl border border-white/10 bg-white/[0.04] p-6">
      <h2 className="text-2xl font-bold">{result.tool}</h2>

      <div className="mt-6 space-y-4">
        <div>
          <p className="text-zinc-400">Recommendation</p>
          <h3 className="text-xl font-semibold">{result.recommendation}</h3>
        </div>

        <div>
          <p className="text-zinc-400">Monthly Savings</p>
          <h3 className="text-3xl font-bold text-green-400">
            ${result.monthlySavings}
          </h3>
        </div>

        <div>
          <p className="text-zinc-400">Annual Savings</p>
          <h3 className="text-3xl font-bold text-green-400">
            ${result.annualSavings}
          </h3>
        </div>

        <div>
          <p className="text-zinc-400">Reason</p>
          <p className="mt-1">{result.reason}</p>
        </div>
      </div>
    </div>
  );
}