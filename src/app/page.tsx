'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";
import validateUser from "./services/login/validateUser";

import { FiUser, FiLock, FiLogIn } from "react-icons/fi";
import Button from "@/components/Buttons/Button";

import styles from "./global/styles/page.module.css";


// Página de login
export default function LoginPage() {

  // Rota
  const router = useRouter();


  // Estados para armazenar valor dos inputs
  const [inputUser, setInputUser] = useState('');
  const [inputPassword, setInputPassword] = useState('');

  // Estado de animação loadingButton
  const [loadingBtn, setLoadingBtn] = useState(false);


  // Função para verificar login
  async function handleLogin(event: React.FormEvent): Promise<void> {
    event.preventDefault();
    setLoadingBtn(true);

    // Simulando resposta do servidor
    try {
      const validatedUser = await new Promise<boolean>((resolve, reject) => {
  
        setTimeout(() => {
          const success = validateUser(inputUser, inputPassword);
  
          if (success === true) {
            resolve(true);
          }
          else {
            reject(new Error('Usuário ou senha inválido!'));
          }
        }, 3000);
      });
      
      if (validatedUser) {
        alert('Usuário validado!');
        setLoadingBtn(false);

        // Redirecionar para a página Home
        console.log('Redirecionando para a página Home...');
        router.push('/pages/home');

        return;
      }
      
      alert('Usuário ou senha inválido');

    } catch (error) {
      alert(error);
    }

    setLoadingBtn(false);
  }


  // Retorno TSX
  return (
    <div className={styles.loginBody}>

      <div className={styles.loginBg}>
        <h1>Seja bem-vindo(a)!</h1>
      </div>

      <div className={styles.loginContainer}>

        <h1>Class Manager</h1>

        <div className={styles.containerInputs}>

          <h2>Login</h2>
          <p>Digite seu usuário e senha abaixo para continuar:<br />
          O usuário e senha padrão é "<strong>Master</strong>".</p>

          {/* Formulário de login */}
          <form
            className={styles.loginInputs}
            method="post"
            autoComplete="off"
            onSubmit={handleLogin}
          >

            {/* Usuário */}
            <label htmlFor="iUser">
              <span><FiUser color="#2e2e2e" /></span>
              <input
                className={styles.inputsLogin}
                type="text"
                id="iUser"
                placeholder="Usuário"
                value={inputUser}
                onChange={(e) => setInputUser(e.target.value)}
              />
            </label>

            {/* Senha */}
            <label htmlFor="iPassword">
              <span><FiLock color="#2e2e2e" /></span>
              <input
                className={styles.inputsLogin}
                type="password"
                id="iPassword"
                placeholder="Senha"
                value={inputPassword}
                onChange={(e) => setInputPassword(e.target.value)}
              />
            </label>

            {/* Btn acessar */}
            <Button
              height= '40px'
              margin= '10px 0 0 0'
              value= 'Acessar'
              icon= {<FiLogIn size={'1.3em'} />}
              type='submit'
              loading={loadingBtn}
              onClick={() => null}
            />
          </form>
        </div>
      </div>
    </div>
  );
}
