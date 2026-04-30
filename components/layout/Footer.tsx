"use client";

import { motion } from "framer-motion";
import LoadingImage from "@/components/shared/LoadingImage";

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 px-8 py-12">
      <div className="mx-auto max-w-7xl text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <LoadingImage
            src="/logo.png"
            alt="Camanolo"
            width={160}
            height={60}
            wrapperClassName="mx-auto mb-6 h-16 w-fit bg-transparent"
            className="h-16 w-auto"
          />
        </motion.div>

        <p className="text-sm font-light text-gray-500">
          © 2026 Camanolo Homestay
        </p>
      </div>
    </footer>
  );
};

export default Footer;
