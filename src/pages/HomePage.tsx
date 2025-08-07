import React from 'react';
import { useNavigate } from 'react-router-dom';
import LandingPage from '../components/LandingPage';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleEnterChat = () => {
    navigate('/chat');
  };

  return <LandingPage onEnter={handleEnterChat} />;
};

export default HomePage; 