interface UserInterface {
    user: string;
    password: string;
};

const masterUser: UserInterface = {
    user: 'Master',
    password: 'Master'
};

export default function validateUser(user: string, password: string): boolean {
    console.log('Verificando usuário...');
    
    if (user === masterUser.user && password === masterUser.password) {
        console.log('Usuário validado com sucesso!');
        return true;
    }

    console.log('Usuário inválido!');
    return false;
}