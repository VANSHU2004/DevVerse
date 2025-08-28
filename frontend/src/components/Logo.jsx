
import React, { useEffect, useState } from 'react'
import { useTheme } from '../context/ThemeContext';
import DarkLogo from '../assets/DevVerseLogo.png';
import LightLogo from '../assets/devVerseLightTheme.png';

const Logo = () => {
    const {isDarkMode} = useTheme();

  return (
    <div className='absolute top-0 left-0 p-4 h-23 w-23 z-50 overflow-hidden'>
      <img
      className='h-full w-full object-cover rounded-full'
      src={isDarkMode ? DarkLogo : LightLogo} 
      alt="DevVerse Logo"
      />
    </div>
  )
}

export default Logo
