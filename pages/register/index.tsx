import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import { useState } from "react";
import { ShowNotification } from "@/components/ShowNotification";
import { Alert } from "@/types/types";
import AnimateComponent from "@/components/AnimateComponent/AnimateComponent";

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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [alert, setAlert] = useState<Alert | null>(null);

  const onSubmit = async (values: {
    password: string;
    email: string;
    name?: string;
  }) => {
    setIsLoading(true);
    try {
      const response = await axios.post("/api/auth/register", { user: values });
      if (response.data) {
        router.push("/login");
        setIsLoading(false);
      }
    } catch (error) {
      setAlert({
        type: "error",
        msg: `something went wrong, Please try again later.`,
      });
      setIsLoading(false);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <AnimateComponent>
      <form onSubmit={formik.handleSubmit} className="">
        <section className="h-screen  flex justify-center items-center">
          <div className="w-full p-10 md:w-2/4  lg:w-1/4 md:mx-auto mx-5 flex flex-col  gap-5 bg-white border border-gray-200 rounded-lg shadow">
            <h2 className="text-2xl	text-gray-900">Register</h2>
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
            <Button
              loading={isLoading}
              w="w-full"
              text="Submit"
              variant="filled"
              margin={"my-2"}
            />
            <p className="text-sm  text-gray-500">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-blue-600 hover:underline dark:text-blue-500"
              >
                Login here
              </Link>
            </p>
          </div>
          {alert && (
            <ShowNotification
              type={alert?.type}
              msg={alert?.msg}
              setAlert={setAlert}
            />
          )}
        </section>
      </form>
    </AnimateComponent>
  );
};

export default Register;
