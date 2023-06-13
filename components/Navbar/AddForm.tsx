import Modal from "../Modal";
import clsx from "clsx";
import { Button } from "../Button";
import { Input } from "../Input";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { useRouter } from "next/router";

const AddForm = ({ open, onOpenChange, onSubmit, formType }: any) => {
  const router = useRouter();

  // Define los valores iniciales y el esquema de validación según el tipo de formulario
  const initialValues =
    formType === "count"
      ? { title: "", description: "", participant: "" }
      : { title: "", amount: "", created_at: "", paid_by: "" };

  const validationSchema =
    formType === "count"
      ? Yup.object({
          title: Yup.string().required("Title is required"),
          description: Yup.string().required("Description is required"),
          participant: Yup.string().required("Participant is required"),
        })
      : Yup.object({
          title: Yup.string().required("Title is required"),
          amount: Yup.number().required("Amount is required"),
          created_at: Yup.date(),
          paid_by: Yup.string().required("Paid by is required"),
        });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      onSubmit(values);
      formik.resetForm();
    },
  });

  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <Modal.Portal>
        <Modal.Overlay />
        <Modal.Content>
          <form onSubmit={formik.handleSubmit}>
            <Modal.Title className={clsx("font-base", "text-lg")}>
              Add new {formType === "count" ? "Count" : "Detail"}
            </Modal.Title>
            <div className={clsx("flex", "flex-col", "gap-2", "my-5")}>
              <Input
                type="text"
                label="Title"
                name="title"
                value={formik.values.title}
                onChange={formik.handleChange}
                error={
                  formik.touched.title && formik.errors.title
                    ? formik.errors.title
                    : ""
                }
              />
              {formType === "count" && (
                <>
                  <Input
                    type="text"
                    label="Description"
                    name="description"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.description && formik.errors.description
                        ? formik.errors.description
                        : ""
                    }
                  />
                  <Input
                    type="text"
                    label="Participant"
                    name="participant"
                    value={formik.values.participant}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.participant && formik.errors.participant
                        ? formik.errors.participant
                        : ""
                    }
                  />
                </>
              )}
              {formType === "detail" && (
                <>
                  <Input
                    type="number"
                    label="Amount"
                    name="amount"
                    value={formik.values.amount}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.amount && formik.errors.amount
                        ? formik.errors.amount
                        : ""
                    }
                  />
                  <Input
                    type="date"
                    label="Created At"
                    name="created_at"
                    value={formik.values.created_at}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.created_at && formik.errors.created_at
                        ? formik.errors.created_at
                        : ""
                    }
                  />
                  <Input
                    type="text"
                    label="Paid By"
                    name="paid_by"
                    value={formik.values.paid_by}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.paid_by && formik.errors.paid_by
                        ? formik.errors.paid_by
                        : ""
                    }
                  />
                </>
              )}
            </div>
            <Modal.Close asChild>
              <Button text="Submit" variant="filled" w={"w-full"} />
            </Modal.Close>
          </form>
        </Modal.Content>
      </Modal.Portal>
    </Modal>
  );
};

export default AddForm;
