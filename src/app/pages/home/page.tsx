'use client';

// Import Context
import { useAuthContext } from "@/app/context/AuthContext";

// Import Funções
import { useRouter } from "next/navigation";
import { useEffect } from "react";

// Import Componentes
import MainLayout from "@/app/global/layout/MainLayout";

// Import Estilos
import styles from '../styles/home.module.css';



export default function HomePage() {

    // Verificando se o usuário está logado
    const {user} = useAuthContext();
    
    if (!user) {
        return <p>Redirecionando...</p>;
    }
    

    return (
        <MainLayout>
            <h2 style={{background: 'red'}}>Página Home</h2>
        </MainLayout>
    );
}