'use client';

// Import contexto
import { useModalContext } from "./context/ModalContext";
import { useAuthContext } from "./context/AuthContext";

// Import Funções
import { useEffect, useState } from "react";
import { IUserRegistration, registration } from "./services/login/registerService";
import windowRefresh from "./utils/functions/windowRefresh";
import passwordRules from "./utils/functions/passwordRules";
import formatInputName from "./utils/functions/formatInputName";
import formatInputEmail from "./utils/functions/formatInputEmail";
import formatInputTel from "./utils/functions/formatInputTel";
import formatInputUserName from "./utils/functions/formatInputUserName";

// Import utilitários
import { FiUser, FiLock, FiLogIn, FiEdit, FiMail, FiPhone, FiUserPlus, FiXCircle, FiEyeOff, FiEye } from "react-icons/fi";
import { SlActionRedo, SlActionUndo } from "react-icons/sl";
import Modal02 from "@/components/Modal/Modal02";
import Button from "@/components/Buttons/Button";

import styles from "./global/styles/page.module.css";


// Página de login
export default function LoginPage() {

  // Contexto para autenticação de login
  const {login} = useAuthContext();

  // Contexto para renderização de modal
  const {openModal} = useModalContext();

  // Estado para renderizar o form de cadastro de usuário
  const [registerForm, setRegisterForm] = useState({
    personalData: false,
    credentials: false
  });

  // Estados para armazenar valor dos inputs de login
  const [inputUser, setInputUser] = useState('');
  const [inputPassword, setInputPassword] = useState('');

  // Estado de usuário e senha válido/inválido
  const [userValid, setUserValid] = useState(true);

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

  // Estado para mostrar regras de cadastramento de senha
  const [passwordAlert, setPasswordAlert] = useState(['']);

  // Estado de animação loadingButton
  const [loadingBtnLogin, setLoadingBtnLogin] = useState(false);
  const [loadingBtnRegister, setLoadingBtnRegister] = useState(false);

  // Estado para habilitar botão próximo passo
  const [nextStepBtn, setNextStepBtn] = useState(false);

  // Estado para habilitar botão finalizar cadastro
  const [registerBtn, setRegisterBtn] = useState(false);


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


  // Função para habilitar os campos de cadastro (userName & password)
  function nextStep(): void {
    if (!inputName || !inputEmail || !inputTel) {
      console.warn('Preencha todos os campos de cadastro!');
      return;
    }

    setRegisterForm(() => ({
      personalData: false, credentials: true
    }));
  }


  // Função para verificar login
  async function handleLogin(event: React.FormEvent): Promise<void> {

    event.preventDefault();

    setLoadingBtnLogin(true); // Animação loading
    setUserValid(true);

    // Enviando credenciais do usuário para o backend
    try {
      
      // Faz a requisição ao backend
      await login(inputUser, inputPassword);
      console.log('Usuário validado!');

      // A função login fica responsável por redirecionar para a página home
      
    } catch (error: any) {

      if (!error.response) {
        // Se error.response for undefined, é um erro de conexão (servidor fora do ar)
        console.error("Erro de conexão com o servidor:", error.message);
        openModal(
            <Modal02
                type="error"
                title="Servidor Indisponível"
                message="Não foi possível conectar ao servidor. Verifique sua conexão e tente novamente mais tarde."
            />
        );
      } else if (error.response.status >= 500) {
          // Erros 500+ (problemas no servidor)
          console.error(`Erro no servidor (${error.response.status}):`, error.message);
          openModal(
              <Modal02
                  type="error"
                  title="Servidor Indisponível"
                  message="Ops! Nosso servidor está passando por instabilidades. Tente novamente mais tarde."
              />
          );
      } else {
          // Erros de autenticação ou outras respostas HTTP (ex: 400, 401, 403, 404)
          console.warn("Credenciais inválidas. Verifique seu usuário e senha.");
          console.warn(error.message);
          setUserValid(false);
      }

      setLoadingBtnLogin(false);
    }
  }


  // Função para enviar cadastro de usuário ao servidor backend
  async function handleRegister(event: React.FormEvent): Promise<void> {
    event.preventDefault();
    setLoadingBtnRegister(true); // Animação loading

    // Enviando dados do usuário para o backend
    try {
      const formData: IUserRegistration = {
        name: inputName,
        email: inputEmail,
        tel: parseInt(inputTel),
        userName: inputUserName,
        password: inputNewPassword
      };

      await registration(formData);

      // Renderizando modal de sucesso
      openModal(
        <Modal02
          type="confirm"
          title="Cadastro de usuário"
          message="Seu usuário foi cadastrado com sucesso!"
          confirmAction={windowRefresh}
        />
      );
      
    } catch (error: any) {

      // Se o erro possui uma resposta do backend
      const errorMessage =
        error.response?.data?.message || // Se o backend enviar um campo "message"
        error.response?.data || // Se a resposta for um texto direto
        "Ops! Erro inesperado, tente novamente mais tarde!";

      console.error(error, errorMessage);
      
      // Renderizando modal de erro com a mensagem do backend
      openModal(
        <Modal02
          type="error"
          title="Cadastro de usuário"
          message={errorMessage}
        />
      );

      setLoadingBtnRegister(false);
    }
  }


  // UseEffect para limpar os campos caso o cadastro de usuário seja cancelado
  useEffect(() => {
    if (!registerForm.personalData && !registerForm.credentials) {
      cleanFields();
    }
    return;
  }, [registerForm]);


  // UseEffect para formatar input name
  useEffect(() => {
    if (!inputName) {return}

    setInputName(formatInputName(inputName));

  }, [inputName]);


  // UseEffect para formatar input email
  useEffect(() => {
    if (!inputEmail) {return}

    setInputEmail(formatInputEmail(inputEmail));

  }, [inputEmail]);


  // UseEffect para formatar input telefone
  useEffect(() => {
    if (!inputTel) {return}

    setInputTel(formatInputTel(inputTel));

  }, [inputTel]);


  // UseEffect para habilitar botão próximo passo
  useEffect(() => {
    if (!inputName || !inputEmail || !inputTel) {
      return setNextStepBtn(false);
    }

    setNextStepBtn(true);

  }, [inputName, inputEmail, inputTel]);


  // UseEffect para habilitar botão finalizar cadastro
  useEffect(() => {
    if (!inputUserName || !inputNewPassword || !inputConfirmPassword) {
      return setRegisterBtn(false);
    }

    if (inputNewPassword !== inputConfirmPassword) {
      return setRegisterBtn(false);
    }

    setRegisterBtn(true);

  }, [inputUserName, inputNewPassword, inputConfirmPassword]);

  // UseEffect para controlar quantidade de caracteres do userName (cadastro)
  useEffect(() => {
    if (!inputUserName) {return}

    setInputUserName(formatInputUserName(inputUserName));

  }, [inputUserName]);


  // UseEffect para mostrar regras de criação de senha (cadastro)
  useEffect(() => {
    if (!inputNewPassword) {return}

    setPasswordAlert(passwordRules(inputNewPassword));

  }, [inputNewPassword]);


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
              O usuário e senha padrão é "<strong>Master@123</strong>".</p>

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
                <div>
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

                  {!userValid &&
                    <span className={styles.alert}>Dados de usuário inválidos ou inexistentes!</span>
                  }
                </div>

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
              
              {!loadingBtnLogin &&
                <>
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
                      enabled={nextStepBtn}
                      onClick={nextStep}
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
                    <div>
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
                      
                      {inputUserName && inputUserName.length < 10 &&
                        <span className={styles.alert}>Mínimo 10 caracteres!</span>
                      }
                    </div>

                    {/* Senha */}
                    <div>
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
                      
                      {inputNewPassword && passwordAlert.map((rule) => {
                        if (rule === '') {return}

                        return (
                          <span key={Math.random()} className={styles.alert}>{rule}</span>
                        );
                      })}
                    </div>

                    {/* Confirmação de senha */}
                    <div>
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

                      {
                        (inputNewPassword && inputConfirmPassword) &&
                        (inputNewPassword !== inputConfirmPassword) &&
                        <span className={styles.alert}>Confirmação de senha inválida!</span>
                      }
                    </div>

                    {/* Btn finalizar cadastro */}
                    <Button
                      height= '40px'
                      margin= '10px 0 0 0'
                      value= 'Finalizar cadastro'
                      icon= {<SlActionRedo size={'1.3em'} />}
                      type='submit'
                      loading={loadingBtnRegister}
                      enabled={registerBtn}
                      onClick={handleRegister}
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