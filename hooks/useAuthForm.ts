import { useState } from 'react';


const useAuthForm = (initialState: { isLogin: boolean }) => {
  const [isLogin, setIsLogin] = useState(initialState.isLogin);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', phone: '' });
  const [error, setError] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const validateFields = () => {
    const { name, email, password, phone } = formData;
    if (!isLogin && name.trim().length < 2) return "Nome é necessário para criar a conta";
    if (!email.match(/^\S+@\S+\.\S+$/)) return "Email Inválido";
    if (password.length < 6) return "Senha precisa de no minimo 6 caracteres.";
    if (!isLogin && !phone.match(/^\d{10,}$/)) return "Numero de telefone é inválido";
    return '';
  };

  const toggleLoginMode = () => setIsLogin((prev) => !prev);

  return {
    isLogin,
    formData,
    error,
    message,
    setMessage,
    handleInputChange,
    validateFields,
    toggleLoginMode,
    setError
  };
};

export default useAuthForm;
