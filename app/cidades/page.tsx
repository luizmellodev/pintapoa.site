"use client";

import { motion } from "framer-motion";
import { Mail, Globe, Building, Users } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-media-query";
import Header from "@/components/header";

export default function ExpandirPage() {
  const isMobile = useMediaQuery("(max-width: 640px)");

  return (
    <main className="flex min-h-screen flex-col items-center p-4 sm:p-6 md:p-10 bg-black">
      <div className="w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-4xl mx-auto">
        <Header isMobile={isMobile} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extralight tracking-wider text-yellow-400 mb-3 sm:mb-4">
              Leve o PINTA para
            </h2>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extralight tracking-wider text-emerald-400 mb-6 sm:mb-8">
              sua cidade!
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mb-10 sm:mb-16">
            <motion.div
              whileHover={{ y: -5 }}
              className="border-t-2 border-yellow-400/30 pt-4"
            >
              <Globe className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-400 mb-3 sm:mb-4" />
              <h3 className="text-lg sm:text-xl font-extralight yellow-text mb-2 sm:mb-3">
                Expansão
              </h3>
              <p className="text-gray-300 font-extralight text-sm sm:text-base">
                Ajude a expandir o PINTA para sua cidade e crie uma comunidade
                artística local.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="border-t-2 border-emerald-400/30 pt-4"
            >
              <Building className="h-6 w-6 sm:h-8 sm:w-8 text-emerald-400 mb-3 sm:mb-4" />
              <h3 className="text-lg sm:text-xl font-extralight green-text mb-2 sm:mb-3">
                Colaboração
              </h3>
              <p className="text-gray-300 font-extralight text-sm sm:text-base">
                Trabalhe conosco para adaptar o evento ao contexto e cultura da
                sua cidade.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="border-t-2 border-orange-400/30 pt-4"
            >
              <Users className="h-6 w-6 sm:h-8 sm:w-8 text-orange-400 mb-3 sm:mb-4" />
              <h3 className="text-lg sm:text-xl font-extralight orange-text mb-2 sm:mb-3">
                Comunidade
              </h3>
              <p className="text-gray-300 font-extralight text-sm sm:text-base">
                Crie conexões entre artistas locais e entusiastas da arte na sua
                região.
              </p>
            </motion.div>
          </div>

          <div className="mb-10 sm:mb-16">
            <h2 className="text-xl sm:text-2xl font-extralight mb-4 sm:mb-6 tracking-wide yellow-text">
              COMO FUNCIONA
            </h2>
            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-yellow-400/20 flex items-center justify-center mr-3 sm:mr-4 mt-1">
                  <span className="text-yellow-400 font-light text-sm sm:text-base">
                    1
                  </span>
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-extralight text-yellow-400 mb-1 sm:mb-2">
                    Entre em contato
                  </h3>
                  <p className="text-gray-300 font-extralight text-sm sm:text-base">
                    Envie-nos uma mensagem expressando seu interesse em trazer o
                    PINTA para sua cidade.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-emerald-400/20 flex items-center justify-center mr-3 sm:mr-4 mt-1">
                  <span className="text-emerald-400 font-light text-sm sm:text-base">
                    2
                  </span>
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-extralight text-emerald-400 mb-1 sm:mb-2">
                    Planejamento conjunto
                  </h3>
                  <p className="text-gray-300 font-extralight text-sm sm:text-base">
                    Trabalharemos juntos para adaptar o formato do evento às
                    características da sua cidade.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-orange-400/20 flex items-center justify-center mr-3 sm:mr-4 mt-1">
                  <span className="text-orange-400 font-light text-sm sm:text-base">
                    3
                  </span>
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-extralight text-orange-400 mb-1 sm:mb-2">
                    Suporte contínuo
                  </h3>
                  <p className="text-gray-300 font-extralight text-sm sm:text-base">
                    Oferecemos orientação e materiais para ajudar você a
                    organizar e promover o evento.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-yellow-400/20 flex items-center justify-center mr-3 sm:mr-4 mt-1">
                  <span className="text-yellow-400 font-light text-sm sm:text-base">
                    4
                  </span>
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-extralight text-yellow-400 mb-1 sm:mb-2">
                    Lançamento
                  </h3>
                  <p className="text-gray-300 font-extralight text-sm sm:text-base">
                    Ajudamos a divulgar e lançar o primeiro PINTA na sua cidade,
                    criando uma base sólida para eventos futuros.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-xl sm:text-2xl font-extralight mb-4 sm:mb-6 tracking-wide yellow-text">
              ENTRE EM CONTATO
            </h2>
            <p className="text-gray-300 font-extralight mb-6 sm:mb-8 max-w-lg mx-auto text-sm sm:text-base">
              Interessado em trazer o PINTA para sua cidade? Entre em contato
              conosco para conversarmos sobre as possibilidades.
            </p>
            <a
              href="mailto:expandir@pintapoa.com.br"
              className="inline-flex items-center bg-transparent hover:bg-emerald-400/10 text-emerald-400 border border-emerald-400/30 rounded-none px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-light tracking-widest"
            >
              <Mail className="mr-2 h-4 w-4 sm:h-5 sm:w-5" /> ENVIAR EMAIL
            </a>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
