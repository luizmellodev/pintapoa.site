// components/admin-header.tsx
"use client";

import Link from "next/link";
import { ArrowLeft, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface HeaderProps {
  onSignOut: () => Promise<void>;
}

export function Header({ onSignOut }: HeaderProps) {
  return (
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
        <h1 className="text-xl sm:text-2xl font-extralight tracking-wider yellow-text">
          Painel de Administração
        </h1>
      </div>
      <div className="flex items-center space-x-3">
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
  );
}
