"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createJersey, deleteJersey, getJerseys, updateJersey } from "@komatik/api-client";
import useAdminSession from "../../../hooks/useAdminSession";

const emptyForm = {
  clubName: "",
  league: "",
  country: "",
  season: "",
  kitType: "",
  issueType: "",
  brand: "",
  gender: "",
  price: "",
  description: "",
  image: "",
  rating: "",
  isNew: false,
  stock: "",
};

const toPayload = (form) => ({
  ...form,
  price: Number(form.price),
  rating: Number(form.rating),
  stock: Number(form.stock),
});

const inputStyle = {
  width: "100%",
  padding: "0.75rem 1rem",
  borderRadius: "var(--radius-sm)",
  border: "1px solid var(--border)",
  background: "var(--surface)",
  color: "var(--text-main)",
};

export default function AdminJerseysPage() {
  const router = useRouter();
  const { admin, isLoading, error } = useAdminSession();
  const [jerseys, setJerseys] = useState([]);
  const [status, setStatus] = useState({ type: "idle", message: "" });
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);

  const loadJerseys = async () => {
    try {
      const response = await getJerseys({ limit: 100, offset: 0 });
      setJerseys(response.data || []);
    } catch (error) {
      setStatus({ type: "error", message: error?.message || "Gagal memuat katalog." });
    }
  };

  useEffect(() => {
    if (isLoading) return;
    if (error?.status === 401) {
      router.replace("/admin/login");
      return;
    }
    if (admin) {
      loadJerseys();
    }
  }, [admin, error, isLoading, router]);

  const handleChange = (key) => (event) => {
    const value = event.target.type === "checkbox" ? event.target.checked : event.target.value;
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ type: "loading", message: "Menyimpan jersey..." });

    try {
      if (editId) {
        await updateJersey(editId, toPayload(form));
        setStatus({ type: "success", message: "Jersey berhasil diperbarui." });
      } else {
        await createJersey(toPayload(form));
        setStatus({ type: "success", message: "Jersey berhasil dibuat." });
      }

      setForm(emptyForm);
      setEditId(null);
      await loadJerseys();
    } catch (error) {
      const details = error?.errors?.map((item) => item.message).join(", ");
      setStatus({
        type: "error",
        message: details ? `Validasi gagal: ${details}` : error?.message || "Gagal menyimpan jersey.",
      });
    }
  };

  const handleEdit = (jersey) => {
    setEditId(jersey.id);
    setForm({
      clubName: jersey.clubName,
      league: jersey.league,
      country: jersey.country,
      season: jersey.season,
      kitType: jersey.kitType,
      issueType: jersey.issueType,
      brand: jersey.brand,
      gender: jersey.gender,
      price: jersey.price,
      description: jersey.description,
      image: jersey.image,
      rating: jersey.rating,
      isNew: jersey.isNew,
      stock: jersey.stock,
    });
    setStatus({ type: "idle", message: "" });
  };

  const handleDelete = async (jerseyId) => {
    setStatus({ type: "loading", message: "Menghapus jersey..." });
    try {
      await deleteJersey(jerseyId);
      setStatus({ type: "success", message: "Jersey berhasil dihapus." });
      await loadJerseys();
    } catch (error) {
      setStatus({ type: "error", message: error?.message || "Gagal menghapus jersey." });
    }
  };

  const submitLabel = editId ? "Simpan Perubahan" : "Tambah Jersey";

  if (isLoading) {
    return (
      <div className="container" style={{ padding: "4rem 1.5rem 8rem 1.5rem" }}>
        <div className="glass-panel" style={{ padding: "2rem", borderRadius: "var(--radius-lg)" }}>
          <p className="text-muted">Memeriksa sesi admin...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: "4rem 1.5rem 8rem 1.5rem" }}>
      <div className="flex items-center justify-between" style={{ marginBottom: "2.5rem", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h1 className="heading-2">Kelola Jersey</h1>
          <p className="text-muted">Admin panel untuk membuat, mengubah, dan menghapus Catalog Jersey.</p>
        </div>
        <Link href="/admin/login" style={{ color: "var(--primary)", fontWeight: 600 }}>Login Admin</Link>
      </div>

      <div className="glass-panel" style={{ padding: "2rem", borderRadius: "var(--radius-lg)", marginBottom: "2rem" }}>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem" }}>
            <input placeholder="Club Name" value={form.clubName} onChange={handleChange("clubName")} required style={inputStyle} />
            <input placeholder="League" value={form.league} onChange={handleChange("league")} required style={inputStyle} />
            <input placeholder="Country" value={form.country} onChange={handleChange("country")} required style={inputStyle} />
            <input placeholder="Season" value={form.season} onChange={handleChange("season")} required style={inputStyle} />
            <input placeholder="Kit Type" value={form.kitType} onChange={handleChange("kitType")} required style={inputStyle} />
            <input placeholder="Issue Type" value={form.issueType} onChange={handleChange("issueType")} required style={inputStyle} />
            <input placeholder="Brand" value={form.brand} onChange={handleChange("brand")} required style={inputStyle} />
            <input placeholder="Gender" value={form.gender} onChange={handleChange("gender")} required style={inputStyle} />
            <input placeholder="Price" type="number" value={form.price} onChange={handleChange("price")} required style={inputStyle} />
            <input placeholder="Rating" type="number" step="0.1" value={form.rating} onChange={handleChange("rating")} required style={inputStyle} />
            <input placeholder="Stock" type="number" value={form.stock} onChange={handleChange("stock")} required style={inputStyle} />
            <input placeholder="Image URL" value={form.image} onChange={handleChange("image")} required style={inputStyle} />
          </div>

          <textarea
            placeholder="Deskripsi"
            value={form.description}
            onChange={handleChange("description")}
            rows={3}
            required
            style={{ width: "100%", padding: "0.75rem 1rem", borderRadius: "var(--radius-sm)", border: "1px solid var(--border)", background: "var(--surface)", color: "var(--text-main)" }}
          />

          <label style={{ display: "flex", gap: "0.5rem", alignItems: "center", fontSize: "0.9rem", color: "var(--text-muted)" }}>
            <input type="checkbox" checked={form.isNew} onChange={handleChange("isNew")} />
            Tandai sebagai New Arrival
          </label>

          <div className="flex gap-3" style={{ flexWrap: "wrap" }}>
            <button
              type="submit"
              style={{ backgroundColor: "var(--primary)", color: "#000", padding: "0.75rem 1.5rem", borderRadius: "var(--radius-sm)", fontWeight: 700 }}
            >
              {submitLabel}
            </button>
            {editId && (
              <button
                type="button"
                onClick={() => {
                  setEditId(null);
                  setForm(emptyForm);
                }}
                style={{ padding: "0.75rem 1.5rem", borderRadius: "var(--radius-sm)", border: "1px solid var(--border)", background: "transparent", color: "var(--text-main)" }}
              >
                Batal Edit
              </button>
            )}
          </div>
        </form>

        {status.type !== "idle" && (
          <div style={{ marginTop: "1.5rem", color: status.type === "error" ? "#f87171" : "var(--text-main)" }}>
            {status.message}
          </div>
        )}
      </div>

      <div style={{ display: "grid", gap: "1rem" }}>
        {jerseys.map((jersey) => (
          <div key={jersey.id} className="glass-panel" style={{ padding: "1.5rem", borderRadius: "var(--radius-md)", display: "flex", flexWrap: "wrap", gap: "1rem", alignItems: "center" }}>
            <div style={{ flex: "1 1 280px" }}>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700 }}>{jersey.clubName}</h3>
              <p className="text-muted" style={{ fontSize: "0.9rem" }}>{jersey.league} • {jersey.season} • Stock: {jersey.stock}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(jersey)}
                style={{ padding: "0.5rem 1rem", borderRadius: "var(--radius-sm)", border: "1px solid var(--border)", background: "transparent", color: "var(--text-main)" }}
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(jersey.id)}
                style={{ padding: "0.5rem 1rem", borderRadius: "var(--radius-sm)", background: "#f87171", color: "#111" }}
              >
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
