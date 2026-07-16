"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import type { SectionId } from "@/types";

interface SectionContextType {
  active: SectionId;
  setActive: (id: SectionId) => void;
  modalContent: ReactNode | null;
  openModal: (content: ReactNode) => void;
  closeModal: () => void;
}

const SectionContext = createContext<SectionContextType>({
  active: "home",
  setActive: () => { },
  modalContent: null,
  openModal: () => { },
  closeModal: () => { },
});

export function useSectionContext() {
  return useContext(SectionContext);
}

export function SectionProvider({ children }: { children: ReactNode }) {
  const [active, setActive] = useState<SectionId>("home");
  const [modalContent, setModalContent] = useState<ReactNode | null>(null);

  const openModal = (content: ReactNode) => {
    setModalContent(content);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setModalContent(null);
    document.body.style.overflow = "";
  };

  return (
    <SectionContext.Provider
      value={{ active, setActive, modalContent, openModal, closeModal }}
    >
      {children}
    </SectionContext.Provider>
  );
}
