import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import ThemeToggle from './ThemeToggle';
import { useState } from 'react';

const Navbar = () => {
    const { darkMode } = useTheme();
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => setMenuOpen(!menuOpen);
    const closeMenu = () => setMenuOpen(false);

    return (
        <>
            {/* Top Navbar */}
            <nav className={`p-4 ${darkMode ? 'bg-gray-800 text-white' : 'bg-blue-600 text-white'}`}>
                <div className="container mx-auto flex justify-between items-center">
                    <Link to="/" className="text-xl font-bold">Loan Calculator</Link>

                    {/* Toggle button for mobile */}
                    <button
                        onClick={toggleMenu}
                        className="md:hidden focus:outline-none"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            {menuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-4 items-center">
                        <Link to="/" className="hover:underline">HOME</Link>
                        <Link to="/exchange-rates" className="hover:underline">EXCHANGE RATES (LIVE)</Link>
                        <Link to="/about" className="hover:underline">ABOUT</Link>
                        <ThemeToggle />
                    </div>
                </div>
            </nav>

            {/* Mobile Sidebar (Offcanvas) */}
            <div
                className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white transform ${menuOpen ? 'translate-x-0' : '-translate-x-full'
                    } transition-transform duration-300 ease-in-out z-50 md:hidden`}
            >
                <div className="p-4 flex justify-between items-center border-b border-gray-700">
                    <span className="text-lg font-semibold">Menu</span>
                    <button onClick={closeMenu}>
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="flex flex-col space-y-4 mt-4 px-4">
                    <Link to="/" onClick={closeMenu} className="hover:underline">HOME</Link>
                    <Link to="/exchange-rates" onClick={closeMenu} className="hover:underline">EXCHANGE RATES (LIVE)</Link>
                    <Link to="/about" onClick={closeMenu} className="hover:underline">ABOUT</Link>
                    <div className="mt-2">
                        <ThemeToggle />
                    </div>
                </div>
            </div>

            {/* Overlay when menu is open */}
            {menuOpen && (
                <div
                    className="fixed inset-0 bg-black opacity-50 z-40 md:hidden"
                    onClick={closeMenu}
                />
            )}
        </>
    );
};

export default Navbar;
