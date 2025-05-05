import { useTheme } from '../context/ThemeContext';
import { IconButton } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';

const ThemeToggle = () => {
    const { darkMode, toggleTheme } = useTheme();

    return (
        <IconButton onClick={toggleTheme} color="inherit">
            {darkMode ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
    );
};

export default ThemeToggle;