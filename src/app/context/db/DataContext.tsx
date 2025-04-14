'use client';
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useAuthContext } from "../AuthContext";
import { getClasses } from '../../services/classes/getClasses';
import { IClass } from '../../types/IClass';


// Tipos
interface IDataContext {
    classes: IClass[];
}

// Context
const DataContext = createContext<IDataContext | undefined>(undefined);

// Provider
export function DataProvider({ children }: { children: ReactNode }) {

    // Context
    const { user } = useAuthContext();
    
    // Estado para armazenar turmas, instrutores e alunos
    const [classes, setClasses] = useState<IClass[]>([]);
    const [students, setStudents] = useState([]);
    const [instructors, setInstructors] = useState([]);

    // Chama API para turmas
    const getAllClasses = async () => {
        if (user && user.userId) {
            try {
                const response =  await getClasses(user.userId);
                setClasses(() => Array.isArray(response) ? response : []);

            } catch (error) {
                console.error(error);
                setClasses([]);
            }
        }
    };

    // Chama API para alunos


    // Chamando funções ao carregar a página
    useEffect(() => {
        if (user) {getAllClasses()}
    }, [user]);

    return (
        <DataContext.Provider value={{ classes }}>
            {children}
        </DataContext.Provider>
    );
}

// Criando hook para usar este contexto
export function useDataContext() {
    const context = useContext(DataContext);

    if (!context) {
        throw new Error('useDataContext deve ser usado dentro do contexto DataProvider');
    }
    return context;
}