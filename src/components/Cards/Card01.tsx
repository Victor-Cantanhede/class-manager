import styles from '../styles/Card01.module.css';


// Interface
interface ICardProps {
    title: string;
    type: 'completed' | 'pending' | 'canceled' | undefined;
    amount: string | number;
}

// O objetivo deste componente é ser um card para mostrar andamento ou apenas uma informação simples caso o type seja undefined
export default function Card01({
    title = 'Title',
    type = undefined,
    amount = 999
}: ICardProps) {

    // Definindo a cor da borda conforme tipo passado via props
    const borderColor =
        type === 'completed' ? ' #00b800' :
        type === 'pending' ? ' #ffb62e' :
        type === 'canceled' ? ' #e92929' : 'var(--blueColor02)';

    return (
        <div style={{borderLeft: `3px solid ${borderColor}`}} className={styles.cardContainer}>
            <p>{title}: <span className={styles.qtde}>{amount}</span></p>
        </div>
    );
}