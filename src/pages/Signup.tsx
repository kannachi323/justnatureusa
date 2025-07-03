import { useState } from 'react';
import { useNavigate } from 'react-router';

import {SignUpWithEmailPassword} from '../utils/auth';
import { useAuth } from '../hooks/useAuth';

export default function SignUp() {
  const navigate = useNavigate();
  const { setIsAuthenticated, setUser } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      alert("Please fill out both fields");
      return;
    }

    const res = await SignUpWithEmailPassword(formData.email, formData.password);
    if (res) {
      setIsAuthenticated(true);
      setUser({ id: res.user.uid, username: res.user.email || '' });
      navigate('/');
    } else {
      alert("Sign up failed. Please check your email and password.");
    }

    setFormData({ email: '', password: '' });
  }

  return (
    <div className="w-full h-[90vh] flex items-center justify-center bg-[#f8f8f3] text-[#8d745e]">
      <div className="w-1/3 h-auto bg-[#e9dcd1] p-10 rounded-md shadow-md">
        <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
          <h2 className="text-3xl text-center font-bold">Sign up</h2>

          <label>
            <p className="mb-2">Email</p>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="bg-[#f2ebe5] text-[#8d745e] border border-[#8d745e] rounded-sm focus:ring-0 focus:outline-none focus:border-2 focus:border-[#8d745e] p-3 w-full"
            />
          </label>

          <label>
            <p className="mb-2">Password</p>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="bg-[#f2ebe5] text-[#8d745e] border border-[#8d745e] rounded-sm focus:ring-0 focus:outline-none focus:border-2 focus:border-[#8d745e] p-3 w-full"
            />
          </label>

          <button
            type="submit"
            className="bg-[#ad9e84] text-[#8d745e] py-3 px-6 rounded-sm hover:bg-[#bfa58a] transition-colors duration-300 cursor-pointer text-xl"
          >
            Sign up
          </button>

          <p className="self-center text-sm">
            Already have an account?{' '}
            <a href="/login" className="text-[#8d745e] underline">Log in</a>
          </p>
        </form>
      </div>
    </div>
  );
}
