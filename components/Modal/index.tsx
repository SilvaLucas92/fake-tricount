import * as Dialog from "@radix-ui/react-dialog";
import clsx from "clsx";

const Modal = Dialog.Root as typeof Dialog.Root & {
  Overlay: typeof ModalOverlay;
  Content: typeof ModalContent;
  Title: typeof Dialog.Title;
  Description: typeof Dialog.Description;
  Close: typeof Dialog.Close;
  Trigger: typeof Dialog.Trigger;
  Portal: typeof Dialog.Portal;
};

const ModalTrigger = Dialog.Trigger;
const ModalPortal = Dialog.Portal;

const ModalOverlay = () => {
  return (
    <Dialog.Overlay
      className={clsx(
        "fixed",
        "bg-black",
        "bg-opacity-20",
        "inset-0",
        "backdrop-blur-sm",
        "animate-overlayShow",
        "z-[9999]"
      )}
    />
  );
};

const ModalContent = ({ children }: Dialog.DialogContentProps) => {
  return (
    <Dialog.Content
      className={clsx(
        "bg-white",
        "rounded-md",
        "top-1/2",
        "left-1/2",
        "transform",
        "translate-x-[-50%]",
        "translate-y-[-50%]",
        "h-auto",
        "overflow-y-auto",
        "fixed",
        "z-[9999]",
        "overflow-x-hidden",
        "w-full",
        "p-10",
        "md:w-2/4",
        "lg:w-1/4",
        "p-5",
        "overflow-y-auto",
        "md:mx-auto",
      )}
    >
      <>{children}</>
    </Dialog.Content>
  );
};

const ModalTitle = Dialog.Title;
const ModalDescription = Dialog.Description;
const ModalClose = Dialog.Close;

Modal.Overlay = ModalOverlay;
Modal.Content = ModalContent;
Modal.Title = ModalTitle;
Modal.Description = ModalDescription;
Modal.Close = ModalClose;
Modal.Trigger = ModalTrigger;
Modal.Portal = ModalPortal;

export default Modal;
