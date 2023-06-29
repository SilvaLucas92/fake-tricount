import React, { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import Modal from "../Modal";
import clsx from "clsx";
import { Button } from "../Button";
import { Input } from "../Input";
import * as Yup from "yup";
import { useFormik } from "formik";
import Select from "../Select";
import { Dispatch, SetStateAction } from "react";
import { CountItem, selectOptions } from "@/types/types";
import Scrollarea from "../ScrollArea";

interface formProps {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  onSubmit: any;
  formType?: string;
  participants?: selectOptions[];
  data?: CountItem | null | undefined;
  setData?: Dispatch<SetStateAction<CountItem | null | undefined>>;
}

const options = [
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4" },
  { value: "5", label: "5" },
  { value: "6", label: "6" },
  { value: "7", label: "7" },
  { value: "8", label: "8" },
  { value: "9", label: "9" },
];

const AddModal: React.FC<formProps> = ({
  open,
  onOpenChange,
  onSubmit,
  formType,
  participants,
  data,
  setData,
}) => {
  const [values, setValues] = useState<Record<string, string> | null>(null);
  const [validation, setValidation] = useState({});
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
          participants_qty: Yup.number()
            .min(1, "Must be at least 2 members")
            .max(10, "Must be less than 10 members")
            .required("Number of participants is required"),
          ...validation,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      (validations as any)[key] = Yup.string().required(
        `${name.slice(0, 6)} is required`
      );
    }
    setValues(participants);
    setValidation({
      participants: Yup.object().shape(validations),
    });
    formik.setValues((prev: any) => ({ ...prev, participants }));
  };

  useEffect(() => {
    if (formik?.values?.participants_qty as any) {
      setParticipants(formik?.values?.participants_qty as any);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.participants_qty]);

  return (
    <Dialog.Root
      open={open}
      onOpenChange={() => {
        data && setData && setData(null);
        onOpenChange(false);
        formik.resetForm();
        setValues(null);
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="bg-blackA9 backdrop-blur-sm data-[state=open]:animate-overlayShow fixed inset-0" />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <Scrollarea>
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
                    <Select
                      label="Amount of members"
                      data={options ?? []}
                      onChange={(value) =>
                        formik.setFieldValue("participants_qty", Number(value))
                      }
                      name="paid_by"
                      value={String(formik.values.participants_qty)}
                      placeholder="Aditional members"
                    />
                    {values &&
                      Object.keys(values).map((item) => {
                        return (
                          <Input
                            key={item}
                            type="text"
                            label={item.slice(0, 6)}
                            name={`participants.${item}`}
                            value={
                              (formik?.values?.participants as any)?.[item]
                            }
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) =>
                              formik.setValues((prevValues: any) => ({
                                ...prevValues,
                                participants: {
                                  ...prevValues.participants,
                                  [item]: e.target.value,
                                },
                              }))
                            }
                            error={
                              (formik?.errors?.participants as any)?.[item] &&
                              (formik?.touched?.participants as any)?.[item]
                                ? (formik?.errors?.participants as any)[item]
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
                      onChange={(value) =>
                        formik.setFieldValue("paid_by", value)
                      }
                      name="paid_by"
                      value={formik.values.paid_by}
                      placeholder="Select a member"
                    />
                  </>
                )}
              </div>
              <Modal.Close asChild>
                <Button text="Submit" variant="filled" w={"w-full"} />
              </Modal.Close>
            </form>
          </Scrollarea>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default AddModal;
