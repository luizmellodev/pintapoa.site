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
import { JSX, useState } from "react";
import { db } from "@/lib/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

interface AddLocationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  isMobile: boolean;
  onAdd: (location: Omit<EventLocation, "id">) => Promise<void>;
}

export function AddLocationDialog({
  isOpen,
  onClose,
  isMobile,
  onAdd,
}: AddLocationDialogProps): JSX.Element {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    date: "",
    time: "",
    imageUrl: "",
    coordinates: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (
        !formData.name ||
        !formData.address ||
        !formData.date ||
        !formData.time
      ) {
        alert("Por favor, preencha todos os campos obrigatórios");
        return;
      }

      await onAdd(formData);
      setFormData({
        name: "",
        address: "",
        date: "",
        time: "",
        imageUrl: "",
        coordinates: "",
      });
      onClose();
    } catch (error) {
      console.error("Error adding location:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] glass border-yellow-400/10">
        <DialogHeader>
          <DialogTitle className="text-yellow-400 text-xl font-extralight tracking-wide">
            Adicionar Novo Local
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name" className="text-gray-300 font-extralight">
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
                <Label htmlFor="date" className="text-gray-300 font-extralight">
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
                <Label htmlFor="time" className="text-gray-300 font-extralight">
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
              type="button"
              variant="outline"
              onClick={onClose}
              className="bg-transparent hover:bg-white/5 text-gray-300 border border-white/10 rounded-none font-extralight"
            >
              CANCELAR
            </Button>
            <Button
              type="submit"
              className="bg-transparent hover:bg-emerald-400/10 text-emerald-400 border border-emerald-400/30 rounded-none font-extralight tracking-wider"
            >
              ADICIONAR
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
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
    } catch (error) {
      console.error("Error updating location:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] glass border-yellow-400/10">
        <DialogHeader>
          <DialogTitle className="text-yellow-400 text-xl font-extralight tracking-wide">
            Editar Localização
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          {/* Mesmo conteúdo do formulário do AddLocationDialog */}
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="bg-transparent hover:bg-white/5 text-gray-300 border border-white/10 rounded-none font-extralight"
            >
              CANCELAR
            </Button>
            <Button
              type="submit"
              className="bg-transparent hover:bg-yellow-400/10 text-yellow-400 border border-yellow-400/30 rounded-none font-extralight tracking-wider"
            >
              SALVAR
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
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
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] glass border-yellow-400/10">
        <DialogHeader>
          <DialogTitle className="text-yellow-400 text-xl font-extralight tracking-wide">
            Confirmar Exclusão
          </DialogTitle>
        </DialogHeader>
        <p className="text-gray-300 font-extralight py-4">
          Tem certeza que deseja excluir "{location.name}"? Esta ação não pode
          ser desfeita.
        </p>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="bg-transparent hover:bg-white/5 text-gray-300 border border-white/10 rounded-none font-extralight"
          >
            CANCELAR
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={async () => {
              await onConfirm();
              onClose();
            }}
            className="bg-transparent hover:bg-red-500/10 text-red-400 border border-red-500/30 rounded-none font-extralight tracking-wider"
          >
            EXCLUIR
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
