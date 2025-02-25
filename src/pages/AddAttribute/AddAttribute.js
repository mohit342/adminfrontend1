import React, { useState } from "react";
import './AddAttribute.css';

const AddAttribute = () => {
    const [attributeName, setAttributeName] = useState("");
    const [attributeValue, setAttributeValue] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        
        try {
            const response = await fetch('http://localhost:5000/api/attributes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    attributeName,
                    attributeValue,
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            
            if (data.success) {
                setSuccess("Attribute saved successfully!");
                setAttributeName('');
                setAttributeValue('');
            } else {
                setError(data.message || "Failed to save attribute");
            }
        } catch (error) {
            console.error('Error saving attribute:', error);
            setError("Failed to save attribute. Please try again.");
        }
    };

    return (
        <div className="container">
            <h2 className="title">Add Attribute</h2>
            
            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}
            
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Attribute name</label>
                        <input
                            type="text"
                            placeholder="Attribute name"
                            value={attributeName}
                            onChange={(e) => setAttributeName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Attribute value</label>
                        <input
                            type="text"
                            placeholder="Attribute value"
                            value={attributeValue}
                            onChange={(e) => setAttributeValue(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="save-btn">
                        Save
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddAttribute;