"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings } from "lucide-react";
import { motion } from "framer-motion";
import type { EventStatus } from "@/lib/types";

const statusOptions = {
  waiting: "Aguardando",
  active: "Ativo (Mostrar Localização Atual)",
  "see-you-soon": "Até Breve",
  ended: "Fim do Projeto",
};

interface StatusCardProps {
  currentStatus: EventStatus;
  onStatusChange: (status: EventStatus) => void;
  statusOptions: Record<EventStatus, string>;
}

export function StatusCard({
  currentStatus,
  onStatusChange,
  statusOptions,
}: StatusCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <Card className="glass border-yellow-400/10 shadow-lg mb-8 sm:mb-12">
        <CardHeader>
          <CardTitle className="flex items-center text-yellow-400 font-extralight tracking-wide text-lg sm:text-xl">
            <Settings className="h-5 w-5 mr-2" /> STATUS DO EVENTO
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {Object.entries(statusOptions).map(([key, label]) => (
              <label
                key={key}
                className="flex items-center space-x-2 w-full text-left cursor-pointer"
              >
                <input
                  type="radio"
                  name="eventStatus"
                  value={key}
                  checked={currentStatus === key}
                  onChange={() => onStatusChange(key as EventStatus)}
                  className="hidden"
                />
                <div
                  className={`w-4 h-4 rounded-full border-2 ${
                    currentStatus === key
                      ? "bg-yellow-400 border-yellow-400"
                      : "border-gray-400"
                  }`}
                />
                <span className="text-sm text-gray-200">{label}</span>
              </label>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
