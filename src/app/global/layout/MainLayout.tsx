import styles from '../styles/MainLayout.module.css';


export default function MainLayout({ children }: { children: React.ReactNode }) {

    return (
        <main className={styles.main}>

            {/* Menu lateral */}
            <div className={styles.sideContainer}>
                <aside className={styles.logo}>
                    <h1>Class Manager</h1>
                </aside>

                <nav>
                    <ul>
                        <li>Opção 1</li>
                        <li>Opção 2</li>
                        <li>Opção 3</li>
                    </ul>
                </nav>
            </div>
            
            {/* Body */}
            <div className={styles.bodyContainer}>
                {children}
            </div>
        </main>
    );
}