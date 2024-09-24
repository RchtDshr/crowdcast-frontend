import React from 'react';
import { X } from 'lucide-react';

const ConfirmAdModal = ({ onClose, onSubmit, priceData }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-3xl font-primary text-primary font-bold"> Publish Ad? </h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <X size={24} />
                    </button>
                </div>
                <div className="mb-4">
                    <h3 className="font-semibold mb-2">Credit deduction details:</h3>
                    {priceData.map((item, index) => (
                        <p key={index}>
                            {item.location} {item.gender} {item.ageGroupName} - Rs. {item.price}
                        </p>
                    ))}
                </div>
                <div className="flex justify-end">
                    <button
                        onClick={onClose}
                        className="mr-2 px-4 py-2 text-gray-600 border border-gray-300 rounded hover:bg-gray-100"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onSubmit}
                        className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark"
                    >
                        Confirm Publish
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmAdModal;