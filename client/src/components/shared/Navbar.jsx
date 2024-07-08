import React from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const Navbar = () => {
  const location = useLocation();
  const pathname = location.pathname;

  // Converting pathname to title
  const dynamicTitle = pathname
    .substring(1)
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <motion.div
      className="p-4 bg-[#a55eea] sticky top-2 w-full h-32 shadow-xl rounded-3xl rounded-t"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative h-full">
        <motion.div
          initial={{ y: -30 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-xl md:text-3xl text-white text-center  md:font-bold">
            SHAH ACADEMY
          </h1>
          <motion.div
            className=" absolute bottom-10  left-1/2 transform -translate-x-1/2"
            initial={{ y: 0, x: 0 }}
            animate={{
              y: dynamicTitle ? "100%" : "10%",
              x: dynamicTitle ? "-30%" : "",
            }}
            transition={{ duration: 0.5 }}
          >
            <p className="font-bold md:text-2xl">{dynamicTitle}</p>
          </motion.div>
        </motion.div>
        <motion.div
          className="absolute -bottom-14 md:-bottom-20 left-1/2 transform -translate-x-1/2"
          initial={{ x: "-50%" }}
          animate={{ x: dynamicTitle ? "-150%" : "-50%" }}
          transition={{ duration: 0.5 }}
        >
          <div
            className="h-28 md:h-32 w-28 md:w-32 border-[5px] shadow-xl border-white bg-red-500 rounded-full bg-center bg-cover"
            style={{
              backgroundImage: `url("https://cdn-icons-png.flaticon.com/512/146/146031.png")`,
            }}
          ></div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Navbar;
