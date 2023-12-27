import React from "react"

export default function EnergyBox({ title, value, di }) {
  return (
    <div className="bg-zinc-200 text-dark divide-y-2 divide-black rounded-2xl p-2">
      <div className="pb-3 text-center">
        <h6 className="text-zinc-600">{title}</h6>
        <p className="font-[faNum] text-sm">{value}</p>
      </div>
      <div className="pt-3 text-center">
        <h6>DI*</h6>
        <p className="font-[faNum] text-sm">{di}</p>
      </div>
    </div>
  )
}
