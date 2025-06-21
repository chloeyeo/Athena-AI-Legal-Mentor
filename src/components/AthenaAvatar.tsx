import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAccessibility } from '../contexts/AccessibilityContext';

interface AthenaAvatarProps {
  isActive: boolean;
  isSpeaking: boolean;
  currentMessage?: string;
}

export default function AthenaAvatar({ isActive, isSpeaking, currentMessage }: AthenaAvatarProps) {
  const [currentExpression, setCurrentExpression] = useState<'neutral' | 'speaking' | 'thinking'>('neutral');
  const [isSigningASL, setIsSigningASL] = useState(false);
  const { settings } = useAccessibility();

  useEffect(() => {
    if (isSpeaking) {
      setCurrentExpression('speaking');
      if (settings.signLanguage) {
        setIsSigningASL(true);
        // Stop signing after message duration
        const duration = (currentMessage?.length || 50) * 100;
        setTimeout(() => setIsSigningASL(false), duration);
      }
    } else {
      setCurrentExpression('neutral');
      setIsSigningASL(false);
    }
  }, [isSpeaking, currentMessage, settings.signLanguage]);

  // Sign language hand positions for different letters/concepts
  const getSignPosition = () => {
    if (!isSigningASL || !currentMessage) return { left: 0, right: 0 };
    
    const time = Date.now() / 500; // Slow down the signing
    const messageIndex = Math.floor(time) % currentMessage.length;
    const char = currentMessage[messageIndex]?.toLowerCase();
    
    // Simple ASL-inspired hand positions for different letters
    const positions: Record<string, { left: number; right: number }> = {
      'a': { left: -20, right: 20 },
      'b': { left: -10, right: 30 },
      'c': { left: -30, right: 10 },
      'h': { left: -15, right: 25 },
      'e': { left: -25, right: 15 },
      'l': { left: -5, right: 35 },
      'o': { left: -35, right: 5 },
      ' ': { left: 0, right: 0 }, // Pause
      default: { left: -10, right: 10 }
    };
    
    return positions[char] || positions.default;
  };

  const signPosition = getSignPosition();

  return (
    <div className="flex flex-col items-center justify-center h-full">
      {/* Avatar */}
      <motion.div
        className="relative"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Main avatar circle */}
        <motion.div
          className="w-48 h-48 rounded-full bg-gradient-to-br from-blue-400 via-purple-500 to-blue-600 flex items-center justify-center relative overflow-hidden"
          animate={{
            scale: isSpeaking ? [1, 1.05, 1] : 1,
          }}
          transition={{
            duration: 1.5,
            repeat: isSpeaking ? Infinity : 0,
            ease: "easeInOut"
          }}
        >
          {/* Face features */}
          <div className="absolute inset-4 rounded-full bg-gradient-to-br from-blue-300 to-purple-400 flex items-center justify-center">
            {/* Eyes */}
            <div className="absolute top-8 left-1/2 transform -translate-x-1/2 flex space-x-4">
              <motion.div
                className="w-3 h-3 bg-white rounded-full"
                animate={{
                  scaleY: currentExpression === 'speaking' ? [1, 0.3, 1] : 1,
                }}
                transition={{
                  duration: 0.3,
                  repeat: currentExpression === 'speaking' ? Infinity : 0,
                }}
              />
              <motion.div
                className="w-3 h-3 bg-white rounded-full"
                animate={{
                  scaleY: currentExpression === 'speaking' ? [1, 0.3, 1] : 1,
                }}
                transition={{
                  duration: 0.3,
                  repeat: currentExpression === 'speaking' ? Infinity : 0,
                }}
              />
            </div>

            {/* Mouth */}
            <motion.div
              className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
              animate={{
                scaleX: currentExpression === 'speaking' ? [1, 1.3, 0.8, 1] : 1,
                scaleY: currentExpression === 'speaking' ? [1, 0.8, 1.2, 1] : 1,
              }}
              transition={{
                duration: 0.5,
                repeat: currentExpression === 'speaking' ? Infinity : 0,
              }}
            >
              <div className="w-8 h-2 bg-white rounded-full" />
            </motion.div>

            {/* Sign Language Hands - Only show if sign language is enabled */}
            {settings.signLanguage && (
              <>
                {/* Left Hand */}
                <motion.div
                  className="absolute w-6 h-8 bg-blue-200 rounded-full"
                  style={{
                    left: '10%',
                    top: '60%',
                  }}
                  animate={{
                    x: isSigningASL ? signPosition.left : 0,
                    y: isSigningASL ? Math.sin(Date.now() / 300) * 10 : 0,
                    rotate: isSigningASL ? signPosition.left / 2 : 0,
                  }}
                  transition={{
                    duration: 0.3,
                    ease: "easeInOut"
                  }}
                />
                
                {/* Right Hand */}
                <motion.div
                  className="absolute w-6 h-8 bg-blue-200 rounded-full"
                  style={{
                    right: '10%',
                    top: '60%',
                  }}
                  animate={{
                    x: isSigningASL ? signPosition.right : 0,
                    y: isSigningASL ? Math.sin(Date.now() / 300 + Math.PI) * 10 : 0,
                    rotate: isSigningASL ? signPosition.right / 2 : 0,
                  }}
                  transition={{
                    duration: 0.3,
                    ease: "easeInOut"
                  }}
                />

                {/* Sign Language Indicator */}
                {isSigningASL && (
                  <motion.div
                    className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white/90 px-3 py-1 rounded-full text-xs font-medium text-gray-700"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    Signing in {settings.signLanguageType}
                  </motion.div>
                )}
              </>
            )}
          </div>

          {/* Animated particles around avatar */}
          {isActive && (
            <>
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-white/30 rounded-full"
                  style={{
                    left: '50%',
                    top: '50%',
                  }}
                  animate={{
                    x: [0, Math.cos(i * 60 * Math.PI / 180) * 80],
                    y: [0, Math.sin(i * 60 * Math.PI / 180) * 80],
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </>
          )}
        </motion.div>

        {/* Status indicator */}
        <motion.div
          className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-white rounded-full shadow-lg"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center space-x-2">
            <motion.div
              className="w-2 h-2 bg-green-500 rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [1, 0.5, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <span className="text-sm font-medium text-gray-700">
              {currentExpression === 'speaking' ? 
                (settings.signLanguage ? `Speaking & Signing (${settings.signLanguageType})` : 'Speaking...') : 
                'Listening'
              }
            </span>
          </div>
        </motion.div>
      </motion.div>

      {/* Name and title */}
      <motion.div
        className="text-center mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        <h2 className="text-3xl font-display font-bold text-white mb-2">Athena</h2>
        <p className="text-blue-200 text-lg">Your AI Legal Mentor</p>
        <p className="text-blue-300 text-sm mt-1">
          Powered by advanced AI • Zero hallucinations
          {settings.signLanguage && ` • ${settings.signLanguageType} Sign Language`}
        </p>
      </motion.div>
    </div>
  );
}