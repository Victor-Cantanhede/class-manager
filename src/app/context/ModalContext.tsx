'use client';
import { createContext, useContext, useState, ReactNode } from "react";
import Modal01 from "@/components/Modal/Modal01";


// Tipos
interface IModalContext {
    modalEnabled: boolean;
    openModal: (element: ReactNode) => void;
    closeModal: () => void;
}

// Context
const ModalContext = createContext<IModalContext | undefined>(undefined);

// Provider
export function ModalProvider({ children }: { children: ReactNode }) {

    // Estado de renderização
    const [modalEnabled, setModalEnabled] = useState(true);
    const [element, setElement] = useState<ReactNode | undefined>(undefined);

    // Função para ativar modal
    function openModal(element: ReactNode) {
        setModalEnabled(true);
        setElement(() => element);
    }
    
    // Função para fechar modal
    function closeModal() {
        setModalEnabled(false);
        setElement(undefined);
    }

    return (
        <ModalContext.Provider value={{modalEnabled, openModal, closeModal}}>
            {modalEnabled && element}
            {children}
        </ModalContext.Provider>
    );
}

// Criando hook para usar este contexto
export function useModalContext() {
    const context = useContext(ModalContext);

    if (!context) {
        throw new Error('useModal deve ser usado dentro do contexto ModalProvider');        
    }

    return context;
}