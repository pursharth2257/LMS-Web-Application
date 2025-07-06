import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { ThemeContext } from '../../contexts/ThemeContext';
import Certificates from './Certificates'; 

const Dashboard = () => {
  const { theme } = useContext(ThemeContext);
  const [activeTab, setActiveTab] = useState('badges');
  const [student, setStudent] = useState(null);
  const [showAllTargets, setShowAllTargets] = useState(false);

  // Debug theme on mount and theme change
  useEffect(() => {
    console.log('Dashboard: Current theme:', theme);
    console.log('Dashboard: Document classes:', document.documentElement.classList.toString());
  }, [theme]);

  // Fetch student data on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('Token');
      if (!token) {
        console.log('Authentication required. Please log in.');
        return;
      }

      try {
        const res = await axios.get('https://new-lms-backend-vmgr.onrender.com/api/v1/students/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStudent(res.data.data);
      } catch (err) {
        console.error('Unable to retrieve profile data:', err);
      }
    };

    fetchProfile();
  }, []);

  const recentlyEarnedBadges = [
    { name: 'Warrior', description: 'Badge for completing first course', date: 'Aug 24, 2024', icon: '🛡️' },
    { name: 'Ace', description: 'Badge for completing 25 quiz resources', date: 'Aug 17, 2024', icon: '🎯' },
    { name: 'Duelist', description: 'Badge for completing first quiz resource', date: 'Aug 17, 2024', icon: '⚔️' },
    { name: 'The Fledgling', description: 'Badge for registering on Wingspan platform', date: 'Aug 6, 2024', icon: '🐣' },
  ];

  const nextTargets = [
    { name: 'Management Jedi', description: 'Badge for completing the MBA management HBP courses', icon: '🏹' },
    { name: 'Quizzer', description: 'Badge for completing 100 quiz resources', icon: '❓' },
    { name: 'Champion', description: 'Badge for completing 25 courses', icon: '🏆' },
    { name: 'Knight', description: 'Badge for completing 10 courses', icon: '⚔️' },
    { name: 'Sensei', description: 'Badge for completing 100 courses', icon: '👨‍🏫' },
    { name: 'Wizard', description: 'Badge for completing 250 quiz resources', icon: '🎩' },
    { name: 'Genie', description: 'Badge for completing 100 quiz resources', icon: '🧞' },
  ];

  const handleViewToggle = () => {
    setShowAllTargets(!showAllTargets);
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'
      }`}
    >
      {/* Tabs */}
      <div
        className={`flex justify-center mb-4 p-2 rounded-t-lg ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        }`}
      >
        <div className="flex w-full">
          <button
            className={`flex-1 px-4 py-2 rounded-t-lg ${
              activeTab === 'badges'
                ? 'bg-blue-400 text-white'
                : theme === 'dark'
                ? 'bg-gray-700 text-gray-300'
                : 'bg-gray-200 text-gray-700'
            }`}
            onClick={() => setActiveTab('badges')}
          >
            Badges
          </button>
          <button
            className={`flex-1 px-4 py-2 rounded-t-lg ${
              activeTab === 'certificates'
                ? 'bg-blue-400 text-white'
                : theme === 'dark'
                ? 'bg-gray-700 text-gray-300'
                : 'bg-gray-200 text-gray-700'
            }`}
            onClick={() => setActiveTab('certificates')}
          >
            Certificates
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-6">
        {activeTab === 'badges' && (
          <>
            {/* Header Section */}
            <div className="mb-6">
              <h2
                className={`text-xl font-semibold ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}
              >
                Hi {student?.firstName || 'User'}!
              </h2>
              <p
                className={`text-lg ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                Congratulations for your recently earned badges
              </p>
            </div>

            {/* Recently Earned Badges Section */}
            <div className="mb-8">
              <h3
                className={`text-lg font-medium mb-4 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}
              >
                Recently earned badges
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {recentlyEarnedBadges.map((badge, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg shadow-sm border ${
                      theme === 'dark'
                        ? 'bg-gray-800 border-gray-700'
                        : 'bg-white border-gray-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${
                            theme === 'dark' ? 'bg-gray-600' : 'bg-gray-200'
                          }`}
                        >
                          {badge.icon}
                        </div>
                        <div className="ml-3">
                          <p
                            className={`text-sm ${
                              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                            }`}
                          >
                            Awarded on {badge.date}
                          </p>
                          <p
                            className={`text-sm font-medium ${
                              theme === 'dark' ? 'text-purple-400' : 'text-purple-600'
                            }`}
                          >
                            {badge.name} {badge.description}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`text-sm ${
                          theme === 'dark' ? 'text-purple-400' : 'text-purple-600'
                        }`}
                      >
                        ✔
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Next Target Section */}
            <div>
              <h3
                className={`text-lg font-medium mb-4 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}
              >
                Your Next Target
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {nextTargets.slice(0, showAllTargets ? nextTargets.length : 4).map((target, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg shadow-sm border ${
                      theme === 'dark'
                        ? 'bg-gray-800 border-gray-700'
                        : 'bg-white border-gray-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${
                            theme === 'dark' ? 'bg-gray-600' : 'bg-gray-200'
                          }`}
                        >
                          {target.icon}
                        </div>
                        <div className="ml-3">
                          <p
                            className={`text-sm ${
                              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                            }`}
                          >
                            {target.name}
                          </p>
                          <p
                            className={`text-sm font-medium ${
                              theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                            }`}
                          >
                            {target.description}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`text-sm ${
                          theme === 'dark' ? 'text-green-400' : 'text-green-600'
                        }`}
                      >
                        ✔
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <button
                className={`mt-4 px-4 py-2 rounded-full hover:${
                  theme === 'dark' ? 'bg-gray-600' : 'bg-gray-300'
                } ${
                  theme === 'dark'
                    ? 'bg-gray-700 text-gray-300'
                    : 'bg-gray-200 text-gray-700'
                }`}
                onClick={handleViewToggle}
              >
                {showAllTargets ? 'View Less' : 'View More'}
              </button>
            </div>
          </>
        )}

        {activeTab === 'certificates' && <Certificates />}
      </div>
    </div>
  );
};

export default Dashboard;