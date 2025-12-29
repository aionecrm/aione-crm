'use client'

import { useEffect, useState } from "react"
import { getDashboardStats } from "@/lib/api"

type Stats = {
  total_clients: number
  active_clients: number
  pending_amount: number
  monthly_revenue: number
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null)

  useEffect(() => {
    getDashboardStats()
      .then(setStats)
      .catch(console.error)
  }, [])

  return (
    <div className="space-y-8">
      <h1 className="text-xl font-medium">
        Business Overview
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard title="Total Clients" value={stats?.total_clients ?? "—"} />
        <KpiCard title="Active Clients" value={stats?.active_clients ?? "—"} />
        <KpiCard
          title="Pending Amount"
          value={stats ? `₹${stats.pending_amount}` : "—"}
        />
        <KpiCard
          title="Monthly Revenue"
          value={stats ? `₹${stats.monthly_revenue}` : "—"}
        />
      </div>

      <div className="bg-[#13141A] border border-[#1F2028] rounded-lg p-6 text-sm text-[#9A9AA3]">
        Analytics & charts will appear here
      </div>
    </div>
  )
}

function KpiCard({ title, value }: { title: string; value: string | number }) {
  return (
    <div className="bg-[#13141A] border border-[#1F2028] rounded-lg p-4">
      <p className="text-xs uppercase tracking-wide text-[#6B6B75]">
        {title}
      </p>
      <p className="mt-2 text-2xl font-semibold text-white">
        {value}
      </p>
    </div>
  )
}
