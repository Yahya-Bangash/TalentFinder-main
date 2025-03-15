"use client";  // Make sure this is at the very top

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // For Next.js routing
import { ToastContainer, toast } from 'react-toastify'; // Toaster notifications
import 'react-toastify/dist/ReactToastify.css';
import { registerUser } from '../../../../appwrite/Services/authServices';
import { useTranslation } from "@/app/hooks/useTranslation";

const FormContent = ({ isEmployer }) => {
  const { t } = useTranslation('common');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();  // Prevent default form submission
    setLoading(true);

    try {
      // Register the user, pass whether the user is an employer or candidate
      await registerUser(email, password, isEmployer);
      
      // Show success notification
      toast.success('Registration successful!', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000, // Close after 3 seconds
      });

      // Redirect to home page after delay to let user see the success message
      setTimeout(() => {
        router.push('/');
      }, 3000); // 3-second delay before redirecting
    } catch (error) {
      console.error("Error during registration:", error);

      // Show error notification
      toast.error(t('RegisterForm.error_message'), {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>{t('RegisterForm.email')}</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t('RegisterForm.email_placeholder')}
            required
          />
        </div>

        <div className="form-group">
          <label>{t('RegisterForm.password')}</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t('RegisterForm.password_placeholder')}
            required
          />
        </div>

        <div className="form-group">
          <button className="theme-btn btn-style-one" type="submit" disabled={loading}>
            {loading ? t('RegisterForm.registering') : t('RegisterForm.register_button')}
          </button>
        </div>
      </form>

      {/* Toast notification container */}
      <ToastContainer />
    </>
  );
};

export default FormContent;
