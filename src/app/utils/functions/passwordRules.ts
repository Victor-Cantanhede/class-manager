

export default function passwordRules(password: string): string[] {

    // Senha possui entre 10 e 20 caracteres?
    const characters: string = password.length >= 10 && password.length <= 20
        ? '' : 'Deve possuir 10 à 20 caracteres!';

    // Senha possui ao menos 1 letra maiúscula e 1 minúscula?
    const hasUppercaseAndLowercase: string = /^(?=.*[a-z])(?=.*[A-Z])/.test(password)
        ? '' : 'Deve possuir letras maiúsculas e minúsculas!';

    // Senha possui caracteres especiais?
    const hasSpecialCharacters: string = /[!@#$%^&*(),.?":{}|<>]/.test(password)
        ? '' : 'Deve possuir no mínimo 1 caracter especial (?!#$;...)!';

    // Senha possui ao menos 1 letra e 1 número?
    const hasLettersAndNumbers: string = /^(?=.*[a-zA-Z])(?=.*[0-9])/.test(password)
        ? '' : 'Deve possuir letras e números!';

    return [characters, hasUppercaseAndLowercase, hasSpecialCharacters, hasLettersAndNumbers];
}