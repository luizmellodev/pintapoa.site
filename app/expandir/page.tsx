"use client"

import { motion } from "framer-motion"
import { Paintbrush, Mail, Globe, Building, Users } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ExpandirPage() {
  return (
    <main className="flex min-h-screen flex-col items-center p-6 md:p-10 bg-black">
      <div className="w-full max-w-4xl mx-auto">
        <motion.div
          className="flex items-center justify-center mb-8"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            animate={{
              rotate: [0, 5, -5, 5, 0],
            }}
            transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, repeatDelay: 5 }}
          >
            <Paintbrush className="h-8 w-8 text-yellow-400 mr-3" />
          </motion.div>
          <h1 className="text-3xl font-extralight tracking-wider yellow-text">
            PINTA <span className="text-orange-400">POA</span>
          </h1>
        </motion.div>

        <div className="flex justify-center space-x-4 mb-16">
          <Link href="/">
            <Button variant="link" className="text-gray-400 hover:text-yellow-400 font-extralight">
              INÍCIO
            </Button>
          </Link>
          <Link href="/sobre">
            <Button variant="link" className="text-gray-400 hover:text-yellow-400 font-extralight">
              SOBRE
            </Button>
          </Link>
          <Link href="/expandir">
            <Button variant="link" className="text-yellow-400 font-extralight">
              EXPANDIR
            </Button>
          </Link>
          <Link href="/estabelecimentos">
            <Button variant="link" className="text-gray-400 hover:text-yellow-400 font-extralight">
              ESTABELECIMENTOS
            </Button>
          </Link>
          <Link href="/playlist">
            <Button variant="link" className="text-gray-400 hover:text-yellow-400 font-extralight">
              PLAYLIST
            </Button>
          </Link>
          <Link href="/referencias">
            <Button variant="link" className="text-gray-400 hover:text-yellow-400 font-extralight">
              REFERÊNCIAS
            </Button>
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extralight tracking-wider text-yellow-400 mb-4">
              Leve o PINTA para
            </h2>
            <h2 className="text-4xl md:text-5xl font-extralight tracking-wider text-emerald-400 mb-8">sua cidade!</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <motion.div whileHover={{ y: -5 }} className="border-t-2 border-yellow-400/30 pt-4">
              <Globe className="h-8 w-8 text-yellow-400 mb-4" />
              <h3 className="text-xl font-extralight yellow-text mb-3">Expansão</h3>
              <p className="text-gray-300 font-extralight">
                Ajude a expandir o PINTA para sua cidade e crie uma comunidade artística local.
              </p>
            </motion.div>

            <motion.div whileHover={{ y: -5 }} className="border-t-2 border-emerald-400/30 pt-4">
              <Building className="h-8 w-8 text-emerald-400 mb-4" />
              <h3 className="text-xl font-extralight green-text mb-3">Colaboração</h3>
              <p className="text-gray-300 font-extralight">
                Trabalhe conosco para adaptar o evento ao contexto e cultura da sua cidade.
              </p>
            </motion.div>

            <motion.div whileHover={{ y: -5 }} className="border-t-2 border-orange-400/30 pt-4">
              <Users className="h-8 w-8 text-orange-400 mb-4" />
              <h3 className="text-xl font-extralight orange-text mb-3">Comunidade</h3>
              <p className="text-gray-300 font-extralight">
                Crie conexões entre artistas locais e entusiastas da arte na sua região.
              </p>
            </motion.div>
          </div>

          <div className="mb-16">
            <h2 className="text-2xl font-extralight mb-6 tracking-wide yellow-text">COMO FUNCIONA</h2>
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-yellow-400/20 flex items-center justify-center mr-4 mt-1">
                  <span className="text-yellow-400 font-light">1</span>
                </div>
                <div>
                  <h3 className="text-lg font-extralight text-yellow-400 mb-2">Entre em contato</h3>
                  <p className="text-gray-300 font-extralight">
                    Envie-nos uma mensagem expressando seu interesse em trazer o PINTA para sua cidade.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-400/20 flex items-center justify-center mr-4 mt-1">
                  <span className="text-emerald-400 font-light">2</span>
                </div>
                <div>
                  <h3 className="text-lg font-extralight text-emerald-400 mb-2">Planejamento conjunto</h3>
                  <p className="text-gray-300 font-extralight">
                    Trabalharemos juntos para adaptar o formato do evento às características da sua cidade.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-400/20 flex items-center justify-center mr-4 mt-1">
                  <span className="text-orange-400 font-light">3</span>
                </div>
                <div>
                  <h3 className="text-lg font-extralight text-orange-400 mb-2">Suporte contínuo</h3>
                  <p className="text-gray-300 font-extralight">
                    Oferecemos orientação e materiais para ajudar você a organizar e promover o evento.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-yellow-400/20 flex items-center justify-center mr-4 mt-1">
                  <span className="text-yellow-400 font-light">4</span>
                </div>
                <div>
                  <h3 className="text-lg font-extralight text-yellow-400 mb-2">Lançamento</h3>
                  <p className="text-gray-300 font-extralight">
                    Ajudamos a divulgar e lançar o primeiro PINTA na sua cidade, criando uma base sólida para eventos
                    futuros.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-extralight mb-6 tracking-wide yellow-text">ENTRE EM CONTATO</h2>
            <p className="text-gray-300 font-extralight mb-8 max-w-lg mx-auto">
              Interessado em trazer o PINTA para sua cidade? Entre em contato conosco para conversarmos sobre as
              possibilidades.
            </p>
            <a
              href="mailto:expandir@pintapoa.com.br"
              className="inline-flex items-center bg-transparent hover:bg-emerald-400/10 text-emerald-400 border border-emerald-400/30 rounded-none px-6 py-3 text-base font-light tracking-widest"
            >
              <Mail className="mr-2 h-5 w-5" /> ENVIAR EMAIL
            </a>
          </div>
        </motion.div>
      </div>
    </main>
  )
}
