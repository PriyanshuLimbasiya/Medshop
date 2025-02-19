import React, { useState, useEffect } from 'react';

const PreLoader = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate loading completion after content is ready
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1500); // Adjust time as needed

        return () => clearTimeout(timer);
    }, []);

    if (!isLoading) return null;

    return (
        <div className="fixed inset-0 bg-gray-50 flex flex-col items-center justify-center z-50">
            {/* Medical Cross */}
            <div className="w-20 h-20 relative animate-pulse">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                    <rect
                        x="40"
                        y="20"
                        width="20"
                        height="60"
                        fill="#e53e3e"
                        rx="4"
                        className="animate-pulse"
                    />
                    <rect
                        x="20"
                        y="40"
                        width="60"
                        height="20"
                        fill="#e53e3e"
                        rx="4"
                        className="animate-pulse"
                    />
                </svg>
            </div>

            {/* Loading Text */}
            <div className="mt-6 text-gray-700 text-lg font-medium">
                Loading your medical shop
                <span className="animate-pulse">...</span>
            </div>
        </div>
    );
};

export default PreLoader;