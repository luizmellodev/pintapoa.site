"use client";

import { motion } from "framer-motion";
import {
  PlusCircle,
  MapPin,
  Calendar,
  Clock,
  Compass,
  Edit,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { EventLocation } from "@/lib/types";
import { useEffect } from "react";

interface LocationListProps {
  locations: EventLocation[];
  loading: boolean;
  onEdit: (location: EventLocation) => void;
  onDelete: (location: EventLocation) => void;
  onAdd: () => void;
  isMobile?: boolean;
}

export function LocationList({
  locations,
  loading,
  onEdit,
  onDelete,
  onAdd,
  isMobile = false,
}: LocationListProps) {
  // Adicionar useEffect para logar quando o componente recebe novas props
  useEffect(() => {
    console.log("LocationList - Props atualizadas:", {
      loading,
      locationsCount: locations?.length || 0,
      locations,
    });
  }, [locations, loading]);

  console.log("LocationList - Renderizando com:", {
    loading,
    locationsCount: locations?.length || 0,
    locations,
    isArray: Array.isArray(locations),
    firstItem: locations && locations.length > 0 ? locations[0] : null,
  });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  // Verificação mais detalhada para depuração
  const hasLocations = Array.isArray(locations) && locations.length > 0;
  console.log("LocationList - hasLocations:", hasLocations);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <motion.h2
          className="text-lg sm:text-xl font-extralight tracking-wide yellow-text border-b border-yellow-400/20 pb-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          GERENCIAR LOCALIZAÇÕES
        </motion.h2>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={onAdd}
            className="bg-transparent hover:bg-emerald-400/10 text-emerald-400 border border-emerald-400/30 rounded-none font-extralight tracking-wider"
          >
            <PlusCircle className="h-4 w-4 mr-2" />{" "}
            {isMobile ? "NOVO" : "ADICIONAR LOCAL"}
          </Button>
        </motion.div>
      </div>

      {loading ? (
        <motion.div
          className="flex justify-center items-center h-60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="w-8 h-8 rounded-full border-2 border-yellow-400/20 border-t-yellow-400 animate-spin"></div>
        </motion.div>
      ) : !hasLocations ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p className="text-gray-400 font-extralight">
            Nenhuma localização adicionada ainda.
          </p>
        </motion.div>
      ) : (
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-4 sm:space-y-6"
        >
          {locations.map((location) => {
            console.log("Renderizando localização:", location);
            return (
              <motion.div
                key={location.id}
                variants={item}
                className="border-l-2 border-emerald-400/30 pl-3 sm:pl-4 py-1"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="mb-4 sm:mb-0">
                    <h3 className="text-base sm:text-lg font-extralight green-text mb-2">
                      {location.name}
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-start">
                        <MapPin className="h-4 w-4 text-orange-400 mr-2 mt-1 flex-shrink-0" />
                        <p className="text-gray-400 font-extralight text-xs sm:text-sm">
                          {location.address}
                        </p>
                      </div>
                      <div className="flex items-start">
                        <Calendar className="h-4 w-4 text-yellow-400 mr-2 mt-1 flex-shrink-0" />
                        <p className="text-gray-400 font-extralight text-xs sm:text-sm">
                          {new Date(location.date).toLocaleDateString("pt-BR")}
                        </p>
                      </div>
                      <div className="flex items-start">
                        <Clock className="h-4 w-4 text-emerald-400 mr-2 mt-1 flex-shrink-0" />
                        <p className="text-gray-400 font-extralight text-xs sm:text-sm">
                          {location.time}
                        </p>
                      </div>
                      {location.coordinates && (
                        <div className="flex items-start">
                          <Compass className="h-4 w-4 text-orange-400 mr-2 mt-1 flex-shrink-0" />
                          <p className="text-gray-400 font-extralight text-xs sm:text-sm font-mono">
                            {location.coordinates}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onEdit(location)}
                        className="bg-transparent hover:bg-yellow-400/10 text-yellow-400 border border-yellow-400/30 rounded-none font-extralight tracking-wider"
                      >
                        <Edit className="h-4 w-4 mr-1" /> EDITAR
                      </Button>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => onDelete(location)}
                        className="bg-transparent hover:bg-red-500/10 text-red-400 border border-red-500/30 rounded-none font-extralight tracking-wider"
                      >
                        <Trash2 className="h-4 w-4 mr-1" /> EXCLUIR
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </div>
  );
}
