import api from '../api';


export const authEmail = async (email: string): Promise<void> => {
    try {
        await api.post('http://localhost:5000/api/users/request-email-verification', { email: email });

        console.log('Token enviado com sucesso!');

    } catch (error) {
        console.error('Erro ao solicitar código de verificação: ', error);
        throw error;        
    }
}

export const verifyEmailCode = async (email: string, code: string): Promise<void> => {
    try {
        await api.post('http://localhost:5000/api/users/verify-email-code', {
            email: email,
            code: code
        });

        console.log('E-mail validado com sucesso!');

    } catch (error) {
        console.error('Falha na verificação do token: ', error);
        throw error;
    }
}