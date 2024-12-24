import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import "../style/signup+login.css"
function Signup() {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: '',
    image: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setFormData({ ...formData, image: reader.result }); // تحويل الصورة إلى Base64
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { email, name, password, image } = formData;

    // التحقق من تعبئة جميع الحقول
    if (!email || !name || !password || !image) {
      alert('Please fill out all fields.');
      return;
    }

    // جلب الحسابات المخزنة مسبقًا من localStorage
    const storedAccounts = JSON.parse(localStorage.getItem('accounts')) || [];

    // التحقق إذا كان البريد الإلكتروني موجودًا بالفعل
    const emailExists = storedAccounts.some((account) => account.email === email);
    if (emailExists) {
      alert('This email is already registered.');
      return;
    }

    // إضافة الحساب الجديد إلى المصفوفة
    storedAccounts.push(formData);

    // تخزين المصفوفة المحدثة في localStorage
    localStorage.setItem('accounts', JSON.stringify(storedAccounts));

    alert('Signup successful! Redirecting to Login.');
    navigate('/login');
  };

  return (
    <div className="container Sing-Login mt-5">
      <h2 className="text-center mb-4 text-light">Signup</h2>
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
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
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
        <div className="mb-3">
          <label htmlFor="image" className="form-label">Upload Image</label>
          <input
            type="file"
            className="form-control"
            id="image"
            name="image"
            onChange={handleImageChange}
            accept="image/*"
            required
          />
        </div>
        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-primary ">Sign Up</button>
          <Link to={'/login'} className="btn btn-primary ">Login</Link>
        </div>
      </form>
    </div>
  );
}

export default Signup;