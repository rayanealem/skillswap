import React from 'react';
import { motion } from 'framer-motion';

const AuthHeader = ({ activeMode }) => {
  return (
    <div className="text-center mb-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-gradient mb-2">
          {activeMode === 'login' ? 'Welcome Back!' : 'Join SkillSwap'}
        </h1>
        <p className="text-secondary text-base">
          {activeMode === 'login' ?'Sign in to continue your skill-sharing journey' :'Start sharing and learning skills with fellow students'
          }
        </p>
      </motion.div>
    </div>
  );
};

export default AuthHeader;