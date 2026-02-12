interface Props {
  filters: any
  setFilters: any
}

export default function SignalsFilters({ filters, setFilters }: Props) {
  const sections = [
    {
      title: "Timeframe",
      items: ["1H", "4H", "1D", "1W"],
      key: "timeframe",
    },
    {
      title: "Direction",
      items: ["LONG", "SHORT"],
      key: "direction",
    },
    {
      title: "Status",
      items: ["ACTIVE", "TP_HIT", "SL_HIT", "EXPIRED"],
      key: "status",
    },
  ]

  return (
    <div className="w-64 bg-blackDeep border-r border-gold/20 p-6 flex flex-col space-y-10 shadow-gold/20">

      {/* SIDEBAR TITLE */}
      <h2 className="text-xl font-bold tracking-wide text-goldLight">
        Filters
      </h2>

      {/* FILTER SECTIONS */}
      <div className="space-y-10">
        {sections.map(section => (
          <div key={section.key}>
            <p className="text-gold/60 text-sm mb-3 tracking-wide uppercase">
              {section.title}
            </p>

            <div className="space-y-2">
              {section.items.map(item => {
                const isActive = filters[section.key] === item

                return (
                  <button
                    key={item}
                    onClick={() =>
                      setFilters({ ...filters, [section.key]: item })
                    }
                    className={`
                      w-full px-3 py-2 rounded-lg text-left transition
                      ${isActive
                        ? "bg-gold/20 text-goldLight border border-gold/30 shadow-gold"
                        : "bg-blackSoft text-gold/70 border border-gold/10 hover:bg-blackSoft/70 hover:text-goldLight"
                      }
                    `}
                  >
                    {item}
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
