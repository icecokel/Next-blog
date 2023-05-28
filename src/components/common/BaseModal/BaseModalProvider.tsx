import { ReactNode, createContext, useState } from "react";
import BaseModal from "./BaseModal";

export interface IModalProps {
  title: string;
  children: ReactNode;
}

interface IModalContextProps extends IModalProps {
  open: (option: IModalProps) => void;
  close: () => void;
}

export const ModalContext = createContext<IModalContextProps>({} as IModalContextProps);

const BaseModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [modalOption, setModalOption] = useState<IModalProps>({ children: "", title: "" });

  const open = (option: IModalProps) => {
    setIsOpen(true);
    setModalOption(option);
  };

  const close = () => {
    setIsOpen(false);
  };

  return (
    <ModalContext.Provider value={{ ...modalOption, open, close }}>
      {children}
      <BaseModal isOpen={isOpen} />
    </ModalContext.Provider>
  );
};

export default BaseModalProvider;
