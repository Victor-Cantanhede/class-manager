import { useEffect, useState } from 'react';
import { verifyEmailCode } from '@/app/services/login/authEmail';
import { useModalContext } from '@/app/context/ModalContext';
import { useAuthContext } from '@/app/context/AuthContext';

import Modal01 from './Modal01';
import Modal02 from './Modal02';
import { FiMail, FiSend } from 'react-icons/fi';
import { VscShield } from "react-icons/vsc";
import Input01 from '../Inputs/Input01';
import Button from '../Buttons/Button';
import styles from '../styles/TokenModal01.module.css';


// Interface props
interface ITokenProps {
    type?: 'email' | 'tel';
    method?: string;
    emailString?: string;
    telString?: string;
}

export default function TokenModal01({
    type,
    method = 'xxxx', // Apenas para teste
    emailString = '',
    telString
}: ITokenProps) {

    // Context para definir se o e-mail foi validado
    const { setEmailValidated } = useAuthContext();

    // Modal context para abrir mensagem de sucesso ou erro
    const { openModal } = useModalContext();
    
    // Estado para armazenar valor do input
    const [codeValue, setCodeValue] = useState('');

    // Estado do botão validar código
    const [isEnabled, setIsEnabled] = useState(false);
    const [loading, setLoading] = useState(false);

    // UseEffect para habilitar botão validar código
    useEffect(() => {
        if (codeValue.length < 6) {
            setIsEnabled(false);

        } else {
            setIsEnabled(true);
        }
    }, [codeValue]);

    // Função para verificar se o código é válido (e-mail)
    async function checkCode(email: string, code: string): Promise<void> {

        setLoading(true); // Habilita loading

        try {
            await verifyEmailCode(email, code);
            
            // Altera o estado de e-mail validado (no contexto)
            setEmailValidated(true);

            // Mostra mensagem de sucesso na tela após 1,5s
            await new Promise<void>((resolve, reject) => {
                setTimeout(() => {
                    openModal(
                        <Modal02
                            type='confirm'
                            title='Validação de e-mail'
                            message='Seu e-mail foi validado com sucesso!'
                        />
                    );
                    resolve();
                }, 1500);                
            });

        } catch (error: any) {
            console.error(error);

            let errorMessage = 'Ops... Ocorreu um erro interno, tente novamente mais tarde!';
            
            let errorTitle = 'Erro';

            if (error?.response?.data?.message) {

                errorMessage = 'Será necessário realizar uma nova validação do seu e-mail!';

                errorTitle = 'Código inválido';
            }

            // **Adicionando um timeout para garantir renderização**
            setTimeout(() => {
                openModal(
                    <Modal02
                        type="error"
                        title={errorTitle}
                        message={errorMessage}
                    />
                );
            }, 0);

            // Para evitar futuros erros, altera o estado de e-mail validado (no contexto)
            setEmailValidated(false);
        }
        
        setLoading(true); // Desativa loading
    }

    return (
        <Modal01>
            <div className={styles.TokenModal01Container}>

                {/* Icone */}
                <div className={styles.icon}>
                    <FiMail size={'2.5em'} color="#2e2e2e" />
                </div>

                {/* Título */}
                <h2>
                    {
                        (type === 'email' && 'Validação de e-mail') ||
                        (type === 'tel' && 'Validação de telefone') ||
                        (!type && 'Validação de xxxx') // Apenas para teste
                    }
                </h2>

                {/* Mensagem */}
                <p className={styles.message}>
                    Verifique o código enviado para o

                    {type === 'email' && (
                        <> e-mail <strong>{emailString}</strong>.</>
                    )}

                    {type === 'tel' && (
                        <> telefone <strong>{telString}</strong> via SMS.</>
                    )}

                    {!type && ' xxxx'} {/* Apenas para teste */}
                    <br />
                    Digite o código no campo abaixo para concluir a validação:
                </p>

                {/* Input Código (token) */}
                <div className={styles.tokenContainer}>
                    <Input01
                        height='40px'
                        width='6.3rem'
                        type='text'
                        icon={<VscShield size={'1.3em'} />}
                        placeholder='------'
                        textAlign='center'
                        value={codeValue}
                        onChange={(e) => setCodeValue(e.target.value)}
                    />

                    {/* Botão validar código */}
                    <Button
                        height='30px'
                        width='30px'
                        type='submit'
                        icon={<FiSend size={'1.3em'} />}
                        value=''
                        title='Validar código'
                        enabled={isEnabled}
                        loading={loading}
                        onClick={() => checkCode(emailString, codeValue)}
                    />
                </div>

                </div>
        </Modal01>
    );
}