
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

function VisitorCounter() {
    const [visitCount, setVisitCount] = useState(0);

    useEffect(() => {
        const storedCount = localStorage.getItem("visitCount");
        if (storedCount) {
            setVisitCount(parseInt(storedCount) + 1);
        } else {
            setVisitCount(1);
        }

        localStorage.setItem("visitCount", visitCount + 1);
    }, []);

    return (
        <div className="bg-blue-100 py-16 text-center">

            <div className="max-w-4xl mx-auto px-4">
                <p className="text-3xl md:text-5xl font-bold text-blue-600">Welcome to Our Website!</p>
                <p className="text-xl md:text-2xl font-light text-gray-700 mt-2">Thank you for visiting 🚀</p>
            </div>
            <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="mt-10 bg-white shadow-lg rounded-lg p-8 w-60 mx-auto border border-gray-300"
            >
                <p className="text-gray-600 text-lg font-medium">Total Visitors:</p>
                <motion.h1 
                    key={visitCount}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-5xl font-bold text-blue-600 mt-2"
                >
                    {visitCount}
                </motion.h1>
            </motion.div>
        </div>
    );
}

export default VisitorCounter;
