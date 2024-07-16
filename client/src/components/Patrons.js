import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Patrons.css'; 

const Patrons = () => {
    const [patrons, setPatrons] = useState([]);
    const [form, setForm] = useState({
        id: null,
        name: '',
        email: '',
        phone_number: ''
    });

    const fetchPatrons = async () => {
        try {
            const response = await axios.get('/patrons');
            setPatrons(response.data);
        } catch (error) {
            console.error("There was an error fetching the patrons!", error);
        }
    };

    useEffect(() => {
        fetchPatrons();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (form.id) {
            // Update existing patron
            try {
                await axios.put(`/patrons/${form.id}`, form);
                setForm({ id: null, name: '', email: '', phone_number: '' });
                fetchPatrons();
            } catch (error) {
                console.error("There was an error updating the patron!", error);
            }
        } else {
            // Create new patron
            try {
                await axios.post('/patrons', form);
                setForm({ id: null, name: '', email: '', phone_number: '' });
                fetchPatrons();
            } catch (error) {
                console.error("There was an error creating the patron!", error);
            }
        }
    };

    const handleEditClick = (patron) => {
        setForm(patron);
    };

    const handleDeleteClick = async (id) => {
        try {
            await axios.delete(`/patrons/${id}`);
            fetchPatrons();
        } catch (error) {
            console.error("There was an error deleting the patron!", error);
        }
    };

    return (
        <div className="patrons-page">
            <h1>Patrons</h1>
            <form onSubmit={handleFormSubmit} className="patrons-form">
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={form.name}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="text"
                    name="phone_number"
                    placeholder="Phone Number"
                    value={form.phone_number}
                    onChange={handleInputChange}
                    required
                />
                <button type="submit">{form.id ? 'Update' : 'Create'} Patron</button>
            </form>
            <div className="patrons-list">
                {patrons.map((patron) => (
                    <div className="patron-card" key={patron.id}>
                        <h2>{patron.name}</h2>
                        <p>Email: {patron.email}</p>
                        <p>Phone: {patron.phone_number}</p>
                        <button className="edit" onClick={() => handleEditClick(patron)}>Edit</button>
                        <button className="delete" onClick={() => handleDeleteClick(patron.id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Patrons;
