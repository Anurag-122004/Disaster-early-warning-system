import React, { useState, useEffect } from 'react';
import { fetchDisasters } from '../services/apiService';
import RealTimeUpdates from '../components/RealTimeUpdates';
import './HomePage.css'; // Import the CSS file for animations

const HomePage = () => {
    const [disasters, setDisasters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredDisasters, setFilteredDisasters] = useState([]);
    const [noMatches, setNoMatches] = useState(false);

    useEffect(() => {
        const getDisasters = async () => {
            try {
                const data = await fetchDisasters();
                setDisasters(data.DisasterDeclarationsSummaries || []);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching disasters:', error);
                setLoading(false);
            }
        };
        getDisasters();
    }, []);

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const data = await fetchDisasters();
            if (searchTerm.trim() === '') {
                setFilteredDisasters([]);
                setNoMatches(false);
            } else {
                const results = data.DisasterDeclarationsSummaries.filter(disaster =>
                    disaster.state.toLowerCase() === searchTerm.toLowerCase()
                );
                setFilteredDisasters(results);
                setNoMatches(results.length === 0);
            }
            setLoading(false);
        } catch (error) {
            console.error('Error fetching disasters:', error);
            setLoading(false);
        }
    };

    const displayedDisasters = searchTerm.trim() ? filteredDisasters : disasters.slice(0, 10);

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8">
            <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">
                Smart Disaster Early Warning System
            </h1>

            {/* Search section */}
            <form onSubmit={handleSearch} className="mb-8">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        if (e.target.value.trim() === '') {
                            setFilteredDisasters([]);
                            setNoMatches(false);
                        }
                    }}
                    placeholder="Search by state code (e.g., OR, NV)"
                    className="p-2 border border-gray-300 rounded-md"
                />
                <button type="submit" className="ml-2 p-2 bg-blue-600 text-white rounded-md">
                    Search
                </button>
            </form>

            {/* Real-time updates section */}
            <div className="w-full max-w-5xl mb-8">
                <RealTimeUpdates />
            </div>

            {/* Disaster list */}
            {loading ? (
                <p className="text-center text-gray-500 text-lg">Loading...</p>
            ) : noMatches ? (
                <div className="safe-city-animation">
                    Safe City
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-11/12">
                    {displayedDisasters.map((disaster, index) => (
                        <div
                            key={`${disaster.disasterNumber}-${disaster.declarationDate}-${index}`}
                            className="group bg-gradient-to-r from-blue-100 to-blue-200 p-6 shadow-md rounded-md transition-transform transform hover:scale-105 hover:shadow-lg"
                        >
                            <h2 className="text-xl font-semibold text-gray-800 mb-2">
                                {disaster.title}
                            </h2>
                            <p className="text-gray-700">
                                <strong>Type:</strong> {disaster.incidentType}
                            </p>
                            <p className="text-gray-700">
                                <strong>State:</strong> {disaster.state}
                            </p>
                            <p className="text-gray-700">
                                <strong>Date:</strong>{' '}
                                {new Date(disaster.declarationDate).toLocaleDateString()}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default HomePage;