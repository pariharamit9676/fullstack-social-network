import React, { useState } from 'react';
import axios from 'axios';
import { FaCamera } from 'react-icons/fa';
import OtpInput from '../components/Otp/OtpInput';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
  });
  const [profilePic, setProfilePic] = useState(null);
  const [coverPic, setCoverPic] = useState(null);

  const navigate = useNavigate()

  const handleChange = (e) => {
    setError('');
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendOtp = async () => {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await axios.post('http://localhost:3000/api/auth/send-otp', { email: formData.email });

      if (response.status === 200) {
        setSuccess('OTP sent successfully! Check your email.');
        setStep(2);
      } else {
        throw new Error('Failed to send OTP. Try again.');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to send OTP.');
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async (otp) => {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const res = await axios.post('http://localhost:3000/api/auth/register', {
        ...formData,
        otp,

      });

      if (res.data.success === true) {
        setSuccess(res.data.message);
        setStep(3);
      } else {
        throw new Error('Invalid OTP. Try again.');
      }
    } catch (error) {
      console.log(error);
      setError(error.response?.data?.error || 'OTP verification failed.');
    } finally {
      setLoading(false);
    }
  };


  async function UploadPictures(){
   
    const formDataWithImages = new FormData()
    formDataWithImages.append("profilePic", profilePic)
    formDataWithImages.append("coverPic", coverPic)
    formDataWithImages.append("email", formData.email)
    try{
        const res = await axios.post("http://localhost:3000/api/auth/upload", formDataWithImages, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
        
        navigate("/login")
    } catch(error)
    {
        console.log("Error",error)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-4 rounded shadow-lg w-96">
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        {success && <p className="text-green-500 text-sm mb-2">{success}</p>}

        {step === 1 && (
          <>
            <h2 className="text-2xl font-bold mb-4">Register</h2>
            <input name="name" type="text" placeholder="Full Name" onChange={handleChange} className="border p-2 w-full mb-2" />
            <input name="username" type="text" placeholder="Username" onChange={handleChange} className="border p-2 w-full mb-2" />
            <input name="email" type="email" placeholder="Email" onChange={handleChange} className="border p-2 w-full mb-2" />
            <input name="password" type="password" placeholder="Password" onChange={handleChange} className="border p-2 w-full mb-2" />
            <button onClick={sendOtp} className="bg-blue-500 text-white py-2 w-full" disabled={loading}>
              {loading ? 'Sending OTP...' : 'Send OTP'}
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <OtpInput length={6} onVerify={verifyOtp} loading={loading}/>
          </>
        )}

        {step === 3 && (
          <div className="w-full max-w-lg mx-auto mt-10 border rounded-lg overflow-hidden shadow-lg bg-white p-4">
            <div className="relative w-full h-40 bg-gray-200">
              {coverPic ? (
                <img src={URL.createObjectURL(coverPic)} alt="Cover" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  <FaCamera size={30} />
                </div>
              )}
              <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => setCoverPic(e.target.files[0])} />
            </div>

            <div className="relative flex justify-center -mt-12">
              <div className="w-24 h-24 border-4 border-white rounded-full overflow-hidden relative bg-gray-200">
                {profilePic ? (
                  <img src={URL.createObjectURL(profilePic)} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500">
                    <FaCamera size={24} />
                  </div>
                )}
                <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => setProfilePic(e.target.files[0])} />
              </div>
            </div>

            <div className="flex justify-between mt-6">
              <button className="px-4 py-2 bg-gray-400 text-white rounded" onClick={() => navigate('/login')} disabled={loading}>
                Skip
              </button>
              {(coverPic || profilePic) && (
                <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={UploadPictures} disabled={loading}>
                  {loading ? 'Registering...' : 'Next'}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;
