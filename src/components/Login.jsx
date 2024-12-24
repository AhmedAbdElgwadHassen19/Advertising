import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import "../style/signup+login.css"
function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const storedAccounts = JSON.parse(localStorage.getItem('accounts')) || [];

    // البحث عن الحساب المطابق
    const userAccount = storedAccounts.find(
      (account) => account.email === formData.email && account.password === formData.password
    );

    if (!userAccount) {
      alert('Invalid email or password!');
      return;
    }

    // تخزين بيانات المستخدم الحالي مؤقتًا
    localStorage.setItem('currentUser', JSON.stringify(userAccount));

    alert('Login successful!');
    navigate('/profile');
  };

  return (
    <div className="container Sing-Login mt-5">
      <h2 className="text-center mb-4 text-light">Login</h2>
      <form className="p-4 border rounded " onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-primary ">Login</button>
          <Link to={'/signup'} className="btn btn-primary">Sign Up</Link>
        </div>
      </form>
    </div>
  );
}

export default Login;