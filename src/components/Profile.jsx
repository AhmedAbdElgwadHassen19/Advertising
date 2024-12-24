import  { useEffect, useState } from 'react';
import "../style/protfile.css"
import { IoWalletOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
function Profile() {
  const [currentUser, setCurrentUser] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('currentUser'));
    if (userData) {
      setCurrentUser(userData);
      setImagePreview(userData.image); // حفظ صورة المستخدم الحالية
    }
  }, []);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // إنشاء رابط URL للصورة المرفوعة
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        const updatedUser = { ...currentUser, image: reader.result };
        setCurrentUser(updatedUser);
        localStorage.setItem('currentUser', JSON.stringify(updatedUser)); // حفظ التحديث في localStorage
      };
      reader.readAsDataURL(file); // تحويل الصورة إلى Base64
    }
  };

  if (!currentUser) {
    return <div className="text-center mt-5">No user data available.</div>;
  }

  return (
    <div className="container mt-5">
      <div className="profile-card p-4 border rounded bg-light">
      
        <div className="profile-content">
          <div className="profile-image-container">
            <img 
              src={imagePreview} 
              alt="Profile" 
              className="profile-image"
            />
            <div className="profile-text">
              <h3 className="profile-name">{currentUser.name}</h3>
              <p className="profile-email text-muted">{currentUser.email}</p>
              <h6>USDT {}</h6>
              <label htmlFor="image-upload" className="btn-custom">Change Picture</label>
              <input 
                type="file" 
                id="image-upload" 
                accept="image/*" 
                onChange={handleImageChange} 
                style={{ display: 'none' }} // إخفاء إدخال الصورة
              />
            </div>
          </div>
        </div>
        <div className="icon-container d-flex justify-content-end">
          <div className="icon"><Link to={'/'}> <IoWalletOutline /></Link> </div>  
          <div className="icon"><Link to={'/'}> <IoWalletOutline /></Link></div> 
        </div>
      </div>
    </div>
  );
}


export default Profile;