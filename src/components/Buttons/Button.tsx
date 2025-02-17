'use client'
import { useState } from "react";

import { ClipLoader } from "react-spinners";
import styles from "../styles/Button.module.css";


// Interface para as props
interface ButtonProps {
    height?: string;
    width?: string;
    margin?: string;
    color?: string;
    background?: string;
    title?: string | null;
    value?: string;
    icon?: React.ReactNode;
    type?: 'button' | 'submit' | 'reset';
    loading?: boolean;
    onClick?: (event: React.MouseEvent) => void;
}

// Componente Button
export default function Button({
        height = "auto",
        width = "100%",
        margin = "0",
        color = "white",
        background = "#3657F4",
        title = null,
        value = "Button",
        icon = null,
        type = "button",
        loading = false,
        onClick = () => alert('Este botão não está executando uma função!'),
    }: ButtonProps) {

    // Estilos inline
    const btnStyle: React.CSSProperties = {
        height,
        width,
        margin,
        color,
        background: loading? '#C7CBCD' : background,
        cursor: loading? 'not-allowed' : 'pointer',
    };

    // State para mostrar title do botão
    const [titleOn, setTitleOn] = useState(false);

    // Função para mostrar title do botão
    function showTitle() {
        setTitleOn(!titleOn);
    }

    // Função para impedir execução da ação caso o loading for true
    function bloqAction(): void {
        if (loading) {
            console.warn('Não é possível executar esta ação, aguarde o carregamento!');
        }
    }


    // Retorno TSX
    return (
        <button 
            style={btnStyle}
            className={styles.defaultBtn}
            type={type}
            onMouseEnter={showTitle}
            onMouseLeave={showTitle}
            onClick={loading? bloqAction : onClick}
        >
            {titleOn && title !== null &&
                <span className={styles.BtnTitle}>{title}</span>
            }
            
            {!loading &&
                <>
                    <span>{icon}</span>
                    <p>{value}</p>                
                </>
            }

            {loading &&
                <span><ClipLoader size='1.5em' color='white' /></span>
            }
        </button>
    );
}