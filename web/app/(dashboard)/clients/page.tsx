"use client";

import { useEffect, useState } from "react";
import ClientForm from "@/components/forms/ClientForm";
import { getClients, deleteClient } from "@/lib/api";

type Client = {
  id: string;
  name: string;
  phone: string;
  monthly_amount: number;
  paid_amount: number;
  unpaid_amount: number;
  due_date: string;
  priority: boolean;
  status: string;
};

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);

  async function loadClients() {
    const data = await getClients();
    setClients(data);
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this client?")) return;
    await deleteClient(id);
    loadClients();
  }

  useEffect(() => {
    loadClients();
  }, []);

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Clients</h1>
        <button
          onClick={() => {
            setEditingClient(null);
            setShowForm(true);
          }}
          className="px-4 py-2 bg-white text-black rounded-md"
        >
          + Add Client
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <ClientForm
          initialData={editingClient ?? undefined}
          onClose={() => {
            setShowForm(false);
            setEditingClient(null);
          }}
          onCreated={loadClients}
        />
      )}

      {/* Table */}
      <div className="rounded-xl bg-white/5 border border-white/10 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-white/5 text-gray-400">
            <tr>
              <th className="p-4 text-left">Client</th>
              <th className="p-4 text-left">Phone</th>
              <th className="p-4 text-right">Amount</th>
              <th className="p-4 text-right">Paid</th>
              <th className="p-4 text-right">Unpaid</th>
              <th className="p-4 text-center">Due Date</th>
              <th className="p-4 text-center">Priority</th>
              <th className="p-4 text-center">Status</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {clients.map((c) => (
              <tr
                key={c.id}
                className="border-t border-white/10 hover:bg-white/5"
              >
                <td className="p-4 font-medium">{c.name}</td>
                <td className="p-4 text-gray-400">{c.phone}</td>

                <td className="p-4 text-right text-blue-400">
                  ₹{Number(c.monthly_amount)}
                </td>

                <td className="p-4 text-right text-green-400">
                  ₹{Number(c.paid_amount)}
                </td>

                <td className="p-4 text-right text-red-400">
                  ₹{Number(c.unpaid_amount)}
                </td>

                <td className="p-4 text-center">{c.due_date}</td>

                <td className="p-4 text-center">
                  {c.priority ? (
                    <span className="px-2 py-1 rounded-full bg-indigo-500/20 text-indigo-400 text-xs">
                      VIP
                    </span>
                  ) : (
                    "—"
                  )}
                </td>

                <td className="p-4 text-center text-green-400">
                  {c.status}
                </td>

                <td className="p-4 text-center space-x-3">
                  <button
                    className="text-blue-400 hover:underline"
                    onClick={() => {
                      setEditingClient(c);
                      setShowForm(true);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(c.id)}
                    className="text-red-400 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {clients.length === 0 && (
              <tr>
                <td
                  colSpan={9}
                  className="p-6 text-center text-gray-500"
                >
                  No clients added yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
