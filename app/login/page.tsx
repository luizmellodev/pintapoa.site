"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { PaintBucket, Lock, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/auth-context";

export default function LoginPage() {
  const router = useRouter();
  const { user, loading, signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Redirecionar se já estiver logado
  useEffect(() => {
    if (user && !loading) {
      console.log("Usuário autenticado, redirecionando...");
      try {
        router.replace("/admin");
      } catch (error) {
        console.error(error);
      }
    }
  }, [user, loading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    console.log("Entrando no handleSubmit");
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      if (!email || !password) {
        setError("Email e senha são obrigatórios");
        return;
      }
      await signIn(email, password);
      console.log("Login realizado com sucesso");
      // Redirecionar para a página de administração
      console.log("Redirecionando para /admin");

      router.replace("/admin");
    } catch (error: any) {
      setError(error.message ?? "Email ou senha inválidos");
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black">
        <div className="w-8 h-8 rounded-full border-2 border-yellow-400/20 border-t-yellow-400 animate-spin"></div>
      </div>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-8 bg-black">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-sm"
      >
        <Card className="glass border-yellow-400/10 shadow-lg">
          <CardHeader className="space-y-1">
            <motion.div
              className="flex items-center justify-center mb-4"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, type: "spring" }}
            >
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
                <PaintBucket className="h-8 w-8 text-yellow-400 mr-3" />
              </motion.div>
              <h1 className="text-3xl font-extralight tracking-wider yellow-text">
                PINTA <span className="text-orange-400">POA</span>
              </h1>
            </motion.div>
            <CardTitle className="text-2xl text-center font-extralight tracking-wide text-yellow-400">
              Login de Administrador
            </CardTitle>
            <CardDescription className="text-center text-gray-400 font-extralight">
              Digite suas credenciais para acessar o painel de administração
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Alert
                  variant="destructive"
                  className="border-red-500/20 bg-red-500/5"
                >
                  <AlertDescription className="font-extralight">
                    {error}
                  </AlertDescription>
                </Alert>
              </motion.div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Label
                  htmlFor="email"
                  className="text-gray-300 font-extralight"
                >
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@exemplo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-black/50 border-white/10 focus:border-yellow-400/50 text-white font-extralight"
                    required
                  />
                </div>
              </motion.div>
              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Label
                  htmlFor="password"
                  className="text-gray-300 font-extralight"
                >
                  Senha
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 bg-black/50 border-white/10 focus:border-yellow-400/50 text-white font-extralight"
                    required
                  />
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  type="submit"
                  className="w-full bg-transparent hover:bg-yellow-400/10 text-yellow-400 border border-yellow-400/30 rounded-none font-extralight tracking-widest"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <div className="w-4 h-4 rounded-full border-2 border-yellow-400/30 border-t-yellow-400 animate-spin mr-2"></div>
                      ENTRANDO...
                    </span>
                  ) : (
                    <span>ENTRAR</span>
                  )}
                </Button>
              </motion.div>
            </form>
          </CardContent>
          <CardFooter>
            <p className="text-xs text-center w-full text-gray-500 font-extralight">
              Use suas credenciais de administrador para acessar o painel
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </main>
  );
}
