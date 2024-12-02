import React, { useState, FormEvent } from 'react';
import { useMutation } from '@tanstack/react-query';
import { FaEye, FaEyeSlash, FaUser, FaLock } from 'react-icons/fa';
import Button from '../../components/common/AdminButton';
import { useNavigate } from 'react-router-dom';
import { api } from '../../api/api';
import logo from "/RockMainLogo.png"; // Logo Image
import StatusMessage from '../../components/StatusMessage';
import { useAuth } from '../../context/AuthContext';

interface LoginDto {
  telegramId: string;
  password: string;
}

interface LoginResponse {
  status: boolean;
  auth2: boolean;
  response: string;
  message: string;
  AuthId: number;
}

const loginUser = async (data: LoginDto): Promise<LoginResponse> => {
  try {
    const response = await api.post<LoginResponse>('/auth/login', data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};

const AdminLogin: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [telegramId, setTelegramId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();
  const { setUser } = useAuth();  // Access setUser from context

  const mutation = useMutation<LoginResponse, Error, LoginDto>({
    mutationFn: loginUser,
    onSuccess: (data) => {
      // On successful login, store the token
      if (data.status) {
        const user = {
          id: data.AuthId,
          token: data.response,
        };
        setUser(user); // Set user data in context
        localStorage.setItem('token', data.response);

        // Check if 2FA is required
        if (data.auth2) {
          // If 2FA is required, navigate to 2FA page
          navigate('/verify-2fa');
        } else {
          // If no 2FA required, navigate to the home page
          navigate('/affiliate-tournaments');
        }
      } else {
        console.error('Login failed: ', data.message);
      }
    },
    onError: (error: Error) => {
      console.error('Login failed:', error.message);
    },
  });

  const handleLoginSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!telegramId || !password) {
      alert('Both fields are required.');
      return;
    }

    mutation.mutate({ telegramId, password });
  };




  if (mutation.isPending || mutation.data?.status === false) {
    return (
      <StatusMessage
        isLoading={mutation.isPending}
        error={mutation.data?.status === false ? new Error(mutation.error?.message || 'Login failed. Please check your credentials.') : null}
        loadingMessage="Logging in..."
        errorMessage="Login failed. Please check your credentials."
        className="h-screen"
      />
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 overflow-hidden">
      <div className="bg-opacity-90 rounded-lg shadow-lg overflow-hidden relative w-full flex flex-col justify-center items-center">

        {/* Logo */}
        <img src={logo} alt="Rock Main Logo" className="mx-auto mb-4 h-24 w-auto" />

        {/* Title */}
        <h1 className="text-4xl font-bold text-center text-white mb-8" style={{ color: 'rgba(69, 248, 130, 1)' }}>
          Admin Login
        </h1>

        <div
          className="p-[0.07rem] rounded-lg md:w-[50%]"
          style={{ background: 'linear-gradient(90deg, #45F882 0%, #FFBE18 100%)' }}
        >
          <form className="p-8 rounded-lg" style={{ backgroundColor: 'rgba(26, 29, 38, 1)' }} onSubmit={handleLoginSubmit}>
            <div className="flex flex-col gap-3">
              {/* Telegram ID input */}
              <div className="relative">
                <FaUser color="green" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500" />
                <input
                  type="text"
                  placeholder="Telegram ID"
                  value={telegramId}
                  onChange={(e) => setTelegramId(e.target.value)}
                  className="p-2 pl-10 pr-3 rounded-md focus:outline-none focus:ring focus:ring-green-100 w-full"
                  style={{
                    backgroundColor: 'rgba(14, 27, 34, 1)',
                    color: 'white',
                    border: 'none',
                  }}
                />
              </div>

              {/* Password input with eye icon */}
              <div className="relative flex items-center">
                <FaLock color="green" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="p-2 pl-10 pr-3 rounded-md focus:outline-none focus:ring focus:ring-green-100 w-full"
                  style={{
                    backgroundColor: 'rgba(14, 27, 34, 1)',
                    color: 'white',
                    border: 'none',
                  }}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ background: 'none', border: 'none' }}
                >
                  {showPassword ? <FaEyeSlash color="white" /> : <FaEye color="white" />}
                </button>
              </div>
            </div>

            {/* Forgot Password Link */}
            <div className="flex justify-end">
              <button
                type="button"
                className="text-lg text-[#45f882] px-2"
                onClick={() => navigate('/forgot-password')}
              >
                Forgot Password?
              </button>
            </div>

            {/* Login Button */}
            <div className="flex justify-center mt-6">
              <Button
                image="green"
                text={mutation.isPending ? 'Logging in...' : 'Login'}
                onClick={handleLoginSubmit}
                isDisabled={mutation.isPending}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
