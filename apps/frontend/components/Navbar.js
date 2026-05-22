"use client";

import Link from 'next/link';
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { logout } from "@komatik/api-client";
import useAdminSession from "../hooks/useAdminSession";

export default function Navbar() {
  const { admin, isLoading, error } = useAdminSession();
  const [logoutStatus, setLogoutStatus] = useState({ type: "idle", message: "" });
  const queryClient = useQueryClient();

  const isAuthed = Boolean(admin && !isLoading && !error);

  const handleLogout = async () => {
    setLogoutStatus({ type: "loading", message: "" });
    try {
      await logout();
      await queryClient.invalidateQueries({ queryKey: ["admin-session"] });
      setLogoutStatus({ type: "success", message: "Logout berhasil" });
    } catch (err) {
      setLogoutStatus({ type: "error", message: err?.message || "Logout gagal" });
    }
  };

  return (
    <header className="glass-panel" style={{ position: 'sticky', top: 0, zIndex: 50, borderBottom: '1px solid var(--border)' }}>
      <div className="container flex items-center justify-between" style={{ height: '70px' }}>
        <Link href="/" className="flex items-center gap-2">
          <span className="heading-3 text-primary-gradient">EuroKits</span>
        </Link>
        <nav>
          <ul className="flex items-center gap-6">
            <li>
              <Link href="/" style={{ color: 'var(--text-muted)' }} className="hover:text-main">
                Home
              </Link>
            </li>
            <li>
              <Link href="/jerseys" style={{ color: 'var(--text-main)', fontWeight: 600 }}>
                Jerseys
              </Link>
            </li>
            <li>
              <Link href="/categories" style={{ color: 'var(--text-muted)' }} className="hover:text-main">
                Categories
              </Link>
            </li>
            <li>
              <Link href="/about" style={{ color: 'var(--text-muted)' }} className="hover:text-main">
                About
              </Link>
            </li>
            <li>
              {isAuthed ? (
                <div className="flex items-center gap-4">
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    Admin: <strong style={{ color: 'var(--text-main)' }}>{admin.username}</strong>
                  </span>
                  <Link href="/admin/jerseys" style={{ color: 'var(--text-main)', fontWeight: 600 }}>
                    Kelola Jersey
                  </Link>
                  <button
                    type="button"
                    onClick={handleLogout}
                    style={{
                      padding: '0.35rem 0.75rem',
                      borderRadius: '999px',
                      border: '1px solid var(--border)',
                      background: 'transparent',
                      color: 'var(--text-main)'
                    }}
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link href="/admin/login" className="hover:text-main" style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, padding: '0.2rem 0.5rem', borderRadius: '999px', border: '1px solid var(--border)', color: 'var(--text-main)' }}>
                    Admin
                  </span>
                  Login
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </div>
      {logoutStatus.type === "error" && (
        <div style={{ textAlign: 'center', color: '#f87171', padding: '0.25rem 0' }}>
          {logoutStatus.message}
        </div>
      )}
    </header>
  );
}
