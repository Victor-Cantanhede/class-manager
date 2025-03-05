'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authLogin } from "../services/login/authService";


// Interface IUser
interface IUser {
    name: string;
    userName: string;
}

// Interface IAuthContext
interface IAuthContext {
    user: IUser | null;
    emailValidated: boolean;
    setEmailValidated: (value: boolean) => void;
    login: (userName: string, password: string) => Promise<void>;
    logout: () => void;
}

// Criando contexto
const AuthContext = createContext<IAuthContext | null>(null);

// Criando o provider
export function AuthProvider({ children }: { children: ReactNode }) {

    // Estado para armazenar dados do usuário
    const [user, setUser] = useState<IUser | null>(null);
    const [emailValidated, setEmailValidated] = useState<boolean>(false);

    // Estado para definir carregamento do localStorage
    const [loading, setLoading] = useState<boolean>(true);

    const router = useRouter();

    // Buscando usuário no localStorage
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const storedEmailValidated = localStorage.getItem('emailValidated');

        // Caso usuário exista no localStorage, automaticamente o user recebe o usuário existente
        if (storedUser) {
            try {
                // Convertendo JSON para objeto
                const parsedUser: IUser = JSON.parse(storedUser);
                setUser(parsedUser);

            } catch (error) {
                console.error("Erro ao analisar usuário do localStorage:", error);
                setUser(null);
            }
        }

        // Restaurar estado do emailValidated
        if (storedEmailValidated !== null) {
            setEmailValidated(storedEmailValidated === "true");
        }

        setLoading(false); // Parando "carregamento"            

    }, []);

    // Após a verificação, se não houver usuário, redireciona
    useEffect(() => {
        if (!loading && !user) {
            console.log('Usuário não está logado! Redirecionando...');
            router.push('/');
        }
    }, [loading, user, router]);

    // Função de login (Chamada via tela de login)
    async function login(userName: string, password: string) {        
        
        try {
            // Enviando login do usuário ao servidor
            const userData = await authLogin(userName, password);

            const newUser: IUser = {
                name: userData.user.name,
                userName: userData.user.userName
            }

            // Atualizando o estado do usuário
            setUser(newUser);
            
            // Convertendo objeto para JSON antes de armazenar
            localStorage.setItem('user', JSON.stringify(newUser));

            // Redirecionando para página home
            router.push('/pages/home');

        } catch (error) {
            console.error(`Erro ao realizar login: ${error}`);
            throw error;            
        }
        
    }

    // Função de logout
    function logout() {
        setUser(null);
        setEmailValidated(false);
        localStorage.removeItem('user');
        localStorage.removeItem('emailValidated');

        router.push('/');
    }

    // Se a verificação do localStorage ainda estiver carregando, exibe tela de loading
    if (loading) {
        return <p>Carregando...</p>;
    }


    return (
        <AuthContext.Provider value={{ user, emailValidated, setEmailValidated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

// Hook personalizado
export function useAuthContext() {
    const context = useContext(AuthContext);
    
    if (!context) {
        throw new Error("useAuthContext deve ser usado dentro de um AuthProvider");
    }

    return context;
}