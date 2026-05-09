import { supabase } from "@/lib/supabase";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function SharePage({
  params,
}: Props) {
  const { id } = await params;

  const { data } = await supabase
    .from("audits")
    .select("*")
    .eq("id", id)
    .single();

  if (!data) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black text-white">
        <h1 className="text-3xl font-bold">
          Audit not found
        </h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black px-6 py-20 text-white">
      <div className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-white/[0.03] p-8">
        <p className="text-sm uppercase tracking-wide text-green-300">
          BurnLens Public Report
        </p>

        <h1 className="mt-3 text-4xl font-bold">
          Shared Audit Report
        </h1>

        <div className="mt-8 space-y-6">
          <div>
            <p className="text-zinc-400">
              Tool
            </p>

            <h2 className="text-2xl font-semibold">
              {data.tool_name}
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-zinc-400">
                Monthly Spend
              </p>

              <h3 className="text-2xl font-bold">
                ${data.monthly_spend}
              </h3>
            </div>

            <div>
              <p className="text-zinc-400">
                Team Size
              </p>

              <h3 className="text-2xl font-bold">
                {data.team_size}
              </h3>
            </div>
          </div>

          <div>
            <p className="text-zinc-400">
              Recommendation
            </p>

            <h3 className="text-2xl font-semibold">
              {data.recommendation}
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-zinc-400">
                Monthly Savings
              </p>

              <h3 className="text-4xl font-bold text-green-400">
                ${data.monthly_savings}
              </h3>
            </div>

            <div>
              <p className="text-zinc-400">
                Annual Savings
              </p>

              <h3 className="text-4xl font-bold text-green-400">
                ${data.annual_savings}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}