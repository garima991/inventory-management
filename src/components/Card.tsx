interface StatCardProp {
  label: string;
  value: number | string;
  loading: boolean;
}

export default function Card ({stat} : {stat: StatCardProp}) {
    return (
        <div
          className="rounded-xl p-5 hover:scale-[1.02] transition border border-white/10"
        >
          <div className="text-sm opacity-70">{stat.label}</div>
          <div className="mt-2 text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            {stat.loading ? (
              <span className="inline-block h-8 w-20 rounded bg-white/10 animate-pulse" />
            ) : (
              stat.value
            )}
          </div>
        </div>
    )
}