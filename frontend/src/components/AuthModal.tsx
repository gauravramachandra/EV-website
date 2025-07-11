import React, { useState } from 'react';
import api from '../api';

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
  onAuth: (user: { name: string; email: string }) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ open, onClose, onAuth }) => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      let res;
      if (mode === 'login') {
        res = await api.post<{ token: string; user: { name: string; email: string } }>('/auth/login', { email, password });
      } else {
        res = await api.post<{ token: string; user: { name: string; email: string } }>('/auth/register', { name, email, password });
      }
      localStorage.setItem('token', res.data.token);
      onAuth(res.data.user);
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.error || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[100] min-h-screen">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-sm relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-black">&times;</button>
        <h2 className="text-2xl font-bold mb-4 text-center">{mode === 'login' ? 'Login' : 'Register'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded font-semibold hover:bg-gray-900 transition"
            disabled={loading}
          >
            {loading ? (mode === 'login' ? 'Logging in...' : 'Registering...') : (mode === 'login' ? 'Login' : 'Register')}
          </button>
        </form>
        <div className="text-center mt-4">
          {mode === 'login' ? (
            <span>Don&apos;t have an account? <button className="text-blue-600 hover:underline" onClick={() => setMode('register')}>Register</button></span>
          ) : (
            <span>Already have an account? <button className="text-blue-600 hover:underline" onClick={() => setMode('login')}>Login</button></span>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;