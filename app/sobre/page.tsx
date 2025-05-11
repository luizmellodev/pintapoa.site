"use client";

import { motion } from "framer-motion";
import { Users, Palette, MapPin, Calendar } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-media-query";
import Header from "@/components/header";

export default function SobrePage() {
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
              Experiências criativas para
            </h2>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extralight tracking-wider text-emerald-400 mb-6 sm:mb-8">
              + artistas em ascensão!
            </h2>
            <a
              href="https://instagram.com/pintapoa"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-transparent hover:bg-pink-600/10 text-pink-400 border border-pink-600/30 rounded-none px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-light tracking-widest"
            >
              <img
                src="/icons/instagram-icon.svg"
                alt="Instagram"
                width={isMobile ? 20 : 24}
                height={isMobile ? 20 : 24}
                className="mr-2 hover:opacity-80 transition-opacity"
              />{" "}
              SIGA-NOS NO INSTAGRAM
            </a>
          </div>

          <h2 className="text-xl sm:text-2xl font-extralight mb-4 sm:mb-6 tracking-wide yellow-text">
            O QUE É O PINTA?
          </h2>

          <p className="text-gray-300 font-extralight text-sm sm:text-base mb-8 leading-relaxed">
            O PINTA é um evento que une pessoas e bares através da arte. Somos
            movidos pela curiosidade do novo, da experiência marcante e do
            ambiente aconchegante. Organizamos encontros para levar mais leveza,
            arte e conexão para o cotidiano!
          </p>
          <p className="text-gray-300 font-extralight text-sm sm:text-base mb-12 leading-relaxed">
            Nosso compromisso é proporcionar experiências únicas e inesquecíveis
            por meio da arte, como meio de fugir da rotina.
          </p>
          <p className="text-gray-300 font-extralight text-sm sm:text-base mb-8 leading-relaxed">
            O evento é voltado para todos os níveis de habilidade, desde
            iniciantes até artistas experientes. Não é necessário ter
            experiência prévia em pintura ou arte, apenas a vontade de se
            divertir e explorar sua criatividade.
          </p>
          <p className="text-gray-300 font-extralight text-sm sm:text-base mb-12 leading-relaxed">
            O PINTA é uma oportunidade perfeita para relaxar, socializar e
            descobrir novos talentos artísticos. Venha se juntar a nós e
            experimentar a magia da arte em um ambiente acolhedor e inspirador!
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mb-10 sm:mb-16">
            <motion.div
              whileHover={{ y: -5 }}
              className="border-t-2 border-yellow-400/30 pt-4"
            >
              <Users className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-400 mb-3 sm:mb-4" />
              <h3 className="text-lg sm:text-xl font-extralight yellow-text mb-2 sm:mb-3">
                Comunidade
              </h3>
              <p className="text-gray-300 font-extralight text-sm sm:text-base">
                Conectamos artistas, entusiastas e curiosos em um ambiente
                acolhedor e inspirador.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="border-t-2 border-emerald-400/30 pt-4"
            >
              <Palette className="h-6 w-6 sm:h-8 sm:w-8 text-emerald-400 mb-3 sm:mb-4" />
              <h3 className="text-lg sm:text-xl font-extralight green-text mb-2 sm:mb-3">
                Criatividade
              </h3>
              <p className="text-gray-300 font-extralight text-sm sm:text-base">
                Estimulamos a expressão artística em um formato descontraído,
                acompanhado de boa comida.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="border-t-2 border-orange-400/30 pt-4"
            >
              <MapPin className="h-6 w-6 sm:h-8 sm:w-8 text-orange-400 mb-3 sm:mb-4" />
              <h3 className="text-lg sm:text-xl font-extralight orange-text mb-2 sm:mb-3">
                Descoberta
              </h3>
              <p className="text-gray-300 font-extralight text-sm sm:text-base">
                Cada evento acontece em um local diferente de Porto Alegre,
                promovendo a exploração da cidade.
              </p>
            </motion.div>
          </div>

          <div className="mb-10 sm:mb-16">
            <h2 className="text-xl sm:text-2xl font-extralight mb-4 sm:mb-6 tracking-wide yellow-text">
              COMO FUNCIONA
            </h2>
            <div className="space-y-4 sm:space-y-8">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-yellow-400/20 flex items-center justify-center mr-3 sm:mr-4 mt-1">
                  <span className="text-yellow-400 font-light text-sm sm:text-base">
                    1
                  </span>
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-extralight text-yellow-400 mb-1 sm:mb-2">
                    Revelação do local
                  </h3>
                  <p className="text-gray-300 font-extralight text-sm sm:text-base">
                    Alguns dias antes do evento, revelamos o local onde
                    acontecerá o próximo PINTA POA.
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
                    Compra de ingressos
                  </h3>
                  <p className="text-gray-300 font-extralight text-sm sm:text-base">
                    Os ingressos são vendidos exclusivamente pelo nosso
                    Instagram. É só nos mandar um Oi!
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-pink-400/20 flex items-center justify-center mr-3 sm:mr-4 mt-1">
                  <span className="text-pink-400 font-light text-sm sm:text-base">
                    2
                  </span>
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-extralight text-pink-400 mb-1 sm:mb-2">
                    Equipamentos
                  </h3>
                  <p className="text-gray-300 font-extralight text-sm sm:text-base">
                    O ingresso inclui tela + um VALE CEVA para brindar a
                    experiência!
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-orange-400/20 flex items-center justify-center mr-3 sm:mr-4 mt-1">
                  <span className="text-orange-400 font-light text-sm sm:text-base">
                    4
                  </span>
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-extralight text-orange-400 mb-1 sm:mb-2">
                    Experiência completa
                  </h3>
                  <p className="text-gray-300 font-extralight text-sm sm:text-base">
                    Te aguardamos no dia e local do evento com todos os
                    materiais. É só chegar e curtir!
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-xl sm:text-2xl font-extralight mb-4 sm:mb-6 tracking-wide yellow-text">
              PRÓXIMO EVENTO
            </h2>
            <div className="inline-flex flex-col sm:flex-row items-center sm:space-x-6 mb-6 sm:mb-8 space-y-3 sm:space-y-0">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-400 mr-2" />
                <span className="text-gray-300 font-extralight text-sm sm:text-base">
                  15 de Maio, 2025
                </span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-orange-400 mr-2" />
                <span className="text-gray-300 font-extralight text-sm sm:text-base">
                  Porto Alegre
                </span>
              </div>
            </div>
            <a
              href="https://instagram.com/pintapoa"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center ml-10 bg-transparent hover:bg-pink-600/10 text-pink-400 border border-pink-600/30 rounded-none px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-light tracking-widest"
            >
              <img
                src="/icons/instagram-icon.svg"
                alt="Instagram"
                width={isMobile ? 20 : 24}
                height={isMobile ? 20 : 24}
                className="mr-2 hover:opacity-80 transition-opacity"
              />{" "}
              GARANTA SUA VAGA
            </a>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
