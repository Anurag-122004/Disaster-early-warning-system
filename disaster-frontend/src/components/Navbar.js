import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="bg-blue-600 p-4 shadow-md">
            <div className="flex justify-between items-center max-w-6xl mx-auto">
                <h1 className="text-white text-2xl font-bold">DEWS</h1>
                <div>
                    <Link to="/" className="text-white mx-2 hover:underline">Home</Link>
                    <Link to="/about" className="text-white mx-2 hover:underline">About</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
