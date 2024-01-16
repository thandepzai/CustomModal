import { motion } from "framer-motion";
import { ChooseModalProps } from "interface/modal";

export default function ChooseModal(props: ChooseModalProps) {
  const { actionFirst, actionSecond, nameActionFirst, nameActionSecond } =
    props;
  return (
    <div className="flex my-6 justify-between">
      <motion.button
        className=" rounded-full p-3 w-full sm:w-56 lg:w-64 bg-gradient-to-r from-gray-600 to-gray-200 text-white text-lg font-semibold "
        initial={{ opacity: 0.9 }}
        whileHover={{ scale: 1.05, opacity: 1 }}
        whileTap={{ scale: 1 }}
        transition={{ duration: 0.2 }}
        onClick={actionFirst}
      >
        {nameActionFirst}
      </motion.button>
      <motion.button
        className=" rounded-full p-3 w-full sm:w-56 lg:w-64 bg-gradient-to-r from-sky-600 to-teal-300 text-white text-lg font-semibold "
        initial={{ opacity: 0.9 }}
        whileHover={{ scale: 1.05, opacity: 1 }}
        whileTap={{ scale: 1 }}
        transition={{ duration: 0.2 }}
        onClick={actionSecond}
      >
        {nameActionSecond}
      </motion.button>
    </div>
  );
}
