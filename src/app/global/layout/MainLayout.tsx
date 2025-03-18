import { useAuthContext } from '@/app/context/AuthContext';
import { ReactNode } from 'react';
import { FiLayers, FiUsers, FiTool, FiHome, FiUser } from "react-icons/fi";
import Link from 'next/link';

import styles from '../styles/MainLayout.module.css';


// Interface menuOptions
interface IMenuOpt {
    title: string;
    icon: ReactNode;
    page: string;
}

// Componente MainLayout
export default function MainLayout({ children }: { children: React.ReactNode }) {

    // Contexto usuário
    const { user } = useAuthContext();

    // Primeiro nome do usuário
    const name = (): string | undefined => {
        const firstNameUser = user?.name.split(' ')[0].toLowerCase();
        const formatedNameUser = firstNameUser
            ? firstNameUser.charAt(0).toUpperCase() + firstNameUser.slice(1)
            : undefined;

        return formatedNameUser;
    }

    // Opções do menu
    const menuOptions: IMenuOpt[] = [
        {title: 'Home', icon: <FiHome />, page: '/pages/home'},
        {title: 'Turmas', icon: <FiLayers />, page: '/pages/turmas'},
        {title: 'Alunos', icon: <FiUsers />, page: '/pages/alunos'},
        {title: 'Suporte', icon: <FiTool />, page: '/pages/suporte'}
    ]

    return (
        <main className={styles.main}>

            {/* Menu lateral */}
            <div className={styles.sideContainer}>
                <aside className={styles.logo}>
                    <h1>Class Manager</h1>
                </aside>

                <nav className={styles.menuContainer}>
                    <ul>
                        {menuOptions.map((option) =>
                            <li key={Math.random()}>
                                <Link href={option.page}>
                                    {option.icon} {option.title}
                                </Link>
                            </li>
                        )}
                    </ul>
                </nav>
            </div>
            
            {/* Body */}
            <div className={styles.bodyContainer}>
                
                {/* Header */}
                <header>
                    <aside>
                        <span>Olá, {name()}!</span>
                    </aside>

                    <div className={styles.myAccountContainer}>
                        <p>Minha conta</p>
                        <div className={styles.myAccount}>
                            <span><FiUser color='var(--fontWhite01)' /></span>
                        </div>
                    </div>
                </header>
                
                {/* Conteúdo */}
                <div className={styles.contentsContainer}>
                    {children}                
                </div>
            </div>
        </main>
    );
}