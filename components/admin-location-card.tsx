"use client";

import { motion } from "framer-motion";
import type { EventLocation } from "@/lib/types";

interface LocationCardProps {
  location: EventLocation;
  onEdit: () => void;
  onDelete: () => void;
}

export function LocationCard({
  location,
  onEdit,
  onDelete,
}: LocationCardProps) {
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={item}
      className="border-l-2 border-emerald-400/30 pl-3 sm:pl-4 py-1"
    >
      {/* Location card content */}
    </motion.div>
  );
}
