import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profilePicture, setProfilePicture] = useState(null); 
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result); 
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRegister = () => {
    if (name.trim() === '' || email.trim() === '' || password === '' || confirmPassword === '') {
      alert('Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    sessionStorage.setItem('profileName', name);
    sessionStorage.setItem('email', email);
    sessionStorage.setItem('password', password);
    if (profilePicture) {
      sessionStorage.setItem('profilePicture', profilePicture); 
    }

    navigate('/settings');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg border border-gray-200">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Register</h1>
        <div className="space-y-6">
          <div>
            <Label htmlFor="name" className="text-lg font-medium text-gray-700">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="mt-1 p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <Label htmlFor="email" className="text-lg font-medium text-gray-700">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="mt-1 p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <Label htmlFor="password" className="text-lg font-medium text-gray-700">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="mt-1 p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <Label htmlFor="confirmPassword" className="text-lg font-medium text-gray-700">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              className="mt-1 p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <Label htmlFor="profilePicture" className="text-lg font-medium text-gray-700">Profile Picture</Label>
            <input
              id="profilePicture"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="mt-1 block w-full text-sm text-gray-500 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded-md file:text-sm file:font-medium file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
            />
            {profilePicture && (
              <div className="mt-4 flex justify-center">
                <img
                  src={profilePicture}
                  alt="Profile Preview"
                  className="w-32 h-32 object-cover rounded-full border border-gray-300 shadow-md"
                />
              </div>
            )}
          </div>
          <div className="flex justify-end">
            <Button onClick={handleRegister} className="bg-blue-600 text-white hover:bg-blue-700 transition duration-300 px-6 py-3 rounded-md">
              Register
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
