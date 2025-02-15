import React, { useState } from 'react';
import './AttributePage.css';
import { FaEdit, FaTrash } from 'react-icons/fa';

const AttributePage = () => {
    const [attributes, setAttributes] = useState([
        { id: 1, name: 'Color', type: 'select', options: ['Red', 'Blue', 'Green'] },
        { id: 2, name: 'Size', type: 'select', options: ['S', 'M', 'L'] },
    ]);
    
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedAttribute, setSelectedAttribute] = useState(null);
    const [error, setError] = useState('');
    
    // Add Attribute State
    const [newAttribute, setNewAttribute] = useState({
        name: '',
        type: 'text',
        options: []
    });
    const [newOption, setNewOption] = useState('');

    // Edit Attribute State
    const [editAttribute, setEditAttribute] = useState({
        name: '',
        type: 'text',
        options: []
    });
    const [editOption, setEditOption] = useState('');

    const handleAddAttribute = () => {
        if (!newAttribute.name.trim()) {
            setError('Attribute name is required');
            return;
        }

        if (newAttribute.type === 'select' && newAttribute.options.length === 0) {
            setError('At least one option is required for select type');
            return;
        }

        const newAttr = {
            id: attributes.length + 1,
            ...newAttribute
        };

        setAttributes([...attributes, newAttr]);
        setShowAddModal(false);
        resetForm();
    };

    const handleEditAttribute = () => {
        if (!editAttribute.name.trim()) {
            setError('Attribute name is required');
            return;
        }

        const updatedAttributes = attributes.map(attr =>
            attr.id === selectedAttribute.id ? { ...editAttribute, id: selectedAttribute.id } : attr
        );

        setAttributes(updatedAttributes);
        setShowEditModal(false);
        resetForm();
    };

    const handleDelete = (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this attribute?');
        if (confirmDelete) {
            setAttributes(attributes.filter(attr => attr.id !== id));
        }
    };

    const resetForm = () => {
        setNewAttribute({ name: '', type: 'text', options: [] });
        setEditAttribute({ name: '', type: 'text', options: [] });
        setNewOption('');
        setEditOption('');
        setError('');
    };

    const openEditModal = (attribute) => {
        setSelectedAttribute(attribute);
        setEditAttribute(attribute);
        setShowEditModal(true);
    };

    const handleAddOption = (type) => {
        const option = type === 'add' ? newOption : editOption;
        const options = type === 'add' ? newAttribute.options : editAttribute.options;

        if (!option.trim()) {
            setError('Option cannot be empty');
            return;
        }

        if (options.includes(option)) {
            setError('Option already exists');
            return;
        }

        if (type === 'add') {
            setNewAttribute({ ...newAttribute, options: [...newAttribute.options, option] });
            setNewOption('');
        } else {
            setEditAttribute({ ...editAttribute, options: [...editAttribute.options, option] });
            setEditOption('');
        }
        setError('');
    };

    const handleRemoveOption = (index, type) => {
        if (type === 'add') {
            setNewAttribute({
                ...newAttribute,
                options: newAttribute.options.filter((_, i) => i !== index)
            });
        } else {
            setEditAttribute({
                ...editAttribute,
                options: editAttribute.options.filter((_, i) => i !== index)
            });
        }
    };

    return (
        <div className="attribute-container">
            <div className="attribute-header">
                <h2>Manage Attributes</h2>
                <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
                    Add New Attribute
                </button>
            </div>

            <table className="attribute-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Options</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {attributes.map((attribute) => (
                        <tr key={attribute.id}>
                            <td>{attribute.id}</td>
                            <td>{attribute.name}</td>
                            <td>{attribute.type}</td>
                            <td>
                                {attribute.type === 'select' && attribute.options.join(', ')}
                            </td>
                            <td>
                                <button
                                    className="btn btn-primary"
                                    onClick={() => openEditModal(attribute)}
                                >
                                    <FaEdit />
                                </button>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => handleDelete(attribute.id)}
                                >
                                    <FaTrash />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Add Attribute Modal */}
            {showAddModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button className="close-button" onClick={() => setShowAddModal(false)}>
                            &times;
                        </button>
                        <h3>Add New Attribute</h3>
                        {error && <div className="error-message">{error}</div>}
                        
                        <div className="form-group">
                            <label>Attribute Name</label>
                            <input
                                type="text"
                                className="form-control"
                                value={newAttribute.name}
                                onChange={(e) => setNewAttribute({ ...newAttribute, name: e.target.value })}
                            />
                        </div>

                        <div className="form-group">
                            <label>Attribute Type</label>
                            <select
                                className="form-control"
                                value={newAttribute.type}
                                onChange={(e) => setNewAttribute({ ...newAttribute, type: e.target.value })}
                            >
                                <option value="text">Text</option>
                                <option value="number">Number</option>
                                <option value="select">Select</option>
                            </select>
                        </div>

                        {newAttribute.type === 'select' && (
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
                                        onClick={() => handleAddOption('add')}
                                    >
                                        Add
                                    </button>
                                </div>

                                {newAttribute.options.map((option, index) => (
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
                                            onClick={() => handleRemoveOption(index, 'add')}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                        <button
                            className="btn btn-success"
                            style={{ marginTop: '20px' }}
                            onClick={handleAddAttribute}
                        >
                            Add Attribute
                        </button>
                    </div>
                </div>
            )}

            {/* Edit Attribute Modal */}
            {showEditModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button className="close-button" onClick={() => setShowEditModal(false)}>
                            &times;
                        </button>
                        <h3>Edit Attribute</h3>
                        {error && <div className="error-message">{error}</div>}
                        
                        <div className="form-group">
                            <label>Attribute Name</label>
                            <input
                                type="text"
                                className="form-control"
                                value={editAttribute.name}
                                onChange={(e) => setEditAttribute({ ...editAttribute, name: e.target.value })}
                            />
                        </div>

                        <div className="form-group">
                            <label>Attribute Type</label>
                            <select
                                className="form-control"
                                value={editAttribute.type}
                                onChange={(e) => setEditAttribute({ ...editAttribute, type: e.target.value })}
                            >
                                <option value="text">Text</option>
                                <option value="number">Number</option>
                                <option value="select">Select</option>
                            </select>
                        </div>

                        {editAttribute.type === 'select' && (
                            <div className="form-group">
                                <label>Add Options</label>
                                <div className="option-item">
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={editOption}
                                        onChange={(e) => setEditOption(e.target.value)}
                                        placeholder="Enter option"
                                    />
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={() => handleAddOption('edit')}
                                    >
                                        Add
                                    </button>
                                </div>

                                {editAttribute.options.map((option, index) => (
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
                                            onClick={() => handleRemoveOption(index, 'edit')}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                        <button
                            className="btn btn-success"
                            style={{ marginTop: '20px' }}
                            onClick={handleEditAttribute}
                        >
                            Update Attribute
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AttributePage;