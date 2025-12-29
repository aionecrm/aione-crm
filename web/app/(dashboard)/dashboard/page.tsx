"use client";

import { useEffect, useState } from "react";
import { getClients } from "@/lib/api";

type Client = {
  id: string;
  status: string;
  unpaid_amount: number;
  paid_amount: number;
};

export default function DashboardPage() {
  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
    getClients()
      .then(setClients)
      .catch(console.error);
  }, []);

  // ✅ UI-only calculations
  const totalClients = clients.length;

  const activeClients = clients.filter(
    (c) => c.status === "active"
  ).length;

  const pendingAmount = clients.reduce(
    (sum, c) => sum + Number(c.unpaid_amount || 0),
    0
  );

  const monthlyRevenue = clients.reduce(
    (sum, c) => sum + Number(c.paid_amount || 0),
    0
  );

  return (
    <div className="space-y-8">
      <h1 className="text-xl font-medium">
        Business Overview
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard title="Total Clients" value={totalClients} />
        <KpiCard title="Active Clients" value={activeClients} />
        <KpiCard title="Pending Amount" value={`₹${pendingAmount}`} />
        <KpiCard title="Monthly Revenue" value={`₹${monthlyRevenue}`} />
      </div>

      <div className="bg-[#13141A] border border-[#1F2028] rounded-lg p-6 text-sm text-[#9A9AA3]">
        Analytics & charts will appear here
      </div>
    </div>
  );
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
  );
}
