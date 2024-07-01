import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from '../utils/axiosconfig';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const getUserProfile = async (userId) => {
    try {
      const response = await axios.get(`/api/user/profile/${userId}`);
      setUser(response.data.profile);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post('/api/auth/login', { email, password });
      const { user } = response.data;
      await getUserProfile(user.id);
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const logout = async () => {
    try {
      await axios.get('/api/auth/logout');
      setUser(null);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const getUserStakes = async (userId) => {
    try {
      const response = await axios.get(`/api/staking/user-stakes/${userId}`);
      setUser(prev => ({ ...prev, stakes: response.data.stakes }));
    } catch (error) {
      console.error("Error fetching user stakes:", error);
    }
  };

  const stake = async (userId, nacAmount, daiAmount) => {
    try {
      await axios.post(`/api/staking/${userId}`, { nacAmount, daiAmount });
      await getUserProfile(userId);
    } catch (error) {
      console.error("Error staking:", error);
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get('/api/auth/check-auth');
        if (response.data.loggedIn) {
          await getUserProfile(response.data.user._id);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error checking authentication status:", error);
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const value = {
    user,
    login,
    logout,
    getUserProfile,
    getUserStakes,
    stake,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
