import { Moon, Sun } from 'lucide-react'
import { cn } from '../lib/utils';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
    const { isDarkMode, toggleTheme } = useTheme();
    
  return (
     
    
      <button onClick={toggleTheme} className={cn('fixed top-5 right-5 z-50 p-2 rounded-full transition-colors duration-300',
        'focus:outline-hidden'
      )}> 
        {isDarkMode ? (<Sun className='h-6 w-6 text-yellow-300'/>
        ) : (
        <Moon className='h-6 w-6 text-blue-900'/>)} 
      </button>
    
  )
}

export default ThemeToggle
