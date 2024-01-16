import { motion } from "framer-motion";
import { FormModalProps } from "interface/modal";
import { ChangeEvent } from "react";

export default function FormModal(props: FormModalProps) {
  const { listFormInput, actionModal, setListFormInput, buttonNameModal } =
    props;

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>, key: string) => {
    setListFormInput((prev) =>
      prev.map((value) => {
        if (value.key === key) {
          value.value = e.target.value;
        }
        return value;
      })
    );
  };

  return (
    <div>
      {listFormInput !== undefined &&
        listFormInput.map((item) => (
          <div key={item.key}>
            <input
              type={item.type}
              className="focus:outline-none border-b w-full pb-2 border-sky-400 placeholder-gray-500 mb-9 text-lg"
              placeholder={item.placeholder}
              value={item.value}
              onChange={(e) => handleChangeInput(e, item.key)}
            />
          </div>
        ))}

      <div className="flex justify-center my-6">
        <motion.button
          className=" rounded-full  p-3 w-full sm:w-56   bg-gradient-to-r from-sky-600  to-teal-300 text-white text-lg font-semibold "
          initial={{ opacity: 0.9 }}
          whileHover={{ scale: 1.05, opacity: 1 }}
          whileTap={{ scale: 1 }}
          transition={{ duration: 0.2 }}
          onClick={actionModal}
        >
          {buttonNameModal}
        </motion.button>
      </div>
    </div>
  );
}
