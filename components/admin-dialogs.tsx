"use client";

import { EventLocation } from "@/lib/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { JSX, useState, ReactNode } from "react";
import { motion } from "framer-motion";

interface BaseDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  onConfirm: () => void;
  confirmText: string;
  confirmClass?: string;
}

function BaseDialog({
  isOpen,
  onClose,
  title,
  children,
  onConfirm,
  confirmText,
  confirmClass,
}: BaseDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] glass border-yellow-400/10">
        <DialogHeader>
          <DialogTitle className="text-yellow-400 text-xl font-extralight tracking-wide">
            {title}
          </DialogTitle>
        </DialogHeader>
        {children}
        <DialogFooter>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="bg-transparent hover:bg-white/5 text-gray-300 border border-white/10 rounded-none font-extralight"
            >
              CANCELAR
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              type="button"
              onClick={onConfirm}
              className={`bg-transparent rounded-none font-extralight tracking-wider ${confirmClass}`}
            >
              {confirmText}
            </Button>
          </motion.div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

interface LocationFormProps {
  location: Omit<EventLocation, "id">;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

function LocationForm({ location, onChange }: LocationFormProps) {
  return (
    <div className="grid gap-4 py-4">
      <div className="grid gap-2">
        <Label htmlFor="name" className="text-gray-300 font-extralight">
          Nome do Local
        </Label>
        <Input
          id="name"
          name="name"
          value={location.name}
          onChange={onChange}
          placeholder="ex: Parque Ibirapuera"
          className="bg-black/50 border-white/10 focus:border-yellow-400/50 text-white font-extralight"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="address" className="text-gray-300 font-extralight">
          Endereço
        </Label>
        <Textarea
          id="address"
          name="address"
          value={location.address}
          onChange={onChange}
          placeholder="Endereço completo"
          rows={2}
          className="bg-black/50 border-white/10 focus:border-yellow-400/50 text-white font-extralight"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="date" className="text-gray-300 font-extralight">
            Data
          </Label>
          <Input
            id="date"
            name="date"
            type="date"
            value={location.date}
            onChange={onChange}
            className="bg-black/50 border-white/10 focus:border-yellow-400/50 text-white font-extralight"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="time" className="text-gray-300 font-extralight">
            Horário
          </Label>
          <Input
            id="time"
            name="time"
            value={location.time}
            onChange={onChange}
            placeholder="ex: 14:00 - 17:00"
            className="bg-black/50 border-white/10 focus:border-yellow-400/50 text-white font-extralight"
          />
        </div>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="coordinates" className="text-gray-300 font-extralight">
          Coordenadas (opcional)
        </Label>
        <Input
          id="coordinates"
          name="coordinates"
          value={location.coordinates}
          onChange={onChange}
          placeholder='ex: 23°35"08.5"S 46°39"32.6"W'
          className="bg-black/50 border-white/10 focus:border-yellow-400/50 text-white font-extralight font-mono"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="imageUrl" className="text-gray-300 font-extralight">
          URL da Imagem (opcional)
        </Label>
        <Input
          id="imageUrl"
          name="imageUrl"
          value={location.imageUrl}
          onChange={onChange}
          placeholder="https://exemplo.com/imagem.jpg"
          className="bg-black/50 border-white/10 focus:border-yellow-400/50 text-white font-extralight"
        />
      </div>
    </div>
  );
}

interface AddLocationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  action: () => void;
  location: Omit<EventLocation, "id">;
  setLocation: React.Dispatch<React.SetStateAction<Omit<EventLocation, "id">>>;
  isMobile: boolean;
}

export function AddLocationDialog({
  isOpen,
  onClose,
  action,
  location,
  setLocation,
  isMobile,
}: AddLocationDialogProps) {
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setLocation((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (
      !location.name ||
      !location.address ||
      !location.date ||
      !location.time
    ) {
      alert("Por favor, preencha todos os campos obrigatórios");
      return;
    }
    action();
  };

  return (
    <BaseDialog
      isOpen={isOpen}
      onClose={onClose}
      title="Adicionar Novo Local"
      onConfirm={handleSubmit}
      confirmText="ADICIONAR"
      confirmClass="hover:bg-emerald-400/10 text-emerald-400 border border-emerald-400/30"
    >
      <form onSubmit={(e) => e.preventDefault()}>
        <LocationForm location={location} onChange={handleInputChange} />
      </form>
    </BaseDialog>
  );
}

interface EditLocationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  location: EventLocation;
  onSave: (location: EventLocation) => Promise<void>;
}

export function EditLocationDialog({
  isOpen,
  onClose,
  location,
  onSave,
}: EditLocationDialogProps): JSX.Element {
  const [formData, setFormData] = useState(location);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (
      !formData.name ||
      !formData.address ||
      !formData.date ||
      !formData.time
    ) {
      alert("Por favor, preencha todos os campos obrigatórios");
      return;
    }
    await onSave(formData);
    onClose();
  };

  return (
    <BaseDialog
      isOpen={isOpen}
      onClose={onClose}
      title="Editar Localização"
      onConfirm={handleSubmit}
      confirmText="SALVAR"
      confirmClass="hover:bg-yellow-400/10 text-yellow-400 border border-yellow-400/30"
    >
      <form onSubmit={(e) => e.preventDefault()}>
        <LocationForm location={formData} onChange={handleInputChange} />
      </form>
    </BaseDialog>
  );
}

interface DeleteLocationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  location: EventLocation;
  onConfirm: () => Promise<void>;
}

export function DeleteLocationDialog({
  isOpen,
  onClose,
  location,
  onConfirm,
}: DeleteLocationDialogProps): JSX.Element {
  const handleConfirm = async () => {
    await onConfirm();
    onClose();
  };

  return (
    <BaseDialog
      isOpen={isOpen}
      onClose={onClose}
      title="Confirmar Exclusão"
      onConfirm={handleConfirm}
      confirmText="EXCLUIR"
      confirmClass="hover:bg-red-500/10 text-red-400 border border-red-500/30"
    >
      <p className="text-gray-300 font-extralight py-4">
        Tem certeza que deseja excluir "{location.name}"? Esta ação não pode ser
        desfeita.
      </p>
    </BaseDialog>
  );
}
