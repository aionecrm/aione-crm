'use client'

import { useEffect, useState } from "react"
import ClientForm from "@/components/forms/ClientForm"
import { getClients, deleteClient } from "@/lib/api"

export default function ClientsPage() {
  const [clients, setClients] = useState<any[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editClient, setEditClient] = useState<any | null>(null)

  async function loadClients() {
    const data = await getClients()
    setClients(data)
  }

  useEffect(() => {
    loadClients()
  }, [])

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-medium tracking-tight">
          Clients
        </h1>

        <button
          onClick={() => setShowForm(true)}
          className="
            px-4 py-2 rounded-md text-sm
            bg-[#1E2040] text-[#C7CBFF]
            border border-[#2A2D55]
            hover:bg-[#272A5A]
            hover:shadow-[0_0_12px_rgba(120,130,255,0.25)]
            transition-all
          "
        >
          + Add Client
        </button>
      </div>

      {(showForm || editClient) && (
        <ClientForm
          initialData={editClient}
          onClose={() => {
            setShowForm(false)
            setEditClient(null)
          }}
          onCreated={loadClients}
        />
      )}

      {/* Table */}
      <div
        className="
          bg-gradient-to-br from-[#10121A] to-[#0B0C11]
          border border-[#1F2028]
          rounded-2xl
          overflow-hidden
        "
      >
        <table className="w-full text-sm">
          <thead className="text-xs uppercase tracking-widest text-[#8A8B94]">
            <tr>
              <th className="px-6 py-4 text-left">Client</th>
              <th className="px-6 py-4 text-left">Phone</th>
              <th className="px-6 py-4 text-left">Amount</th>
              <th className="px-6 py-4 text-left">Due Date</th>
              <th className="px-6 py-4 text-left">Priority</th>
              <th className="px-6 py-4 text-left">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {clients.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="px-6 py-10 text-center text-[#6B6B75]"
                >
                  No clients found
                </td>
              </tr>
            ) : (
              clients.map((c) => (
                <tr
                  key={c.id}
                  className="
                    border-t border-[#1F2028]
                    hover:bg-[#14151C]/60
                    transition
                  "
                >
                  {/* Client */}
                  <td className="px-6 py-4 text-white font-medium">
                    {c.name}
                  </td>

                  {/* Phone */}
                  <td className="px-6 py-4 text-[#9A9AA3]">
                    {c.phone}
                  </td>

                  {/* Amount */}
                  <td className="px-6 py-4 text-[#7AA2FF] font-medium">
                    ₹{c.monthly_amount}
                  </td>

                  {/* Due Date */}
                  <td className="px-6 py-4 text-[#CFCFD6]">
                    {c.due_date
                      ? new Date(c.due_date).toLocaleDateString()
                      : "—"}
                  </td>

                  {/* Priority */}
                  <td className="px-6 py-4">
                    {c.priority ? (
                      <span
                        className="
                          px-2 py-1 text-xs rounded-full
                          bg-[#1E2040] text-[#9DA2FF]
                          border border-[#2A2D55]
                        "
                      >
                        VIP
                      </span>
                    ) : (
                      <span className="text-[#6B6B75]">—</span>
                    )}
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    <span
                      className="
                        text-emerald-400
                        font-medium
                      "
                    >
                      {c.status ?? "Active"}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-4 text-sm">
                      <button
                        onClick={() => setEditClient(c)}
                        className="
                          text-[#7AA2FF]
                          hover:text-[#9DA2FF]
                          transition
                        "
                      >
                        Edit
                      </button>

                      <button
                        onClick={async () => {
                          if (!confirm("Delete this client?")) return
                          await deleteClient(c.id)
                          loadClients()
                        }}
                        className="
                          text-red-400
                          hover:text-red-300
                          transition
                        "
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

    </div>
  )
}
