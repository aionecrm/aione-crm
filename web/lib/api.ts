const API_BASE = "http://127.0.0.1:8000";

/* =========================
   CLIENTS
========================= */

export async function getClients() {
  const res = await fetch(`${API_BASE}/clients/`, {
    method: "GET",
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch clients");
  }

  return res.json();
}

export async function createClient(data: {
  name: string;
  phone: string;
  monthly_amount: number;
  paid_amount: number;
  unpaid_amount: number;
  due_date: string; // YYYY-MM-DD
  priority: boolean;
  status?: string;
}) {
  const res = await fetch(`${API_BASE}/clients/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(err);
  }

  return res.json();
}

export async function updateClient(
  id: string,
  data: {
    name: string;
    phone: string;
    monthly_amount: number;
    paid_amount: number;
    unpaid_amount: number;
    due_date: string;
    priority: boolean;
  }
) {
  const res = await fetch(`${API_BASE}/clients/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(err);
  }

  return res.json();
}

export async function deleteClient(id: string) {
  const res = await fetch(`${API_BASE}/clients/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to delete client");
  }

  return res.json();
}

/* =========================
   DASHBOARD
========================= */

export async function getDashboardStats() {
  const res = await fetch(`${API_BASE}/dashboard/stats`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to load dashboard stats");
  }

  return res.json();
}
