import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { signIn } from "next-auth/react";
import { RouteMatcher } from "next/dist/server/future/route-matchers/route-matcher";
import { useRouter } from "next/router";

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
    if (values) {
      const loginRes = await signIn("credentials", {
        email: values.email,
        password: values.password,
      });
      if (loginRes && !loginRes.ok) {
        console.log("errr");
      } else {
        router.push("/");
      }
    }
    return;
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="w-2/4 mx-auto">
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

export default Login;
