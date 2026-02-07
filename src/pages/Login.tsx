import { useState } from 'react';
import { useNavigate } from 'react-router';
import { LogInWithEmailPassword } from '../utils/auth';
import { useAuth } from '../hooks/useAuth';

export default function Login() {
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

    const res = await LogInWithEmailPassword(formData.email, formData.password);
    if (res) {
      setIsAuthenticated(true);
      setUser({ id: res.user.uid, username: res.user.email || '' });
      navigate('/');
    } else {
      alert("Login failed. Please check your email and password.");
    }

   
    setFormData({ email: '', password: '' });
  }

  return (
    <div className="w-full h-[90vh] flex items-center justify-center bg-[#f8f8f3] text-[#8d745e]">
      <div className="w-1/3 h-auto bg-[#eaddd2] p-10 rounded-md shadow-md">
        <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
          <h2 className="text-3xl text-center font-bold">Log in</h2>

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
            <a href="/forgot-password" className="text-[#8d745e] underline text-sm mt-2 inline-block">Forgot Password?</a>
          </label>

          <button
            type="submit"
            className="bg-[#ad9e84] text-[#8d745e] py-3 px-6 rounded-sm hover:bg-[#bfa58a] transition-colors duration-300 cursor-pointer text-xl"
          >
            Log In
          </button>

          <p className="self-center text-sm">
            Don't have an account?{' '}
            <a href="/signup" className="text-[#8d745e] underline">Sign up</a>
          </p>
        </form>
      </div>
    </div>
  );
}
