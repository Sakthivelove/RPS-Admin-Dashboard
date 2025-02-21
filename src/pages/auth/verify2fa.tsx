import React, { useState, FormEvent } from 'react';
import { useMutation } from '@tanstack/react-query';
import { FaLock } from 'react-icons/fa';
import Button from '../../components/common/AdminButton';
import { useNavigate } from 'react-router-dom';
import { api } from '../../api/api';
import logo from "/RockMainLogo.png";

// Define the shape of the 2FA data and response types
interface Verify2FADto {
  token: string;
  OTP: number;
}

interface Verify2FAResponse {
  success: boolean;
  message: string;
}

const verify2FA = async (data: Verify2FADto): Promise<Verify2FAResponse> => {
  try {
    const response = await api.post<Verify2FAResponse>('/auth/verify2fa', data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || '2FA verification failed');
  }
};

const Verify2FA: React.FC = () => {
  const [OTP, setOTP] = useState<number | string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const token = localStorage.getItem('authToken'); // Get the token from localStorage

  const mutation = useMutation<Verify2FAResponse, Error, Verify2FADto>({
    mutationFn: verify2FA,
    onSuccess: (data) => {
      if (data.success) {
        setErrorMessage(null); // Clear the error message
        navigate('/dashboard'); // Navigate on success
      }
    },
    onError: (error: Error) => {
      setErrorMessage(error.message); // Set error message
      // Automatically clear the error message after 3 seconds
      setTimeout(() => setErrorMessage(null), 3000);
    },
  });

  const handleVerifySubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!OTP || isNaN(Number(OTP))) {
      setErrorMessage('Please enter a valid OTP.');
      // Automatically clear the error message after 3 seconds
      setTimeout(() => setErrorMessage(null), 3000);
      return;
    }

    mutation.mutate({ token: token || '', OTP: Number(OTP) });
  };

  const handleOTPChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOTP(e.target.value);
    setErrorMessage(null); // Clear the error message when the user starts typing
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 overflow-hidden">
      <div className="bg-opacity-90 rounded-lg shadow-lg overflow-hidden relative w-full flex flex-col justify-center items-center">
        {/* Logo */}
        <img src={logo} alt="Rock Main Logo" className="mx-auto mb-4 h-24 w-auto" />

        {/* Title */}
        <h1 className="text-4xl font-bold text-center text-white mb-8" style={{ color: 'rgba(69, 248, 130, 1)' }}>
          2FA Verification
        </h1>

        <div className="p-[0.07rem] rounded-lg md:w-[30%]" style={{ background: 'linear-gradient(90deg, #45F882 0%, #FFBE18 100%)' }}>
          <form
            className="p-8 rounded-lg"
            style={{ backgroundColor: 'rgba(26, 29, 38, 1)' }}
            onSubmit={handleVerifySubmit}
          >
            <div className="flex flex-col gap-3">
              {/* OTP input */}
              <div className="relative">
                <FaLock
                  color="green"
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500"
                />
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={OTP}
                  onChange={handleOTPChange}
                  className="p-2 pl-10 pr-3 rounded-md focus:outline-none focus:ring focus:ring-green-100 w-full"
                  style={{
                    backgroundColor: 'rgba(14, 27, 34, 1)',
                    color: 'white',
                    border: 'none',
                  }}
                />
              </div>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <p className="text-red-500 text-center mt-4">{errorMessage}</p>
            )}

            {/* Loading State
            {mutation.isPending && (
              <p className="text-yellow-500 text-center mt-4">Verifying OTP...</p>
            )} */}

            {/* Verify Button */}
            <div className="flex justify-center mt-6">
              <Button
                image="green"
                text={mutation.isPending ? 'Verifying...' : 'Verify OTP'}
                isDisabled={mutation.isPending}
                onClick={handleVerifySubmit}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Verify2FA;
