import React from 'react'
import { useTheme } from '../context/ThemeContext'

const LogoImage = () => {
    const {isDarkMode} = useTheme();
  return (
    <img           
          src={isDarkMode ? "/devVerse.png" : "/devVerseLightThemeImage.png"} 
          alt="" />
  )
}

export default LogoImage
