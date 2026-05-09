import { AuditResult } from "@/lib/audit";
import Link from "next/link";

type Props = {
  result: AuditResult;
};

export default function AuditResultCard({
  result,
}: Props) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
      <h2 className="text-2xl font-bold">
        {result.tool}
      </h2>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-zinc-400">
            Monthly Spend
          </p>

          <p className="text-lg font-semibold">
            ${result.monthlySpend}
          </p>
        </div>

        <div>
          <p className="text-sm text-zinc-400">
            Team Size
          </p>

          <p className="text-lg font-semibold">
            {result.teamSize}
          </p>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        <div>
          <p className="text-zinc-400">
            Recommendation
          </p>

          <h3 className="text-xl font-semibold">
            {result.recommendation}
          </h3>
        </div>

        <div>
          <p className="text-zinc-400">
            Monthly Savings
          </p>

          <h3 className="text-3xl font-bold text-green-400">
            ${result.monthlySavings}
          </h3>
        </div>

        <div>
          <p className="text-zinc-400">
            Annual Savings
          </p>

          <h3 className="text-3xl font-bold text-green-400">
            ${result.annualSavings}
          </h3>
        </div>

        <div>
          <p className="text-zinc-400">
            Reason
          </p>

          <p className="mt-1">
            {result.reason}
          </p>
        </div>
        {result.id && (
  <Link
    href={`/share/${result.id}`}
    target="_blank"
    className="mt-6 inline-flex rounded-full bg-white px-5 py-3 font-semibold text-black transition hover:bg-zinc-200"
  >
    Share Report
  </Link>
)}
      </div>
    </div>
  );
}