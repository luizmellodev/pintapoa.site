"use client"

import { motion } from "framer-motion"
import { Paintbrush, Mail, Store, Coffee, Calendar } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function EstabelecimentosPage() {
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
            <Button variant="link" className="text-gray-400 hover:text-yellow-400 font-extralight">
              EXPANDIR
            </Button>
          </Link>
          <Link href="/estabelecimentos">
            <Button variant="link" className="text-yellow-400 font-extralight">
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
            <h2 className="text-4xl md:text-5xl font-extralight tracking-wider text-yellow-400 mb-4">Receba o PINTA</h2>
            <h2 className="text-4xl md:text-5xl font-extralight tracking-wider text-emerald-400 mb-8">
              no seu estabelecimento!
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <motion.div whileHover={{ y: -5 }} className="border-t-2 border-yellow-400/30 pt-4">
              <Store className="h-8 w-8 text-yellow-400 mb-4" />
              <h3 className="text-xl font-extralight yellow-text mb-3">Visibilidade</h3>
              <p className="text-gray-300 font-extralight">
                Atraia um novo público para seu estabelecimento e ganhe exposição nas nossas redes sociais.
              </p>
            </motion.div>

            <motion.div whileHover={{ y: -5 }} className="border-t-2 border-emerald-400/30 pt-4">
              <Coffee className="h-8 w-8 text-emerald-400 mb-4" />
              <h3 className="text-xl font-extralight green-text mb-3">Experiência</h3>
              <p className="text-gray-300 font-extralight">
                Ofereça uma experiência única aos seus clientes, combinando arte, gastronomia e socialização.
              </p>
            </motion.div>

            <motion.div whileHover={{ y: -5 }} className="border-t-2 border-orange-400/30 pt-4">
              <Calendar className="h-8 w-8 text-orange-400 mb-4" />
              <h3 className="text-xl font-extralight orange-text mb-3">Flexibilidade</h3>
              <p className="text-gray-300 font-extralight">
                Escolha as datas e horários que melhor se adequam ao seu estabelecimento para receber nossos eventos.
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
                  <h3 className="text-lg font-extralight text-yellow-400 mb-2">Parceria</h3>
                  <p className="text-gray-300 font-extralight">
                    Estabelecemos uma parceria onde seu espaço recebe nosso evento e nós trazemos o público.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-400/20 flex items-center justify-center mr-4 mt-1">
                  <span className="text-emerald-400 font-light">2</span>
                </div>
                <div>
                  <h3 className="text-lg font-extralight text-emerald-400 mb-2">Organização</h3>
                  <p className="text-gray-300 font-extralight">
                    Nós cuidamos de toda a organização do evento, incluindo materiais de arte, inscrições e divulgação.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-400/20 flex items-center justify-center mr-4 mt-1">
                  <span className="text-orange-400 font-light">3</span>
                </div>
                <div>
                  <h3 className="text-lg font-extralight text-orange-400 mb-2">Benefícios mútuos</h3>
                  <p className="text-gray-300 font-extralight">
                    Seu estabelecimento fornece o espaço e o serviço de alimentação, enquanto nós trazemos um público
                    engajado e uma experiência diferenciada.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-2xl font-extralight mb-6 tracking-wide yellow-text">ESTABELECIMENTOS IDEAIS</h2>
            <ul className="space-y-3">
              <li className="flex items-center">
                <div className="w-2 h-2 bg-emerald-400 rounded-full mr-3"></div>
                <span className="text-gray-300 font-extralight">Cafeterias e bistrôs</span>
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-emerald-400 rounded-full mr-3"></div>
                <span className="text-gray-300 font-extralight">Restaurantes com espaço para atividades</span>
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-emerald-400 rounded-full mr-3"></div>
                <span className="text-gray-300 font-extralight">Bares e pubs com ambiente adequado</span>
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-emerald-400 rounded-full mr-3"></div>
                <span className="text-gray-300 font-extralight">Espaços culturais e galerias</span>
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-emerald-400 rounded-full mr-3"></div>
                <span className="text-gray-300 font-extralight">Livrarias com área de convivência</span>
              </li>
            </ul>
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-extralight mb-6 tracking-wide yellow-text">ENTRE EM CONTATO</h2>
            <p className="text-gray-300 font-extralight mb-8 max-w-lg mx-auto">
              Interessado em receber o PINTA no seu estabelecimento? Entre em contato conosco para conversarmos sobre as
              possibilidades.
            </p>
            <a
              href="mailto:estabelecimentos@pintapoa.com.br"
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
