import React from "react"

export default function EnergyBox({ title, value, di }) {
  return (
    <div className="bg-zinc-200 text-dark divide-y-2 divide-black rounded-2xl sm:py-2 md:p-2">
      <div className="pb-3 text-center">
        <h6 className="text-zinc-700 text-sm">{title}</h6>
        <p className="font-[faNum] text-xs mt-1 text-zinc-500">{value}</p>
      </div>
      <div className="pt-3 text-center">
        <h6 className="text-zinc-700 text-sm">DI*</h6>
        <p className="font-[faNum] text-xs text-zinc-500">{di}</p>
      </div>
    </div>
  )
}
