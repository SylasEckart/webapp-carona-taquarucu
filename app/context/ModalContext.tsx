"use client";

import React, { createContext, useContext, useState, ReactNode, } from 'react';

export type ModalProps = {
  isOpen: boolean;
  title?: string;
  content?: ReactNode;
  onClose?: () => void;
};

interface ModalContextProps {
  modal: ModalProps;
  openModal: (props: Omit<ModalProps, 'isOpen'>) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

interface ModalProviderProps {
  children: ReactNode;
}

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [modal, setModal] = useState<ModalProps>({ isOpen: false });

  const openModal = (props: Omit<ModalProps, 'isOpen'>) => {
    setModal({ ...props, isOpen: true });
  };

  const closeModal = () => {
    setModal({ isOpen: false });
    modal.onClose?.();
  };

  return (
    <ModalContext.Provider value={{ modal, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModalContext = (): ModalContextProps => {
  const context = useContext(ModalContext);
  if (!context) throw new Error("useModalContext must be used within a ModalProvider");
  return context;
};
