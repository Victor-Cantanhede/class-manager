'use client';

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { login } from "./services/login/authService";

import { FiUser, FiLock, FiLogIn, FiEdit, FiMail, FiPhone, FiUserPlus, FiXCircle, FiEyeOff, FiEye } from "react-icons/fi";
import { SlActionRedo, SlActionUndo } from "react-icons/sl";
import Button from "@/components/Buttons/Button";

import styles from "./global/styles/page.module.css";


// Página de login
export default function LoginPage() {

  // Rota
  const router = useRouter();

  // Estado para renderizar o form de cadastro de usuário
  const [registerForm, setRegisterForm] = useState({
    personalData: false,
    credentials: false
  });

  // Estados para armazenar valor dos inputs de login
  const [inputUser, setInputUser] = useState('');
  const [inputPassword, setInputPassword] = useState('');

  // Estados para armazerar valor dos inputs de cadastro de usuário
  const [inputName, setInputName] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const [inputTel, setInputTel] = useState('');

  // Estados para armazenar valor das credenciais de cadastro
  const [inputUserName, setInputUserName] = useState('');
  const [inputNewPassword, setInputNewPassword] = useState('');
  const [inputConfirmPassword, setInputConfirmPassword] = useState('');

  // Estado para habilitar visualização de senhas
  const [showPassoword, setShowPassword] = useState(false);
  const [passwordType, setPasswordType] = useState('password');

  // Estado de animação loadingButton
  const [loadingBtnLogin, setLoadingBtnLogin] = useState(false);


  // Função para habilitar visualização de senhas
  function hidePassword(): void {
    setShowPassword(!showPassoword);
    
    if (passwordType === 'password') {
      setPasswordType('text');

    } else {
      setPasswordType('password');
    }
  }


  // Função para limpar todos os campos ao cancelar cadastro
  function cleanFields(): void {
    setInputUser('');
    setInputPassword('');
    setInputName('');
    setInputEmail('');
    setInputTel('');
    setInputUserName('');
    setInputNewPassword('');
    setInputConfirmPassword('');
  }


  // Função para verificar login
  async function handleLogin(event: React.FormEvent): Promise<void> {
    event.preventDefault();
    setLoadingBtnLogin(true);

    // Enviando credenciais do usuário para o backend (simulação)
    try {

      // Faz a requisição ao backend
      const userData = await login(inputUser, inputPassword);
  
      alert('Usuário validado!');      
      router.push('/pages/home'); // Redireciona ao Home
  
    } catch (error: any) {
      alert(error.message);
      setLoadingBtnLogin(false);
    }
  }


  // UseEffect para limpar os campos caso o cadastro de usuário seja cancelado
  useEffect(() => {
    if (!registerForm.personalData && !registerForm.credentials) {
      cleanFields();
    }
    return;
  }, [registerForm]);


  // Retorno TSX
  return (
    <div className={styles.loginBody}>

      <div className={styles.loginBg}>
        <h1>Seja bem-vindo(a)!</h1>
      </div>

      <div className={styles.loginContainer}>

        <h1>Class Manager</h1>

        <div className={styles.containerInputs}>

          {!registerForm.personalData && !registerForm.credentials &&
            <>
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
                    type={passwordType}
                    id="iPassword"
                    placeholder="Senha"
                    value={inputPassword}
                    onChange={(e) => setInputPassword(e.target.value)}
                  />
                  <aside onClick={hidePassword}>
                    {
                      (!showPassoword && <FiEyeOff color="#2e2e2e" />) ||
                      (showPassoword && <FiEye color="#2e2e2e" />)
                    }
                  </aside>
                </label>

                {/* Btn acessar */}
                <Button
                  height= '40px'
                  margin= '10px 0 0 0'
                  value= 'Acessar'
                  icon= {<FiLogIn size={'1.3em'} />}
                  type='submit'
                  loading={loadingBtnLogin}
                  onClick={() => null}
                />
              </form>

              <p>Não tem uma conta?</p>

              {/* Btn cadastre-se */}
              <Button
                height= '40px'
                value= 'Cadastre-se'
                icon= {<FiEdit size={'1.3em'} />}
                type= 'button'
                onClick={() => setRegisterForm((prev) => ({
                  ...prev, personalData: true
                }))}
              />
            </>
          }

          {(registerForm.personalData || registerForm.credentials ) &&
            <>
              <h2>Cadastro de usuário</h2>

              {registerForm.personalData &&
                <>
                  <p>Preencha seus dados abaixo para continuar:<br />
                  Verifique também se todos os dados estão corretos, principalmente o "<strong>E-mail</strong>".</p>
                </>
              }

              {registerForm.credentials &&
                <>
                  <p>Agora crie seu <strong>Nome de usuário</strong> e uma <strong>Senha de acesso</strong> para finalizar seu cadastro:</p>
                </>
              }
              
              {/* Formulário de cadastro */}
              <form
                className={styles.loginInputs}
                method="post"
                autoComplete="off"
              >
                
                {registerForm.personalData &&
                  <>
                    {/* Nome completo */}
                    <label htmlFor="iName">
                      <span><FiUser color="#2e2e2e" /></span>
                      <input
                        className={styles.inputsLogin}
                        type="text"
                        id="iName"
                        placeholder="Nome completo"
                        value={inputName}
                        onChange={(e) => setInputName(e.target.value)}
                      />
                    </label>

                    {/* E-mail */}
                    <label htmlFor="iEmail">
                      <span><FiMail color="#2e2e2e" /></span>
                      <input
                        className={styles.inputsLogin}
                        type="email"
                        id="iEmail"
                        placeholder="E-mail"
                        value={inputEmail}
                        onChange={(e) => setInputEmail(e.target.value)}
                      />
                    </label>

                    {/* Telefone */}
                    <label htmlFor="iTel">
                      <span><FiPhone color="#2e2e2e" /></span>
                      <input
                        className={styles.inputsLogin}
                        type="tel"
                        id="iTel"
                        placeholder="Telefone com DDD (99) 99999-9999"
                        value={inputTel}
                        onChange={(e) => setInputTel(e.target.value)}
                      />
                    </label>

                    {/* Btn próximo passo */}
                    <Button
                      height= '40px'
                      margin= '10px 0 0 0'
                      value= 'Avançar'
                      icon= {<SlActionRedo size={'1.3em'} />}
                      type='button'
                      onClick={() => setRegisterForm(() => ({
                        personalData: false, credentials: true
                      }))}
                    />

                    {/* Btn cancelar cadastro */}
                    <Button
                      height= '40px'
                      background= '#ff3838'
                      value= 'Cancelar cadastro'
                      icon= {<FiXCircle size={'1.3em'} />}
                      type='button'
                      onClick={() => setRegisterForm(() => ({
                        personalData: false, credentials: false
                      }))}
                    />
                  </>
                }

                {registerForm.credentials &&
                  <>
                    {/* Nome de usuário */}
                    <label htmlFor="iUser">
                      <span><FiUserPlus color="#2e2e2e" /></span>
                      <input
                        className={styles.inputsLogin}
                        type="text"
                        id="iUser"
                        placeholder="Nome de usuário"
                        value={inputUserName}
                        onChange={(e) => setInputUserName(e.target.value)}
                      />
                    </label>

                    {/* Senha */}
                    <label htmlFor="iNewPassword">
                      <span><FiLock color="#2e2e2e" /></span>
                      <input
                        className={styles.inputsLogin}
                        type={passwordType}
                        id="iNewPassword"
                        placeholder="Senha"
                        value={inputNewPassword}
                        onChange={(e) => setInputNewPassword(e.target.value)}
                      />
                      <aside onClick={hidePassword}>
                        {
                          (!showPassoword && <FiEyeOff color="#2e2e2e" />) ||
                          (showPassoword && <FiEye color="#2e2e2e" />)
                        }
                      </aside>
                    </label>

                    {/* Confirmação de senha */}
                    <label htmlFor="iConfirmPassword">
                      <span><FiLock color="#2e2e2e" /></span>
                      <input
                        className={styles.inputsLogin}
                        type="password"
                        id="iConfirmPassword"
                        placeholder="Confirme sua senha"
                        value={inputConfirmPassword}
                        onChange={(e) => setInputConfirmPassword(e.target.value)}
                      />
                    </label>

                    {/* Btn finalizar cadastro */}
                    <Button
                      height= '40px'
                      margin= '10px 0 0 0'
                      value= 'Finalizar cadastro'
                      icon= {<SlActionRedo size={'1.3em'} />}
                      type='submit'
                      onClick={() => {}}
                    />

                    {/* Btn voltar */}
                    <Button
                      height= '40px'
                      background= '#ff3838'
                      value= 'Voltar'
                      icon= {<SlActionUndo size={'1.3em'} />}
                      type='button'
                      onClick={() => setRegisterForm(() => ({
                        personalData: true, credentials: false
                      }))}
                    />
                  </>
                }
              </form>
            </>
          }
        </div>
      </div>
    </div>
  );
}