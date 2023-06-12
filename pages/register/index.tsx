import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import axios from "axios";

const Register = () => {
  const initialValues: { password: string; email: string; name?: string } = {
    password: "",
    email: "",
    name: "",
  };

  const validationSchema = Yup.object({
    password: Yup.string().required("Password is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    name: Yup.string().required("Name is required"),
  });

  const onSubmit = async (values: {
    password: string;
    email: string;
    name?: string;
  }) => {
    const data = await axios
      .post("/api/auth/register", { user: values })
      .then((res) => console.log(res))
      .catch((er) => console.log(er));
    return data;
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="w-2/4 mx-auto my-20">
        <h2>register</h2>
        <Input
          type="text"
          name="name"
          label="Name"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={
            formik.touched.name && formik.errors.name ? formik.errors.name : ""
          }
        />
        <Input
          type="text"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={
            formik.touched.email && formik.errors.email
              ? formik.errors.email
              : ""
          }
        />
        <Input
          type="password"
          name="password"
          label="Password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={
            formik.touched.password && formik.errors.password
              ? formik.errors.password
              : ""
          }
        />
        <Button text="Submit" variant="filled" />
      </div>
    </form>
  );
};

export default Register;
