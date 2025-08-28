import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Signup() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', phone: '', email: '', timezone: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/register-business', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        router.push('/thank-you');
      } else {
        const data = await res.json();
        setError(data.error || 'Something went wrong');
      }
    } catch (err) {
      setError('Request failed');
    }
    setLoading(false);
  };

  return (<>
      <Navbar /><>
      <Navbar />
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-white p-8 rounded-2xl shadow-md">
          <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900">Sign Up Your Business</h2>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              required
              value={form.name}
              onChange={handleChange}
              placeholder="Business Name"
              className="w-full p-3 border border-gray-300 rounded-xl"
            />
            <input
              type="text"
              name="phone"
              required
              value={form.phone}
              onChange={handleChange}
              placeholder="Business Phone"
              className="w-full p-3 border border-gray-300 rounded-xl"
            />
            <input
              type="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              placeholder="Business Email"
              className="w-full p-3 border border-gray-300 rounded-xl"
            />
            <select
              name="timezone"
              required
              value={form.timezone}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-xl"
            >
              <option value="">Select Timezone</option>
              <option value="America/New_York">Eastern (EST)</option>
              <option value="America/Chicago">Central (CST)</option>
              <option value="America/Denver">Mountain (MST)</option>
              <option value="America/Los_Angeles">Pacific (PST)</option>
              <option value="UTC">UTC</option>
            </select>
            {error && <p className="text-red-600 text-sm">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-3 px-4 rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 font-medium"
            >
              {loading ? 'Signing up...' : 'Sign Up'}
            </button>
          </form>
        </div>
      </div>
    </div>
      <Footer />
    </>);
}
