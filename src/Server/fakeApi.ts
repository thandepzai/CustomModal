export interface StudentsForm {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
}

export type Student = Pick<
  StudentsForm,
  "name" | "email" | "phone" | "address"
>;

let listStudent: StudentsForm[] = [
  {
    id: "1",
    name: "Than",
    email: "cuthan2k1@gmail.com",
    phone: "0982479733",
    address: "HN",
  },
  {
    id: "2",
    name: "Than 2",
    email: "cuthan2k2@gmail.com",
    phone: "0982479733",
    address: "HN",
  },
  {
    id: "3",
    name: "Than 3",
    email: "cuthan2k3@gmail.com",
    phone: "0982479733",
    address: "HN",
  },
  {
    id: "4",
    name: "Than 4",
    email: "cuthan2k4@gmail.com",
    phone: "0982479733",
    address: "HN",
  },
  {
    id: "5",
    name: "Than 5",
    email: "cuthan2k5@gmail.com",
    phone: "0982479733",
    address: "HN",
  },
];

export const getListStudent = async () => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return listStudent;
};

export const getStudentById = async (id: string) => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return listStudent.filter((item) => item.id === id);
};

export const addStudent = async (data: Student) => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const { address, email, name, phone } = data;
  const randomNumber = Math.floor(Math.random() * (10000 - 1000 + 1)) + 1000;
  listStudent.push({ id: String(randomNumber), address, email, name, phone });
};

export type EditStudentProps = {
  id: string;
  data: Student;
};
export const editStudent = async (props: EditStudentProps) => {
  const { id, data } = props;
  await new Promise((resolve) => setTimeout(resolve, 500));
  const { address, email, name, phone } = data;
  listStudent.forEach((item) => {
    if (item.id === id) {
      item.address = address;
      item.email = email;
      item.name = name;
      item.phone = phone;
    }
  });
};

export const deleteStudent = async (id: String) => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  listStudent = listStudent.filter((item) => item.id !== id);
};
