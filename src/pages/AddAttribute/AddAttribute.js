import React, { useState } from 'react';
import './AddAttribute.css';

const AddAttribute = () => {
    const [attributeName, setAttributeName] = useState('');
    const [attributeType, setAttributeType] = useState('text');
    const [options, setOptions] = useState([]);
    const [newOption, setNewOption] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleAddOption = () => {
        if (newOption.trim() === '') {
            setErrorMessage('Option cannot be empty');
            return;
        }
        if (options.includes(newOption.trim())) {
            setErrorMessage('Option already exists');
            return;
        }
        setOptions([...options, newOption.trim()]);
        setNewOption('');
        setErrorMessage('');
    };

    const handleRemoveOption = (index) => {
        const updatedOptions = options.filter((_, i) => i !== index);
        setOptions(updatedOptions);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!attributeName.trim()) {
            setErrorMessage('Attribute name is required');
            return;
        }

        if (attributeType === 'select' && options.length === 0) {
            setErrorMessage('At least one option is required for select type');
            return;
        }

        // Submit logic here (API call, etc.)
        const attributeData = {
            name: attributeName,
            type: attributeType,
            options: attributeType === 'select' ? options : null
        };

        console.log('Attribute Data:', attributeData);
        // Reset form
        setAttributeName('');
        setAttributeType('text');
        setOptions([]);
        setErrorMessage('');
        alert('Attribute added successfully!');
    };

    return (
        <div className="add-attribute-container">
            <h2>Add New Attribute</h2>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Attribute Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={attributeName}
                        onChange={(e) => setAttributeName(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Attribute Type</label>
                    <select
                        className="form-control"
                        value={attributeType}
                        onChange={(e) => setAttributeType(e.target.value)}
                    >
                        <option value="text">Text</option>
                        <option value="number">Number</option>
                        <option value="select">Select</option>
                    </select>
                </div>

                {attributeType === 'select' && (
                    <div className="dynamic-options">
                        <div className="form-group">
                            <label>Add Options</label>
                            <div className="option-item">
                                <input
                                    type="text"
                                    className="form-control"
                                    value={newOption}
                                    onChange={(e) => setNewOption(e.target.value)}
                                    placeholder="Enter option"
                                />
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={handleAddOption}
                                >
                                    Add Option
                                </button>
                            </div>
                        </div>

                        {options.length > 0 && (
                            <div className="form-group">
                                <label>Current Options</label>
                                {options.map((option, index) => (
                                    <div key={index} className="option-item">
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={option}
                                            readOnly
                                        />
                                        <button
                                            type="button"
                                            className="btn btn-danger"
                                            onClick={() => handleRemoveOption(index)}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                <button type="submit" className="btn btn-success">
                    Add Attribute
                </button>
            </form>
        </div>
    );
};

export default AddAttribute;