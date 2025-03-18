import { v4 } from 'uuid';
import { ChangeEvent, ReactNode } from 'react';
import styles from '../styles/Input01.module.css';


// Interface
interface IInput01 {
    height?: string;
    width?: string;
    padding?: string;
    margin?: string;
    icon?: ReactNode;
    type: 'text' | 'number' | 'date' | 'email' | 'password' | 'search';
    placeholder?: string;
    textAlign?: 'start' | 'center';
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function Input01({
    height       = '2.3rem',
    width        = '100%',
    margin       = '0',
    padding      = '0',
    icon         = null,
    type         = 'text',
    placeholder  = '',
    textAlign    = 'start',
    value        = '',
    onChange     = () => alert('Não foi passada função onChange para este input!')
}: IInput01) {

    // Id de referência para label
    // Importante para caso este componente seja utilizado dentro do mesmo elemento pai
    const inputId: string = v4();

    return (
        <div
            style={{
                height: height,
                width: width,
                padding: padding,
                margin: margin
            }}
            className={styles.Input01Container}
        >
            <label htmlFor={inputId}>
                {icon !== null &&
                    <span style={{marginLeft: '0.5em'}}>{icon}</span>
                }
                <input
                    style={{
                        textAlign: textAlign,
                        paddingLeft: icon ? '2rem' : '5px'
                    }}
                    autoComplete='off'
                    id={inputId}
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                />
            </label>
        </div>
    );
}