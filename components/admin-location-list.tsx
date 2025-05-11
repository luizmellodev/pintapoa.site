"use client";

import { motion } from "framer-motion";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LocationCard } from "./admin-location-card";
import type { EventLocation } from "@/lib/types";
import { CustomLoading } from "@/components/loading";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface LocationListProps {
  locations: EventLocation[];
  loading: boolean;
  onEdit: (location: EventLocation) => void;
  onDelete: (location: EventLocation) => void;
  onAdd: (location: Omit<EventLocation, "id">) => void;
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
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [formData, setFormData] = useState<Omit<EventLocation, "id">>({
    name: "",
    address: "",
    date: "",
    time: "",
    imageUrl: "",
    coordinates: "",
  });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (
      !formData.name ||
      !formData.address ||
      !formData.date ||
      !formData.time
    ) {
      alert("Por favor, preencha todos os campos obrigatórios");
      return;
    }

    onAdd(formData);
    setIsAddDialogOpen(false);
    setFormData({
      name: "",
      address: "",
      date: "",
      time: "",
      imageUrl: "",
      coordinates: "",
    });
  };

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
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-transparent hover:bg-emerald-400/10 text-emerald-400 border border-emerald-400/30 rounded-none font-extralight tracking-wider">
                <PlusCircle className="h-4 w-4 mr-2" />
                {isMobile ? "NOVO" : "ADICIONAR LOCAL"}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] glass border-yellow-400/10">
              <DialogHeader>
                <DialogTitle className="text-yellow-400 text-xl font-extralight tracking-wide">
                  Adicionar Novo Local
                </DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label
                    htmlFor="name"
                    className="text-gray-300 font-extralight"
                  >
                    Nome do Local
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="ex: Parque Ibirapuera"
                    className="bg-black/50 border-white/10 focus:border-yellow-400/50 text-white font-extralight"
                  />
                </div>
                <div className="grid gap-2">
                  <Label
                    htmlFor="address"
                    className="text-gray-300 font-extralight"
                  >
                    Endereço
                  </Label>
                  <Textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Endereço completo"
                    rows={2}
                    className="bg-black/50 border-white/10 focus:border-yellow-400/50 text-white font-extralight"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label
                      htmlFor="date"
                      className="text-gray-300 font-extralight"
                    >
                      Data
                    </Label>
                    <Input
                      id="date"
                      name="date"
                      type="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      className="bg-black/50 border-white/10 focus:border-yellow-400/50 text-white font-extralight"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label
                      htmlFor="time"
                      className="text-gray-300 font-extralight"
                    >
                      Horário
                    </Label>
                    <Input
                      id="time"
                      name="time"
                      value={formData.time}
                      onChange={handleInputChange}
                      placeholder="ex: 14:00 - 17:00"
                      className="bg-black/50 border-white/10 focus:border-yellow-400/50 text-white font-extralight"
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label
                    htmlFor="coordinates"
                    className="text-gray-300 font-extralight"
                  >
                    Coordenadas (opcional)
                  </Label>
                  <Input
                    id="coordinates"
                    name="coordinates"
                    value={formData.coordinates}
                    onChange={handleInputChange}
                    placeholder='ex: 23°35"08.5"S 46°39"32.6"W'
                    className="bg-black/50 border-white/10 focus:border-yellow-400/50 text-white font-extralight font-mono"
                  />
                </div>
                <div className="grid gap-2">
                  <Label
                    htmlFor="imageUrl"
                    className="text-gray-300 font-extralight"
                  >
                    URL da Imagem (opcional)
                  </Label>
                  <Input
                    id="imageUrl"
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleInputChange}
                    placeholder="https://exemplo.com/imagem.jpg"
                    className="bg-black/50 border-white/10 focus:border-yellow-400/50 text-white font-extralight"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsAddDialogOpen(false)}
                  className="bg-transparent hover:bg-white/5 text-gray-300 border border-white/10 rounded-none font-extralight"
                >
                  CANCELAR
                </Button>
                <Button
                  onClick={handleSubmit}
                  className="bg-transparent hover:bg-emerald-400/10 text-emerald-400 border border-emerald-400/30 rounded-none font-extralight tracking-wider"
                >
                  ADICIONAR
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </motion.div>
      </div>

      {loading ? (
        <motion.div
          className="flex justify-center items-center h-60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <CustomLoading />
        </motion.div>
      ) : locations.length === 0 ? (
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
          {locations.map((location) => (
            <LocationCard
              key={location.id}
              location={location}
              onEdit={() => onEdit(location)}
              onDelete={() => onDelete(location)}
            />
          ))}
        </motion.div>
      )}
    </div>
  );
}
