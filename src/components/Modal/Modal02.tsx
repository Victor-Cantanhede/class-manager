import { useState } from "react";
import { useModalContext } from "@/app/context/ModalContext";

import { SlArrowDown } from "react-icons/sl";
import Modal01 from './Modal01';
import Button from "../Buttons/Button";
import styles from '../styles/Modal02.module.css';


// Interface
interface IModal02 {
    type?: 'confirm' | 'alert' | 'error';
    title?: string;
    message?: string;
    confirmAction?: () => void;
    cancelAction?: () => void;
}

// Modal estilo pop-up
export default function Modal02({
    type = 'confirm',
    title = 'Modal example',
    message = 'This is a modal test!',
    confirmAction,
    cancelAction
}: IModal02) {

    const {closeModal} = useModalContext();

    const typeColor = {
        border:
            type === 'confirm' ? '1px solid #7bda3c' :
            type === 'alert'   ? '1px solid #ffa500' : '1px solid #df3e3e',

        color:
            type === 'confirm' ? ' #7bda3c' :
            type === 'alert'   ? ' #ffa500' : ' #df3e3e'
    };

    const iconStyle: React.CSSProperties = {
        border: typeColor.border
    };

    // Estado do Btn OK
    const [btnOkLoading, setBtnOkLoading] = useState(false);
    const [btnOkEnabled, setBtnOkEnabled] = useState(true);

    // Função para chamar confirmAction
    function handleConfirmAction(): void {

        if (confirmAction && !cancelAction) {
            setBtnOkLoading(true);
            setBtnOkEnabled(false);

            confirmAction();
            return;
        }
    }

    // Função para fechar modal caso não haja actions
    function closeModal02(): void {
        closeModal();
    }


    return (
        <Modal01>
            <div className={styles.Modal02Container}>

                {/* Icone */}
                <div
                    className={styles.icon}
                    style={iconStyle}
                >
                    {
                        (type === 'confirm' && <SlArrowDown size={'2em'} color={typeColor.color} />) ||

                        (type === 'alert' && <span style={{color: typeColor.color, fontSize: '2em', fontWeight: 'normal'}}>!</span>) ||

                        (type === 'error' && <span style={{color: typeColor.color, fontSize: '2em', fontWeight: 'normal'}}>X</span>)
                    }
                </div>

                {/* Título */}
                <h2>{title}</h2>

                {/* Mensagem */}
                <p className={styles.message}>{message}</p>

                {/* Buttons */}

                {/* Btn OK (Caso seja apenas modal de aviso) */}
                {!cancelAction &&
                    <Button
                        height="30px"
                        width="80px"
                        value="OK"
                        loading={btnOkLoading}
                        enabled={btnOkEnabled}
                        onClick={confirmAction ? handleConfirmAction : closeModal02}
                    />
                }
            </div>
        </Modal01>
    );
}