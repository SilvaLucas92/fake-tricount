import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";

const initialValues: { password: string; email: string } = {
  password: "",
  email: "",
};

const validationSchema = Yup.object({
  password: Yup.string().required("Password is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

const Login = () => {
  const router = useRouter();
  const onSubmit = async (values: {
    password: string;
    email: string;
    name?: string;
  }) => {
    try {
      const loginRes = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
      });
      if (loginRes && !loginRes.ok) {
        console.log(loginRes.error || "asas");
      } else {
        router.push("/");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <section className="h-screen flex justify-center items-center bg-gray-50">
        {" "}
        <div className="w-full p-10 md:w-2/4 mx-auto flex flex-col  gap-5 bg-white rounded-lg shadow">
          <h2 className="text-2xl	">Welcome Back, Sign in to your account!</h2>
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
          <Button text="Submit" variant="filled" w="w-full" margin={"mt-2"} />
          <p className="text-sm  text-gray-500">
            Don’t have an account yet?{" "}
            <Link
              href="/register"
              className="font-medium text-primary-600 hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </section>
    </form>
  );
};

export default Login;
