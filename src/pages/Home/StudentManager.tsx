import { Fragment, useRef, useState } from "react";
import ModalRef from "components/modalRef";
import { FormInputModal } from "interface/modal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  EditStudentProps,
  Student,
  addStudent,
  deleteStudent,
  editStudent,
  getListStudent,
} from "../../Server/fakeApi";
import { motion } from "framer-motion";
import { RefForModal } from "components/modalRef/ModalRef";
import Modal from "components/modal";

const initialFormModal: FormInputModal[] = [
  { key: "name", placeholder: "Họ và tên", type: "text", value: "" },
  { key: "email", placeholder: "Email", type: "email", value: "" },
  { key: "phone", placeholder: "Số điện thoại", type: "text", value: "" },
  { key: "address", placeholder: "Địa chỉ", type: "text", value: "" },
];
export default function StudentManager() {
  const [openModalChoose, setOpenModalChoose] = useState(false);
  const [openModalForm, setOpenModalForm] = useState(false);
  const [listFormInput, setListFormInput] = useState(initialFormModal);
  const [isModalAdd, setIsModalAdd] = useState(true);
  const [idChoose, setIdChoose] = useState("");
  const queryClient = useQueryClient();

  const studentQuery = useQuery({
    queryKey: ["student"],
    queryFn: getListStudent,
    gcTime: Infinity,
  });

  const addStudentMutation = useMutation({
    mutationKey: ["addStudent"],
    mutationFn: (data: Student) => addStudent(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["student"] });
      setListFormInput(initialFormModal);
    },
  });

  const editStudentMutation = useMutation({
    mutationKey: ["editStudent"],
    mutationFn: (data: EditStudentProps) => editStudent(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["student"] });
    },
  });

  const deleteStudentMutation = useMutation({
    mutationKey: ["deleteStudent"],
    mutationFn: (_) => deleteStudent(idChoose),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["student"] });
    },
  });

  const handleChangeOpenModalChoose = () =>
    setOpenModalChoose(!openModalChoose);

  const handleChangeOpenModalForm = () => {
    if (openModalForm) {
      setListFormInput(initialFormModal);
    }
    setOpenModalForm(!openModalForm);
  };

  const handleOpenModalAdd = () => {
    setIsModalAdd(true);
    handleChangeOpenModalForm();
  };

  const handleOpenModalDelete = (id: string) => {
    setIdChoose(id);
    handleChangeOpenModalChoose();
  };

  const handleOpenModalEdit = (id: string) => {
    setIsModalAdd(false);
    setIdChoose(id);

    if (studentQuery.data) {
      const student = studentQuery.data.filter((item) => item.id === id)[0];
      const studentForm: FormInputModal[] = Object.entries(student).map(
        ([key, value]) => {
          return {
            key: key,
            placeholder: key.charAt(0).toUpperCase() + key.slice(1),
            type: typeof value === "number" ? "number" : "text",
            value: value.toString(),
          };
        }
      );
      setListFormInput(studentForm.filter((item) => item.key !== "id"));
    }

    handleChangeOpenModalForm();
  };

  const handleAddStudent = () => {
    const newStudent: any = {};
    listFormInput.forEach((item) => {
      newStudent[item.key] = item.value;
    });
    addStudentMutation.mutate(newStudent);
    handleChangeOpenModalForm();
  };

  const handleEditStudent = () => {
    const newStudent: any = {};
    listFormInput.forEach((item) => {
      newStudent[item.key] = item.value;
    });
    editStudentMutation.mutate({ id: idChoose, data: newStudent });
    handleChangeOpenModalForm();
  };

  const handleDeleteStudent = () => {
    deleteStudentMutation.mutate(undefined);
    handleChangeOpenModalChoose();
  };

  const funcInputRef = useRef<RefForModal>({
    handleAnimate: () => {},
  });
  const handleClick = () => {
    funcInputRef.current.handleAnimate();
  };

  return (
    <div>
      <h1 className="text-lg font-bold mb-5">Students Manager</h1>
      <div>
        <motion.button
          className=" rounded-2xl  p-3 w-full sm:w-56   bg-gradient-to-r from-sky-600  to-teal-300 text-white text-lg font-semibold "
          initial={{ opacity: 0.9 }}
          whileHover={{ scale: 1.05, opacity: 1 }}
          whileTap={{ scale: 1 }}
          transition={{ duration: 0.2 }}
          onClick={handleClick}
        >
          Add student Ref
        </motion.button>
        <motion.button
          className="ml-2 rounded-2xl  p-3 w-full sm:w-56   bg-gradient-to-r from-sky-600  to-teal-300 text-white text-lg font-semibold "
          initial={{ opacity: 0.9 }}
          whileHover={{ scale: 1.05, opacity: 1 }}
          whileTap={{ scale: 1 }}
          transition={{ duration: 0.2 }}
          onClick={handleOpenModalAdd}
        >
          Add student isOpen
        </motion.button>
      </div>
      {studentQuery.isLoading && (
        <div role="status" className="mt-6 animate-pulse">
          <div className="mb-4 h-4  rounded bg-gray-200 dark:bg-gray-700" />
          <div className="mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700" />
          <div className="mb-2.5 h-10 rounded bg-gray-200 dark:bg-gray-700" />
          <div className="mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700" />
          <div className="mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700" />
          <div className="mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700" />
          <div className="mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700" />
          <div className="mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700" />
          <div className="mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700" />
          <div className="mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700" />
          <div className="mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700" />
          <div className="mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700" />
          <div className="h-10  rounded bg-gray-200 dark:bg-gray-700" />
          <span className="sr-only">Loading...</span>
        </div>
      )}
      {!studentQuery.isLoading && (
        <Fragment>
          <div className="relative mt-6 overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
              <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="py-3 px-6">
                    #
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Name
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Email
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Phone
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Address
                  </th>
                  <th scope="col" className="py-3 px-6 text-center">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {studentQuery.data?.map((student) => (
                  <tr
                    className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
                    key={student.id}
                  >
                    <td className="py-4 px-6">{student.id}</td>
                    <th
                      scope="row"
                      className="whitespace-nowrap py-4 px-6 font-medium text-gray-900 dark:text-white"
                    >
                      {student.name}
                    </th>
                    <td className="py-4 px-6">{student.email}</td>
                    <td className="py-4 px-6">{student.phone}</td>
                    <td className="py-4 px-6">{student.address}</td>
                    <td className="py-4 px-6 text-center">
                      <button
                        className="mr-5 font-medium text-blue-600 hover:underline dark:text-blue-500"
                        onClick={() => handleOpenModalEdit(student.id)}
                      >
                        Edit
                      </button>
                      <button
                        className="font-medium text-red-600 dark:text-red-500"
                        onClick={() => handleOpenModalDelete(student.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}

                {addStudentMutation.isPending && (
                  <tr
                    className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600 opacity-50"
                    key="title"
                  >
                    <td className="py-4 px-6"></td>
                    <th
                      scope="row"
                      className="whitespace-nowrap py-4 px-6 font-medium text-gray-900 dark:text-white"
                    >
                      {addStudentMutation.variables.name}
                    </th>
                    <td className="py-4 px-6">
                      {addStudentMutation.variables.email}
                    </td>
                    <td className="py-4 px-6">
                      {addStudentMutation.variables.phone}
                    </td>
                    <td className="py-4 px-6">
                      {addStudentMutation.variables.address}
                    </td>
                    <td className="py-4 px-6 text-center">
                      <button className="mr-5 font-medium text-blue-600 hover:underline dark:text-blue-500">
                        Edit
                      </button>
                      <button className="font-medium text-red-600 dark:text-red-500">
                        Delete
                      </button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Fragment>
      )}
      <ModalRef
        onBackdropPress={handleChangeOpenModalForm}
        closeDuration={500}
        backdropColor="rgb(192,192,192,0.3)"
        ref={funcInputRef}
        openDuration={3000}
      >
        23123
      </ModalRef>
      <Modal
        isOpen={openModalForm}
        changeOpen={handleChangeOpenModalForm}
        onBackdropPress={handleChangeOpenModalForm}
        closeDuration={500}
        backdropColor="rgb(192,192,192,0.3)"
      >
        23123
      </Modal>
    </div>
  );
}
