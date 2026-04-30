"use client";

import { motion } from "framer-motion";
import { ExternalLink, MapPin } from "lucide-react";
import { bookingUrl } from "@/lib/links";

const mapUrl = "https://maps.app.goo.gl/JD2zS8veY2coknRk6";
const mapEmbedUrl =
  "https://www.google.com/maps?q=9.787637,126.161441&z=16&output=embed";

const Stay = () => {
  return (
    <section
      id="stay"
      className="flex min-h-screen items-center justify-center px-6 py-20 md:px-8"
    >
      <div className="w-full max-w-5xl space-y-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="mb-8 text-5xl tracking-tight md:text-7xl mt-28">
            Stay With Us
          </h2>
          <div className="mx-auto mb-8 h-px w-24 bg-black" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mx-auto max-w-2xl text-xl font-light leading-relaxed text-gray-600 md:text-2xl"
        >
          Become part of our family. Experience authentic Siargao living in
          comfort and tranquility.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="pt-4"
        >
          <motion.a
            href={bookingUrl}
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex bg-black px-12 py-4 text-sm tracking-[0.2em] text-white hover:cursor-pointer"
          >
            MAKE A RESERVATION
          </motion.a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="space-y-1 pt-8 text-sm font-light text-gray-500"
        >
          <p>Dapa - General Luna Road</p>
          <p>8419 General Luna, Siargao</p>
          <p>Philippines</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mx-auto max-w-4xl"
        >
          <div className="overflow-hidden border border-black/10 bg-white">
            <iframe
              src={mapEmbedUrl}
              title="Camanolo Homestay on Google Maps"
              className="h-80 w-full md:h-105"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <a
            href={mapUrl}
            target="_blank"
            rel="noreferrer"
            className="mx-auto mt-5 inline-flex items-center gap-2 border border-black px-6 py-3 text-xs tracking-[0.2em] text-black transition-colors hover:bg-black hover:text-white"
          >
            <MapPin className="h-4 w-4" aria-hidden="true" />
            OPEN MAP
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </motion.div>


        <div className="flex lg:flex-row flex-col gap-10 lg:gap-12 justify-center pt-8">
          <div>
            <h1 className="list-none">
              Pets & Children
            </h1>
            <p className="mt-4 font-light text-gray-600">
              Pets welcome at no charge.
              <br />
              Children of all ages welcome.
            </p>
          </div>

          <div>
            <h1 className="list-none">
              Check-in / Check-out
            </h1>
            <p className="mt-4 font-light text-gray-600">
              Check-in: 2:00 PM - 7:30 PM
              <br />
              Check-out: 6:00 AM - 11:00 AM
            </p>
          </div>

          <div>
            <h1 className="list-none">
              Policies
            </h1>
            <p className="mt-4 font-light text-gray-600">
              No smoking on premises.
              <br />
              No parties or events.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stay;
