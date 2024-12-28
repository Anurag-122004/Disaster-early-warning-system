import React from 'react';

const AboutPage = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8">
            <h1 className="text-3xl font-bold text-blue-600 mb-6">About This Project</h1>
            <p className="text-gray-700 text-lg text-center max-w-2xl">
                This Disaster Early Warning System provides real-time updates on natural
                disasters using modern technologies like WebSockets and APIs. <br/>
                Created by <a href="https://www.linkedin.com/in/anurag-kaushik-12176624b/"><strong>Anurag Kaushik</strong></a>.
            </p>
        </div>
    );
};

export default AboutPage;
