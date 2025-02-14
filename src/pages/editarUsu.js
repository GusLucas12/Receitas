import React, { useState, useEffect } from 'react';
import styles from './editarUsu.module.css';
import useUserInfo from '../components/user';
import InputField from '../components/input';
import FeedbackMessage from '../components/feedback';

function Editar() {
  const { userData, error, loading, getUserInfo } = useUserInfo();
  const [showPassword, setShowPassword] = useState(false);
  const [feedback, setFeedback] = useState({ messages: [], type: '' });

  // Estado do formulário
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  // Buscar informações do usuário apenas uma vez quando a página carregar
  useEffect(() => {
    const email = localStorage.getItem('userEmail');
    if (email) {
      getUserInfo(email);
    }
  }, []);

  // Preencher os campos APENAS quando os dados forem carregados pela primeira vez
  useEffect(() => {
    if (userData && profileData.name === '' && profileData.email === '') {
      setProfileData({
        name: userData.name || '',
        email: userData.email || '',
        password: '',
        confirmPassword: ''
      });
    }
  }, [userData]);

  // Atualizar os valores dos inputs dinamicamente
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // Função para atualizar o usuário no backend utilizando POST
  const updateUser = async (updatedData) => {
    const response = await fetch('https://backend-engsoft.onrender.com/user/update', {
      method: 'POST', // Alterado para POST
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedData)
    });
    if (!response.ok) {
      throw new Error('Erro ao atualizar o usuário');
    }
    return await response.json();
  };

  // Salvar as informações editadas
  const handleSave = async () => {
    if (profileData.password !== profileData.confirmPassword) {
      setFeedback({ messages: ['As senhas não coincidem!'], type: 'error' });
      return;
    }
    try {
      const updatedUser = {
        id: userData.id,
        name: profileData.name,
        email: profileData.email,
        password: profileData.password ? profileData.password : userData.password
      };

      await updateUser(updatedUser);
      setFeedback({ messages: ['Perfil atualizado com sucesso!'], type: 'success' });
    } catch (err) {
      setFeedback({ messages: ['Erro ao atualizar o perfil: ' + err.message], type: 'error' });
    }
  };

  // Exibir feedback de carregamento ou erro
  if (loading) {
    return <FeedbackMessage messages={[]} type="" loading={loading} />;
  }

  if (error) {
    return <FeedbackMessage messages={[error]} type="error" loading={false} />;
  }

  return (
    <div className={styles.editProfileContainer}>
      <h1>Editar Perfil</h1>
      {feedback.messages.length > 0 && (
        <FeedbackMessage messages={feedback.messages} type={feedback.type} loading={false} />
      )}
      <form className={styles.form}>
        <InputField
          label="Nome"
          type="text"
          placeholder="Digite seu nome"
          value={profileData.name}
          onChange={handleChange}
          name="name"
        />
        <InputField
          label="E-mail"
          type="email"
          placeholder="Digite seu e-mail"
          value={profileData.email}
          onChange={handleChange}
          name="email"
        />
        <h2>Senha</h2>
        <InputField
          label="Nova senha (deixe em branco para manter a atual)"
          type={showPassword ? 'text' : 'password'}
          placeholder="Digite sua nova senha"
          value={profileData.password}
          onChange={handleChange}
          name="password"
          isPassword={true}
          toggleVisibility={() => setShowPassword(!showPassword)}
        />
        <InputField
          label="Confirmar nova senha"
          type={showPassword ? 'text' : 'password'}
          placeholder="Confirme a nova senha"
          value={profileData.confirmPassword}
          onChange={handleChange}
          name="confirmPassword"
          isPassword={true}
          toggleVisibility={() => setShowPassword(!showPassword)}
        />
        <button type="button" onClick={handleSave} className={styles.saveButton}>
          Salvar
        </button>
      </form>
    </div>
  );
}

export default Editar;
