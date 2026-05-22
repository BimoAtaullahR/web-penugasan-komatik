"use client";

import { useState } from "react";
import Link from "next/link";
import { login } from "@komatik/api-client";
import useAdminSession from "../../../hooks/useAdminSession";

export default function AdminLoginPage() {
  const { admin, isLoading } = useAdminSession();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState({ type: "idle", message: "" });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ type: "loading", message: "Memproses login..." });

    try {
      await login(username, password);
      setStatus({ type: "success", message: "Login berhasil." });
    } catch (error) {
      setStatus({
        type: "error",
        message: error?.message || "Login gagal. Coba lagi.",
      });
    }
  };

  return (
    <div className="container" style={{ padding: "4rem 1.5rem 8rem 1.5rem" }}>
      <div style={{ maxWidth: "480px", margin: "0 auto" }}>
        <Link
          href="/"
          style={{
            color: "var(--text-muted)",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            marginBottom: "2rem",
            fontWeight: 600,
          }}
        >
          <span>&larr;</span> Kembali ke Home
        </Link>

        <div className="glass-panel" style={{ padding: "2.5rem", borderRadius: "var(--radius-lg)" }}>
          <h1 className="heading-2" style={{ marginBottom: "0.5rem" }}>Admin Login</h1>
          <p className="text-muted" style={{ marginBottom: "2rem" }}>Masuk untuk mengelola Catalog Jersey.</p>

          {admin && !isLoading && (
            <div style={{ marginBottom: "1.5rem", padding: "0.75rem 1rem", borderRadius: "var(--radius-sm)", border: "1px solid var(--border)", background: "var(--surface)" }}>
              <p className="text-muted" style={{ marginBottom: "0.5rem" }}>
                Anda sudah login sebagai <strong style={{ color: "var(--text-main)" }}>{admin.username}</strong>.
              </p>
              <Link href="/admin/jerseys" style={{ color: "var(--primary)", fontWeight: 600 }}>
                Lanjut ke Kelola Jersey
              </Link>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <label className="text-muted" style={{ fontSize: "0.9rem" }}>
              Username
              <input
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                type="text"
                placeholder="admin"
                required
                style={{
                  width: "100%",
                  marginTop: "0.5rem",
                  padding: "0.75rem 1rem",
                  borderRadius: "var(--radius-sm)",
                  border: "1px solid var(--border)",
                  background: "var(--surface)",
                  color: "var(--text-main)",
                }}
              />
            </label>

            <label className="text-muted" style={{ fontSize: "0.9rem" }}>
              Password
              <input
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                type="password"
                placeholder="admin123"
                required
                style={{
                  width: "100%",
                  marginTop: "0.5rem",
                  padding: "0.75rem 1rem",
                  borderRadius: "var(--radius-sm)",
                  border: "1px solid var(--border)",
                  background: "var(--surface)",
                  color: "var(--text-main)",
                }}
              />
            </label>

            <button
              type="submit"
              style={{
                marginTop: "1rem",
                backgroundColor: "var(--primary)",
                color: "#000",
                padding: "0.85rem",
                borderRadius: "var(--radius-sm)",
                fontWeight: 700,
                fontSize: "1rem",
              }}
            >
              {status.type === "loading" ? "Memproses..." : "Masuk"}
            </button>
          </form>

          {status.type !== "idle" && (
            <div style={{ marginTop: "1.5rem", color: status.type === "error" ? "#f87171" : "var(--text-main)" }}>
              {status.message}
              {status.type === "success" && (
                <div style={{ marginTop: "0.75rem" }}>
                  <Link href="/admin/jerseys" style={{ color: "var(--primary)", fontWeight: 600 }}>
                    Lanjut ke Kelola Jersey
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
