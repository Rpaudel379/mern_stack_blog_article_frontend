import ReactDOM from "react-dom";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const Modal = ({ children }: Props) => {
  return ReactDOM.createPortal(
    <div>{children}</div>,
    document.getElementById("portal") as HTMLElement
  );
};

export default Modal;
