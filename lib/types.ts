export type EventStatus = "waiting" | "active" | "see-you-soon" | "ended"
export interface EventLocation {
  id: string
  name: string
  address: string
  date: string
  time: string
  imageUrl?: string
  coordinates?: string
  description?: string
}

// Tipos para props de componentes
export interface AdminLayoutProps {
  children: React.ReactNode;
}

export interface HeaderProps {
  userEmail?: string;
}

export interface StatusCardProps {
  currentStatus: EventStatus;
  onStatusChange: (status: EventStatus) => void;
}

export interface LocationListProps {
  locations: EventLocation[];
  loading: boolean;
  onEdit: (location: EventLocation) => void;
  onDelete: (location: EventLocation) => void;
}

// Tipos para os diálogos
export interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface AddLocationDialogProps extends DialogProps {
  onAdd: (location: Omit<EventLocation, 'id'>) => void;
  isMobile: boolean;
}

export interface EditLocationDialogProps extends DialogProps {
  location: EventLocation | null;
  onSave: (location: EventLocation) => void;
}

export interface DeleteLocationDialogProps extends DialogProps {
  location: EventLocation | null;
  onConfirm: () => void;
}

// Tipos para formulários
export interface LocationFormData {
  name: string;
  address: string;
  date: string;
  time: string;
  imageUrl?: string;
  coordinates?: string;
}

// Tipos para respostas da API
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// Tipos para contexto (se necessário)
export interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

export interface User {
  id: string;
  email: string;
  role: 'admin' | 'user';
  createdAt: string;
}

// Tipos para hooks personalizados
export interface UseLocationsReturn {
  locations: EventLocation[];
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

// Tipos para temas e estilos
export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
}

// Tipos para configuração do Firebase
export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

// Tipos para serviços
export interface LocationService {
  getAll: () => Promise<EventLocation[]>;
  getById: (id: string) => Promise<EventLocation>;
  create: (location: Omit<EventLocation, 'id'>) => Promise<EventLocation>;
  update: (location: EventLocation) => Promise<EventLocation>;
  delete: (id: string) => Promise<void>;
}

export interface StatusService {
  getCurrentStatus: () => Promise<EventStatus>;
  updateStatus: (status: EventStatus) => Promise<void>;
}

// Tipos para utilitários
export interface DateTimeFormatOptions {
  locale?: string;
  format?: 'short' | 'long' | 'full';
}

// Tipos para validação
export interface ValidationError {
  field: string;
  message: string;
}

export interface FormErrors {
  [key: string]: string[];
}

export interface Location {
  id: string
  name: string
  address: string
  phone: string
  email: string
  description: string
  date: string
  time: string
}