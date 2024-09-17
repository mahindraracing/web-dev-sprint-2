import { useState, useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeContext'; 
import { Select, SelectItem, SelectTrigger, SelectContent, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const languageOptions = [
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Spanish' },
  { value: 'pt', label: 'Portuguese' },
];

export default function SettingsPage() {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState('account');
  const [language, setLanguage] = useState('en');
  const [profileName, setProfileName] = useState('');
  const [email, setEmail] = useState('');
  const [notifications, setNotifications] = useState(true);
  const [currentPassword, setCurrentPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null); 

  useEffect(() => {
    const storedName = sessionStorage.getItem('profileName') || '';
    const storedEmail = sessionStorage.getItem('email') || '';
    const storedPassword = sessionStorage.getItem('password') || '';
    const storedPicture = sessionStorage.getItem('profilePicture') || '';

    setProfileName(storedName);
    setEmail(storedEmail);
    setCurrentPassword(storedPassword);
    setProfilePicture(storedPicture);
  }, []);

  const handleSave = () => {
    sessionStorage.setItem('profileName', profileName);
    sessionStorage.setItem('email', email);

    toast.success('Settings saved! Your settings have been updated successfully.');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={`container mx-auto py-8 px-4 max-w-3xl ${theme === 'light' ? 'bg-white text-gray-800' : 'bg-gray-900 text-gray-100'} rounded-lg shadow-md`}>
      <div className="mb-6 border-b border-gray-300">
        <div className="flex space-x-4">
          <button
            onClick={() => setActiveTab('account')}
            className={`py-2 px-4 text-sm font-medium rounded-t-md ${activeTab === 'account' ? 'bg-red-600 text-white' : 'text-gray-600 hover:bg-red-50'} transition`}
          >
            Account
          </button>
          <button
            onClick={() => setActiveTab('notifications')}
            className={`py-2 px-4 text-sm font-medium rounded-t-md ${activeTab === 'notifications' ? 'bg-red-600 text-white' : 'text-gray-600 hover:bg-red-50'} transition`}
          >
            Notifications
          </button>
          <button
            onClick={() => setActiveTab('theme')}
            className={`py-2 px-4 text-sm font-medium rounded-t-md ${activeTab === 'theme' ? 'bg-red-600 text-white' : 'text-gray-600 hover:bg-red-50'} transition`}
          >
            Theme
          </button>
        </div>
      </div>

      {activeTab === 'account' && (
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-red-600">Account Settings</h2>
          <div className="space-y-6">
            <div className="flex flex-col items-center">
              {profilePicture && (
                <img
                  src={profilePicture}
                  alt="Profile"
                  className="w-24 h-24 rounded-full border border-red-500 object-cover mb-4"
                />
              )}
              <div>
                <Label htmlFor="profilePicture" className="text-lg font-medium text-gray-700">Change Profile Picture</Label>
                <input
                  id="profilePicture"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        const base64String = reader.result;
                        sessionStorage.setItem('profilePicture', base64String);
                        setProfilePicture(base64String);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="mt-1 block w-full text-sm text-gray-500 file:py-2 file:px-4 file:border file:border-red-500 file:rounded-md file:text-sm file:font-medium file:bg-red-50 file:text-gray-700 hover:file:bg-red-100"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="profileName" className="text-lg font-medium text-gray-700">Name</Label>
              <Input
                id="profileName"
                value={profileName}
                onChange={(e) => setProfileName(e.target.value)}
                placeholder="Enter your name"
                className="mt-1 p-3 border  rounded-md shadow-sm focus:ring-2 focus:ring-red-500"
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
                className="mt-1 p-3 border  rounded-md shadow-sm focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div>
              <Label htmlFor="language" className="text-lg font-medium text-gray-700">Language</Label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="border ">
                  <SelectValue placeholder="Select a language" />
                </SelectTrigger>
                <SelectContent className="border ">
                  {languageOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="currentPassword" className="text-lg font-medium text-gray-700">Current Password</Label>
              <div className="relative">
                <Input
                  id="currentPassword"
                  type={showPassword ? 'text' : 'password'}
                  value={currentPassword}
                  readOnly
                  placeholder="Your current password"
                  className="mt-1 p-3 border  rounded-md shadow-sm focus:ring-2 focus:ring-red-500"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 flex items-center px-3"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3a9 9 0 00-9 9 9 9 0 009 9 9 9 0 009-9 9 9 0 00-9-9zM12 13a1 1 0 01-1-1 1 1 0 011-1 1 1 0 011 1 1 1 0 01-1 1zm0-6a4 4 0 00-4 4 4 4 0 004 4 4 4 0 004-4 4 4 0 00-4-4z"></path>
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8a4 4 0 00-4 4 4 4 0 004 4 4 4 0 004-4 4 4 0 00-4-4zM12 3a9 9 0 00-9 9 9 9 0 009 9 9 9 0 009-9 9 9 0 00-9-9z"></path>
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {activeTab === 'notifications' && (
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-red-600">Notification Settings</h2>
          <div className="flex items-center">
            <input
              id="notifications"
              type="checkbox"
              checked={notifications}
              onChange={() => setNotifications(!notifications)}
              className="mr-2"
            />
            <label htmlFor="notifications">Enable notifications</label>
          </div>
        </section>
      )}

      {activeTab === 'theme' && (
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-red-600">Theme Settings</h2>
          <div className="space-y-4">
            <div>
              <h1>In Production</h1>
            </div>
          </div>
        </section>
      )}

      <div className="flex justify-end mt-6">
        <Button onClick={handleSave} className="bg-red-600 text-white hover:bg-red-700 transition">
          Save Changes
        </Button>
      </div>

      <ToastContainer />
    </div>
  );
}
