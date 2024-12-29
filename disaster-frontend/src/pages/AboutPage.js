import React from 'react';

const AboutPage = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center py-12">
            <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg flex flex-col md:flex-row overflow-hidden">
                {/* Left Section: Picture */}
                <div className="md:w-1/3 bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center p-6">
                    <img
                        src="/my_profile.jpg"
                        alt="Your Profile"
                        className="rounded-full w-40 h-40 md:w-48 md:h-48 object-cover border-4 border-white shadow-md -mt-10"
                    />
                </div>
                {/* Right Section: Project Details */}
                <div className="md:w-2/3 p-6">
                    <h2 className="text-3xl font-bold text-blue-600 mb-4">About the Project</h2>
                    <p className="text-gray-700 mb-4">
                        Project, Smart Disaster Early Warning System by <strong>Anurag Kaushik</strong> designed to provide real-time updates and
                        notifications about disasters across various regions. It uses WebSocket for real-time communication and features
                        an intuitive UI built with React and Tailwind CSS.
                    </p>
                    <h3 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">Tech Stack</h3>
                    <ul className="list-disc list-inside text-gray-700">
                        <li>Frontend: React, Tailwind CSS</li>
                        <li>Backend: Node.js, WebSocket</li>
                    </ul>
                    <h3 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">Features</h3>
                    <ul className="list-disc list-inside text-gray-700">
                        <li>Real-time disaster notifications</li>
                        <li>Responsive design for all screen sizes</li>
                        <li>Integrated API for fetching disaster summaries</li>
                    </ul>
                    <h3 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">APIs Used</h3>
                    <p className="text-gray-700">
                        The project fetches disaster data from a dedicated REST API and leverages WebSocket for real-time updates. 
                        The API provides comprehensive information such as disaster type, state, and declaration date.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
