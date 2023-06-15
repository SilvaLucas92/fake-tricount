import Modal from "../Modal";
import clsx from "clsx";
import { Button } from "../Button";
import { Input } from "../Input";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import Select from "../Select";
import { Dispatch, SetStateAction, useEffect } from "react";
import { CountItem, selectOptions } from "@/types/types";

interface formProps {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  onSubmit: any;
  formType?: string;
  participants?: selectOptions[];
  data?: CountItem | null | undefined;
  setData?: Dispatch<SetStateAction<CountItem | null | undefined>>;
}

const AddForm = ({
  open,
  onOpenChange,
  onSubmit,
  formType,
  participants,
  data,
  setData,
}: formProps) => {
  const initialValues =
    formType === "count"
      ? { title: "", description: "", participant: "" }
      : {
          title: data?.title || "",
          amount: data?.amount || "",
          created_at: data?.created_at || "",
          paid_by: data?.paid_by || "",
        };

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
          paid_by: Yup.string().required("Paid by is required"),
        });

  useEffect(() => {
    if (data) {
      formik.setValues({
        title: data?.title,
        amount: data?.amount,
        created_at: data?.created_at || "",
        paid_by: data?.paid_by,
      });
    }
  }, [data]);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (data && setData) {
        onSubmit(data._id, values);
        setData(null);
      } else {
        onSubmit(values);
      }
      onOpenChange(false);
      formik.resetForm();
    },
  });

  return (
    <Modal
      open={open}
      onOpenChange={() => {
        data && setData && setData(null);
        onOpenChange(false);
        formik.resetForm();
      }}
    >
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
                  <Select
                    label="Paid by"
                    data={participants ?? []}
                    onChange={(value) => formik.setFieldValue("paid_by", value)}
                    name="paid_by"
                    value={formik.values.paid_by}
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
