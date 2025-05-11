"use client";

import { motion } from "framer-motion";
import { Settings } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { EventStatus } from "@/lib/types";

interface StatusCardProps {
  currentStatus: EventStatus;
  onStatusChange: (status: EventStatus) => void;
  statusOptions: Record<string, string>;
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
          <div className="grid gap-2">
            <Label className="text-gray-300 font-extralight">
              Status Atual:{" "}
              <span className="text-orange-400">
                {statusOptions[currentStatus]}
              </span>
            </Label>
            <Select
              value={currentStatus}
              onValueChange={(value) => onStatusChange(value as EventStatus)}
            >
              <SelectTrigger className="bg-black/50 border-white/10 focus:ring-yellow-400/30 font-extralight">
                <SelectValue placeholder="Selecione o status" />
              </SelectTrigger>
              <SelectContent className="glass border-yellow-400/10">
                <SelectItem value="waiting">{statusOptions.waiting}</SelectItem>
                <SelectItem value="active">{statusOptions.active}</SelectItem>
                <SelectItem value="see-you-soon">
                  {statusOptions["see-you-soon"]}
                </SelectItem>
                <SelectItem value="ended">{statusOptions.ended}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
