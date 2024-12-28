import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RealTimeUpdates = () => {
    // eslint-disable-next-line
    const [disasters, setDisasters] = useState({});
    const [uniqueUpdates, setUniqueUpdates] = useState(new Set());

    useEffect(() => {
        const socket = new WebSocket('ws://localhost:5000');

        socket.onopen = () => {
            console.log('WebSocket connection established');
        };

        socket.onmessage = (event) => {
            try {
                let data;

                // Check if the message is valid JSON
                try {
                    data = JSON.parse(event.data);
                } catch (error) {
                    console.warn('Non-JSON message received:', event.data);
                    return; // Skip non-JSON messages
                }

                // Validate data structure
                if (data.type && data.location && data.severity) {
                    const updateKey = `${data.type}-${data.location}-${data.severity}`;

                    if (!uniqueUpdates.has(updateKey)) {
                        setDisasters((prevDisasters) => ({
                            ...prevDisasters,
                            [data.location]: data,
                        }));

                        // Show toast notification
                        toast.info(`New update: ${data.type} in ${data.location} with severity ${data.severity}`);

                        // Add the update to the set of unique updates
                        setUniqueUpdates((prevUpdates) => new Set(prevUpdates).add(updateKey));
                    }
                }
            } catch (error) {
                console.error('Error parsing WebSocket message:', error);
            }
        };

        socket.onclose = () => {
            console.log('WebSocket connection closed');
        };

        return () => {
            socket.close();
        };
    }, [uniqueUpdates]);

    return (
        <div>
            <ToastContainer />
            {/* Render your real-time updates here */}
        </div>
    );
};

export default RealTimeUpdates;
