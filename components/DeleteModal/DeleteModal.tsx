import Modal from "../Modal";
import clsx from "clsx";
import { Button } from "../Button";
import { Input } from "../Input";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { useRouter } from "next/router";
import Select from "../Select";

const DeleteModal = ({ open, onOpenChange, onDelete }: any) => {
  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <Modal.Portal>
        <Modal.Overlay />
        <Modal.Content>
          <div className="p-5">
            <h3 className="mb-5 text-lg font-normal text-gray-500">
              Are you sure you want to delete this count?
            </h3>
            <div className="w-full flex flex-col gap-2.5">
              <button
                type="button"
                onClick={onDelete}
                className="text-white bg-red-500 hover:bg-red-200 focus:ring-4 focus:outline-none focus:ring-red-200 rounded-lg border border-red-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"
              >
                Yes, Im sure
              </button>
              <Modal.Close asChild>
                <button
                  type="button"
                  className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"
                >
                  No, cancel
                </button>
              </Modal.Close>
            </div>
          </div>
        </Modal.Content>
      </Modal.Portal>
    </Modal>
  );
};

export default DeleteModal;
