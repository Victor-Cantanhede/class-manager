import { useState } from 'react';
import { authEmail } from '@/app/services/login/authEmail';
import { useModalContext } from '@/app/context/ModalContext';
import TokenModal01 from '@/components/Modal/TokenModal01';
import Modal02 from '@/components/Modal/Modal02';


export function useAuthEmail() {
    
    const { openModal } = useModalContext();
    const [loadingTokenEmail, setLoadingTokenEmail] = useState<boolean>(false);

    // Função para enviar o token
    const sendTokenToEmail = async (email: string) => {
        
        // Inicia estado de loading
        setLoadingTokenEmail(true);

        try {
            await authEmail(email); // Chama serviço de token

            // Abre modal para inserir o token
            openModal(
                <TokenModal01
                    type='email'
                    method='e-mail'
                    emailString={email}
                />
            );
    
        } catch (error) {

            // Retorna modal com mensagem de erro
            openModal(
                <Modal02
                    type='error'
                    title='Erro'
                    message='Ops... Ocorreu um erro ao enviar o código para seu e-mail, tente novamente mais tarde!'
                />
            );

        } finally {
            setLoadingTokenEmail(false);
        }
    }

    return { sendTokenToEmail, loadingTokenEmail };
}