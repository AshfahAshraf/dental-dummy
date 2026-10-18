'use client';

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import AdminSidebar from "@/components/layout/AdminSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [authorized, setAuthorized] = useState<boolean | null>(null);

  const isLoginPage = pathname === "/admin-panel/login";

  useEffect(() => {
    if (isLoginPage) {
      setAuthorized(true);
      return;
    }

    const token = typeof window !== "undefined" ? localStorage.getItem("admin_token") : null;
    const isStaff = typeof window !== "undefined" ? localStorage.getItem("is_staff") === "true" : false;

    if (!token) {
      router.push("/admin-panel/login");
      setAuthorized(false);
    } else {
      setAuthorized(true);
    }
  }, [pathname, router, isLoginPage]);

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (authorized === null) {
    return <div className="min-h-screen flex items-center justify-center text-slate-500">Loading admin panel...</div>;
  }

  return (
    <>
      <style>{`
        .admin-layout-content {
          margin-left: 240px;
          min-height: 100vh;
          background: #f1f5f9;
          padding: 32px 28px;
          transition: margin-left 0.3s;
          flex: 1;
          width: 100%;
          box-sizing: border-box;
        }
        @media (max-width: 900px) {
          .admin-layout-content {
            margin-left: 0;
            padding: 72px 16px 24px;
          }
        }
      `}</style>
      <div style={{ display: "flex" }}>
        <AdminSidebar />
        <main className="admin-layout-content">
          {children}
        </main>
      </div>
    </>
  );
}
