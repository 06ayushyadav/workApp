import { motion } from "framer-motion";

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-fit w-fit p-4 rounded-xl bg-gray-800 ">
      <motion.div
        className="flex space-x-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }}
      >
        <motion.span
          className="w-5 h-5 bg-blue-600 rounded-full"
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 0.6, ease: "easeInOut", delay: 0 }}
        />
        <motion.span
          className="w-5 h-5 bg-green-600 rounded-full"
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 0.6, ease: "easeInOut", delay: 0.2 }}
        />
        <motion.span
          className="w-5 h-5 bg-yellow-600 rounded-full"
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 0.6, ease: "easeInOut", delay: 0.4 }}
        />
      </motion.div>
    </div>
  );
};

export default Loader;
