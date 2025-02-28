import { ReactNode } from 'react';
import { FiLayers, FiUsers, FiTool, FiHome, FiUser } from "react-icons/fi";

import styles from '../styles/MainLayout.module.css';


// Interface menuOptions
interface IMenuOpt {
    title: string;
    icon: ReactNode;
}

// Componente MainLayout
export default function MainLayout({ children }: { children: React.ReactNode }) {

    // Opções do menu
    const menuOptions: IMenuOpt[] = [
        {title: 'Home', icon: <FiHome />},
        {title: 'Turmas', icon: <FiLayers />},
        {title: 'Alunos', icon: <FiUsers />},
        {title: 'Suporte', icon: <FiTool />}
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
                            <li key={Math.random()}>{option.icon} {option.title}</li>
                        )}
                    </ul>
                </nav>
            </div>
            
            {/* Body */}
            <div className={styles.bodyContainer}>
                
                {/* Header */}
                <header>
                    <aside>
                        <span>Olá, (Nome do usuário)!</span>
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