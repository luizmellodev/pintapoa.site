"use client";

import type React from "react";

import { motion } from "framer-motion";
import { ArrowLeft, LogOut, Paintbrush } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth-context";

interface AdminLayoutProps {
  children: React.ReactNode;
  onSignOut: () => void;
}

export function AdminLayout({ children, onSignOut }: AdminLayoutProps) {
  const { user } = useAuth();

  return (
    <main className="flex min-h-screen flex-col p-4 sm:p-6 md:p-10 bg-black">
      <div className="w-full max-w-xl sm:max-w-2xl md:max-w-4xl mx-auto">
        <motion.div
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 sm:mb-12 gap-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center">
            <Link href="/">
              <Button
                variant="ghost"
                size="icon"
                className="mr-3 hover:bg-yellow-400/10 text-white"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div className="flex items-center">
              <motion.div
                animate={{
                  rotate: [0, 5, -5, 5, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatDelay: 5,
                }}
              >
                <Paintbrush className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400 mr-2" />
              </motion.div>
              <h1 className="text-xl sm:text-2xl font-extralight tracking-wider yellow-text">
                Painel de Administração
              </h1>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-sm text-gray-400 hidden md:inline-block font-extralight">
              {user?.email || "Admin"}
            </span>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                size="sm"
                onClick={onSignOut}
                className="bg-transparent hover:bg-yellow-400/10 text-yellow-400 border border-yellow-400/30 rounded-none font-extralight tracking-wider"
              >
                <LogOut className="h-4 w-4 mr-2" /> SAIR
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {children}
      </div>
    </main>
  );
}
