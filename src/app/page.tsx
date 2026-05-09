import { ArrowRight, BarChart3, ShieldCheck, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 text-center">
        <div className="absolute left-8 top-6 text-xl font-bold">
  BurnLens
</div>
        <div className="mb-6 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-300">
          Free AI spend audit for startup teams
        </div>

        <h1 className="max-w-4xl text-5xl font-bold tracking-tight md:text-7xl">
          Find where your AI budget is leaking.
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-400">
          BurnLens reviews your AI tool stack, finds overpriced plans, and shows
          how much your team can save every month.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <a
            href="/audit"
            className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 font-semibold text-black transition hover:bg-zinc-200"
          >
            Start free audit
          </a>

        </div>

        <div
          id="how-it-works"
          className="mt-20 grid w-full gap-4 md:grid-cols-3"
        >
          <FeatureCard
            icon={<BarChart3 />}
            title="Enter your AI stack"
            description="Add tools like Cursor, ChatGPT, Claude, Copilot, Gemini, and your monthly spend."
          />

          <FeatureCard
            icon={<Sparkles />}
            title="Get instant recommendations"
            description="See which plans are overpriced, unnecessary, or better replaced with cheaper options."
          />

          <FeatureCard
            icon={<ShieldCheck />}
            title="Save or share the report"
            description="Capture the report by email and generate a public shareable audit link."
          />
        </div>
      </section>
    </main>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 text-left">
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-black">
        {icon}
      </div>
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-zinc-400">{description}</p>
    </div>
  );
}