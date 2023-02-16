import { motion } from "framer-motion";
import React from "react";

const Percentages = () => {
  return (
    <motion.div
      key="percentages"
      className="w-full h-full flex flex-col gap-6 items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h1 className="text-2xl text-white">
        W trakcie przygotowania, zajrzyj ponownie później 👷🏻
      </h1>
      <iframe
        width="560"
        height="315"
        src="https://www.youtube-nocookie.com/embed/wZga0-YE9cQ"
        title="YouTube video player"
        className="border border-white"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    </motion.div>
  );
};

export default Percentages;
