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
            <h2>Seja bem-vindo(a)!</h2>
            <br />
            <p>O <strong>Class Manager</strong> é uma plataforma desenvolvida para otimizar a gestão de capacitação em diversas instituições, desde empresas até escolas e centros de treinamento. Nosso objetivo é tornar mais ágil e organizada a administração de turmas, alunos e instrutores, proporcionando uma experiência eficiente e intuitiva para todos os envolvidos.</p>
            <br />
            <p>Com o Class Manager, é possível cadastrar alunos, gerenciar turmas, acompanhar a evolução de cada participante e garantir um fluxo de ensino bem estruturado. A plataforma foi pensada para facilitar o trabalho de setores de treinamento e capacitação, reduzindo burocracias e melhorando o acompanhamento do aprendizado.</p>
            <br />
            <p>Seja para empresas que oferecem cursos internos ou escolas que precisam de uma organização mais eficiente, o <strong>Class Manager</strong> é a solução ideal para transformar a gestão educacional com tecnologia e praticidade.</p>
        </MainLayout>
    );
}