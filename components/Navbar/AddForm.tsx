import Modal from "../Modal";
import clsx from "clsx";
import { Button } from "../Button";
import { Input } from "../Input";
import * as Yup from "yup";
import { useFormik } from "formik";
import Select from "../Select";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { CountItem, selectOptions } from "@/types/types";
import { useSession, getSession } from "next-auth/react";

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
  const [values, setValues] = useState<Record<string, string> | null>(null);

  const initialValues =
    formType === "count"
      ? { title: "", description: "", participants: {}, participants_qty: 0 }
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
          participants_qty: Yup.number().required(
            "Number Of participants is required"
          ),
          // ...validation,
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
        setValues(null);
      }
      onOpenChange(false);
      formik.resetForm();
    },
  });

  const setParticipants = (quantity: number) => {
    const newArray = new Array(quantity).fill("");

    const participants = {};
    const validations = {};
    const arrayParticipants: string[] = [];

    for (let i = 0; i < newArray.length; i++) {
      const name = `member${i}`;
      const key = name;
      arrayParticipants.push(name);
      (participants as any)[key] = "";
      (validations as any)[key] = Yup.string().required(`${name} is required`);
    }
    setValues(participants);
    formik.setValues((prev: any) => ({ ...prev, participants }));
  };

  useEffect(() => {
    if (formik.values.participants_qty && formik.values.participants_qty > 0) {
      setParticipants(formik?.values?.participants_qty);
    }
  }, [formik.values.participants_qty]);

  return (
    <Modal
      open={open}
      onOpenChange={() => {
        data && setData && setData(null);
        onOpenChange(false);
        formik.resetForm();
        setValues(null);
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
                    type="number"
                    label="Amount of members"
                    name="participants_qty"
                    value={formik.values.participants_qty}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.participants_qty &&
                      formik.errors.participants_qty
                        ? formik.errors.participants_qty
                        : ""
                    }
                  />
                  {values &&
                    Object.keys(values).map((item) => {
                      return (
                        <Input
                          key={item}
                          type="text"
                          label={item}
                          name={item}
                          value={(formik?.values as any)?.[item]}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            formik.setValues((prevValues: any) => ({
                              ...prevValues,
                              participants: {
                                ...prevValues.participants,
                                [item]: e.target.value,
                              },
                            }))
                          }
                          error={
                            (formik?.touched as any)?.[item] &&
                            (formik?.errors as any)?.[item]
                              ? (formik?.errors as any)?.[item]
                              : ""
                          }
                        />
                      );
                    })}
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
