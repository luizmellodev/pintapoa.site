"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, Calendar, Clock, ArrowLeft, Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getAllLocations } from "@/lib/data";
import type { EventLocation } from "@/lib/types";

export default function HistoryPage() {
  const [locations, setLocations] = useState<EventLocation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        setLoading(true);
        const allLocations = await getAllLocations();
        setLocations(allLocations);
      } catch (error) {
        console.error("Failed to fetch locations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
  };

  return (
    <main className="flex min-h-screen flex-col p-4 md:p-8 gradient-bg">
      <div className="w-full max-w-md mx-auto">
        <motion.div
          className="flex items-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link href="/">
            <Button
              variant="ghost"
              size="icon"
              className="mr-3 hover:bg-pink-500/20 text-white"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold gradient-text glow-text">
            Past Locations
          </h1>
        </motion.div>

        {loading ? (
          <motion.div
            className="flex justify-center items-center h-60 glass rounded-2xl p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="relative">
              <div className="w-12 h-12 rounded-full border-4 border-pink-500/30 border-t-pink-500 animate-spin"></div>
              <Sparkles className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-pink-500 h-6 w-6" />
            </div>
          </motion.div>
        ) : locations.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass p-8 rounded-2xl text-center"
          >
            <p className="text-gray-300">No past locations found.</p>
          </motion.div>
        ) : (
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-6"
          >
            {locations.map((location, index) => (
              <motion.div
                key={location.id}
                variants={item}
                className="glass rounded-2xl overflow-hidden card-hover"
                whileHover={{ y: -5 }}
              >
                <div className="relative h-48">
                  <img
                    src={
                      location.imageUrl ||
                      `/placeholder.svg?height=160&width=400`
                    }
                    alt={location.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
                    <div className="p-4 text-white">
                      <h3 className="text-xl font-bold gradient-text glow-text">
                        {location.name}
                      </h3>
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-start mb-3">
                    <MapPin className="h-5 w-5 text-pink-500 mr-3 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-200">{location.address}</p>
                  </div>
                  <div className="flex items-start mb-3">
                    <Calendar className="h-5 w-5 text-pink-500 mr-3 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-200">
                      {new Date(location.date).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="flex items-start">
                    <Clock className="h-5 w-5 text-pink-500 mr-3 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-200">{location.time}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </main>
  );
}
