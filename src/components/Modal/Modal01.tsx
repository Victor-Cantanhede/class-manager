import { ReactNode } from 'react';
import styles from '../styles/Modal01.module.css';


export default function Modal01({ children }: { children: ReactNode }) {

    return (
        <div className={styles.bgModal}>
            <div className={styles.modalContainer}>
                {children}
            </div>
        </div>
    );
}