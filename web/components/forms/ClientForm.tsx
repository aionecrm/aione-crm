"use client";

import { useState } from "react";
import { createClient, updateClient } from "@/lib/api";

type ClientFormProps = {
  onClose: () => void;
  onCreated: () => void;
  initialData?: {
    id: string;
    name: string;
    phone: string;
    monthly_amount: number;
    paid_amount: number;
    due_date: string;
    priority: boolean;
  };
};

type InputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
};

export default function ClientForm({
  onClose,
  onCreated,
  initialData,
}: ClientFormProps) {
  const [form, setForm] = useState({
    name: initialData?.name ?? "",
    phone: initialData?.phone ?? "",
    monthly_amount: initialData?.monthly_amount?.toString() ?? "",
    paid_amount: initialData?.paid_amount?.toString() ?? "",
    due_date: initialData?.due_date ?? "",
    priority: initialData?.priority ?? false,
  });

  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const totalAmount = Number(form.monthly_amount);
    const paidAmount = Number(form.paid_amount || 0);

    if (
      !form.name ||
      !form.phone ||
      !form.due_date ||
      totalAmount <= 0
    ) {
      alert("Please fill all fields correctly");
      return;
    }

    if (paidAmount > totalAmount) {
      alert("Paid amount cannot be greater than total amount");
      return;
    }

    const unpaidAmount = totalAmount - paidAmount;

    setLoading(true);

    try {
      if (initialData?.id) {
        await updateClient(initialData.id, {
          name: form.name.trim(),
          phone: form.phone.trim(),
          monthly_amount: totalAmount,
          paid_amount: paidAmount,
          unpaid_amount: unpaidAmount,
          due_date: form.due_date,
          priority: form.priority,
        });
      } else {
        await createClient({
          name: form.name.trim(),
          phone: form.phone.trim(),
          monthly_amount: totalAmount,
          paid_amount: paidAmount,
          unpaid_amount: unpaidAmount,
          due_date: form.due_date,
          priority: form.priority,
          status: "active",
        });
      }

      onCreated();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to save client");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#13141A] border border-[#1F2028] rounded-xl p-6"
    >
      <h2 className="text-lg font-semibold mb-6">
        {initialData ? "Edit Client" : "Add Client"}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          value={form.name}
          placeholder="Name"
          onChange={(v) => setForm({ ...form, name: v })}
        />

        <Input
          value={form.phone}
          placeholder="Phone"
          onChange={(v) => setForm({ ...form, phone: v })}
        />

        <Input
          type="number"
          value={form.monthly_amount}
          placeholder="Amount"
          onChange={(v) =>
            setForm({ ...form, monthly_amount: v })
          }
        />

        <Input
          type="date"
          value={form.due_date}
          onChange={(v) => setForm({ ...form, due_date: v })}
        />

        <Input
          type="number"
          value={form.paid_amount}
          placeholder="Paid Amount"
          onChange={(v) =>
            setForm({ ...form, paid_amount: v })
          }
        />
      </div>

      {Number(form.monthly_amount) > 0 && (
        <p className="mt-3 text-sm text-gray-400">
          Unpaid Amount: ₹
          {Math.max(
            Number(form.monthly_amount) -
              Number(form.paid_amount || 0),
            0
          )}
        </p>
      )}

      <label className="flex items-center gap-2 mt-4 text-sm">
        <input
          type="checkbox"
          checked={form.priority}
          onChange={(e) =>
            setForm({ ...form, priority: e.target.checked })
          }
        />
        Priority Client
      </label>

      <div className="flex justify-end gap-3 mt-8">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 border rounded-md"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-white text-black rounded-md"
        >
          {loading
            ? "Saving..."
            : initialData
            ? "Update Client"
            : "Save Client"}
        </button>
      </div>
    </form>
  );
}

function Input({
  value,
  onChange,
  placeholder,
  type = "text",
}: InputProps) {
  return (
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-md px-3 py-2 bg-[#0F1015] border border-[#2A2B33]"
    />
  );
}
