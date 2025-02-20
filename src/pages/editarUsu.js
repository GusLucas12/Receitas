import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './editarUsu.module.css';
import useUserInfo from '../components/user';
import InputField from '../components/input';
import FeedbackMessage from '../components/feedback';

function Editar() {
  const navigate = useNavigate();
  const { userData, error, loading, getUserInfo } = useUserInfo();
  const [showPassword, setShowPassword] = useState(false);
  const [feedback, setFeedback] = useState({ messages: [], type: '' });
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  useEffect(() => {
    const email = localStorage.getItem('userEmail');
    if (email) {
      getUserInfo(email);
    }
  }, []);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({ ...prevData, [name]: value }));
  };

  const updateUser = async (email, data) => {
    const response = await fetch('https://backend-engsoft.onrender.com/user/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, ...data })
    });
    if (!response.ok) {
      let errorMsg = 'Erro ao atualizar o usuário';
      try {
        const errorResponse = await response.json();
        if (errorResponse && errorResponse.error) {
          errorMsg = errorResponse.error;
        }
      } catch (err) {}
      throw new Error(errorMsg);
    }
    let result = null;
    try {
      result = await response.json();
    } catch (err) {}
    return result;
  };

  const handleSave = async () => {
    if (profileData.password !== profileData.confirmPassword) {
      setFeedback({ messages: ['As senhas não coincidem!'], type: 'error' });
      return;
    }
    try {
      const updatedData = {
        name: profileData.name,
        password: profileData.password ? profileData.password : userData.password
      };
      const result = await updateUser(profileData.email, updatedData);
      if (result && result.error) {
        setFeedback({ messages: ['Erro ao atualizar o perfil: ' + result.error], type: 'error' });
      } else {
        setFeedback({ messages: ['Perfil atualizado com sucesso!'], type: 'success' });
      }
    } catch (err) {
      setFeedback({ messages: ['Erro ao atualizar o perfil: ' + err.message], type: 'error' });
    }
  };


  const deleteUserAPI = async (id) => {
    const response = await fetch('https://backend-engsoft.onrender.com/user/delete', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    });
    if (!response.ok) {
      let errorMsg = 'Erro ao deletar o usuário';
      try {
        const errorResponse = await response.text();
        errorMsg = errorResponse;
      } catch (err) {}
      throw new Error(errorMsg);
    }
    return await response.text();
  };

  const handleDeleteProfile = async () => {
    try {
      
      await deleteUserAPI(userData.id);
      setFeedback({ messages: ['Perfil deletado com sucesso!'], type: 'success' });

      localStorage.removeItem('userEmail');
      localStorage.removeItem('authToken');
      navigate('/login');
    } catch (err) {
      setFeedback({ messages: ['Erro ao deletar o perfil: ' + err.message], type: 'error' });
    }
  };

  if (loading) {
    return <FeedbackMessage messages={[]} type="" loading={loading} />;
  }

  if (error) {
    return <FeedbackMessage messages={[error]} type="error" loading={false} />;
  }

  return (
    <div className={styles.editProfileContainer}>
      {/* Botão de lixeira com tooltip */}
      <div className={styles.trashContainer}>
        <button
          type="button"
          onClick={() => setShowDeletePopup(true)}
          className={styles.trashButton}
        >
          🗑️
        </button>
        <span className={styles.tooltip}>Deletar Perfil</span>
      </div>

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
        <h1>Senha</h1>
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

      {/* Popup de confirmação para deleção */}
      {showDeletePopup && (
        <div className={styles.popupOverlay}>
          <div className={styles.popup}>
            <p>
              Tem certeza que deseja deletar seu perfil? Essa ação não pode ser desfeita.
            </p>
            <div className={styles.popupButtons}>
              <button onClick={() => setShowDeletePopup(false)} className={styles.cancelButton}>
                Cancelar
              </button>
              <button onClick={handleDeleteProfile} className={styles.confirmDeleteButton}>
                Deletar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Editar;
