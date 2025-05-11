"use client";

import { motion } from "framer-motion";
import { useMediaQuery } from "@/hooks/use-media-query";
import Header from "@/components/header";

export default function ReferenciasPage() {
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
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-4xl font-extralight tracking-wider text-yellow-400 mb-3 sm:mb-4">
              Referências Visuais
            </h2>
            <p className="text-gray-300 font-extralight max-w-lg mx-auto mb-6 sm:mb-8 text-sm sm:text-base">
              Nossa coleção de inspirações no Pinterest para estimular sua
              criatividade.
            </p>
          </div>

          <div className="text-center mt-8 mb-10 sm:mt-12">
            <a
              href="https://pin.it/3p4vnF9JG"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-transparent hover:bg-red-600/10 text-red-400 border border-red-600/30 rounded-none px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-light tracking-widest"
            >
              <img
                src="/icons/pinterest-icon.svg"
                alt="Pinterest"
                width={isMobile ? 20 : 24}
                height={isMobile ? 20 : 24}
                className="mr-2 hover:opacity-80 transition-opacity"
              />{" "}
              SEGUIR NO PINTEREST
            </a>
          </div>

          <div className="flex justify-center items-center w-full">
            <a
              data-pin-do="embedBoard"
              data-pin-board-width="1200"
              data-pin-scale-height="500"
              data-pin-scale-width="80"
              href="https://www.pinterest.com/pintapoa/1-refs/"
              aria-label="Painel do Pinterest com referências visuais"
            ></a>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
