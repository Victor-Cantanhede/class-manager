import { ChangeEvent, ReactNode } from 'react';
import styles from '../styles/Input01.module.css';


// Interface
interface IInput01 {
    height?: string;
    width?: string;
    padding?: string;
    icon?: ReactNode;
    type: 'text' | 'number' | 'date' | 'email' | 'password' | 'search';
    placeholder?: string;
    textAlign?: 'start' | 'center';
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function Input01({
    height       = 'max-content',
    width        = '100%',
    padding      = '5px',
    icon         = null,
    type         = 'text',
    placeholder  = '',
    textAlign    = 'start',
    value        = '',
    onChange     = () => alert('Não foi passada função onChange para este input!')
}: IInput01) {

    return (
        <div
            style={{
                height: height,
                width: width,
                padding: padding
            }}
            className={styles.Input01Container}
        >
            <label htmlFor='iInput01'>
                {icon !== null &&
                    <span style={{marginLeft: padding}}>{icon}</span>
                }
                <input
                    style={{
                        textAlign: textAlign,
                        paddingLeft: icon ? '2rem' : '5px'
                    }}
                    autoComplete='off'
                    id='iInput01'
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                />
            </label>
        </div>
    );
}