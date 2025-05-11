// components/admin-layout.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { Header } from "@/components/admin-header";

interface AdminLayoutProps {
  children: React.ReactNode;
  onSignOut: () => Promise<void>;
}

export function AdminLayout({ children, onSignOut }: AdminLayoutProps) {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/login");
      }
    });

    return () => unsubscribe();
  }, [router]);

  return (
    <main className="flex min-h-screen flex-col p-4 sm:p-6 md:p-10 bg-black">
      <div className="w-full max-w-xl sm:max-w-2xl md:max-w-4xl mx-auto">
        <Header onSignOut={onSignOut} />
        {children}
      </div>
    </main>
  );
}
