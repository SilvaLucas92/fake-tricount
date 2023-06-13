import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";

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

const Register = () => {
  const router = useRouter();
  const onSubmit = async (values: {
    password: string;
    email: string;
    name?: string;
  }) => {
    try {
      const response = await axios.post("/api/auth/register", { user: values });
      if (response.data) {
        router.push("/login");
        return response.data;
      }
    } catch (error) {
      console.error("An error occurred:", error);
      throw error;
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit} className="">
      <section className="h-screen  flex justify-center items-center bg-gray-50">
        {" "}
        <div className="w-full p-10 md:w-2/4 mx-auto flex flex-col  gap-5 bg-white rounded-lg shadow">
          <h2 className="text-2xl">Register</h2>
          <Input
            type="text"
            name="name"
            label="Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={
              formik.touched.name && formik.errors.name
                ? formik.errors.name
                : ""
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
          <Button w="w-full" text="Submit" variant="filled" margin={"my-2"} />
          <p className="text-sm  text-gray-500">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-primary-600 hover:underline"
            >
              Login here
            </Link>
          </p>
        </div>
      </section>
    </form>
  );
};

export default Register;
