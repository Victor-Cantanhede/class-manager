'use client';
import styles from '../styles/Input.module.css';


// Interface para as props
interface inputProps {
    type: 'date' | 'email' | 'number' | 'password' | 'search' | 'tel' | 'text';
    placeholder?: string;
    value: string;
    icon?: React.ReactNode;
    onChange: (event: React.ChangeEvent) => void;
    // Para usar o onChange no componente chame conforme abaixo:
    // onChange={(e) => setXXXXXXX((e.target as HTMLInputElement).value)}
}

// Componente Input
export default function Input({
    type = 'text',
    placeholder = '',
    value = '',
    icon = null,
    onChange = () => {alert('Nenhum evento foi passado via onChange!')}
}: inputProps) {

    // Retorno TSX
    return (
        <label className={styles.InputLabel} htmlFor="iInput">

            {icon && <span>{icon}</span>}
            <input
                style={{paddingLeft: icon ? '2.2rem' : '1rem'}}
                id='iInput'
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        </label>
    );
}