import Modal from "../Modal";
import clsx from "clsx";
import { Button } from "../Button";
import { Input } from "../Input";

export const AddForm = ({ open, onOpenChange }: any) => {
  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <Modal.Portal>
        <Modal.Overlay />
        <Modal.Content>
          <Modal.Title className={clsx("font-base", "text-lg")}>
            Add new Count
          </Modal.Title>
          <div className={clsx("flex", "flex-col", "gap-2", "my-5")}>
            <Input title="Title" name="title" />
            <Input title="Description" name="description" />
            <Input title="User n° 1" name="participante1" />
            <Input title="User n° 2" name="participante2" />
          </div>
          <Modal.Close asChild>
            <Button text="Submit" variant="filled" classname={clsx("w-full")} />
          </Modal.Close>
        </Modal.Content>
      </Modal.Portal>
    </Modal>
  );
};
