import React, { useState, useEffect } from "react";
import "./EnquiryPage.css";
import Header from "../../components/Header";


const Enquirypage = () => {
    const [enquiries, setEnquiries] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchEnquiries();
    }, []);

    const fetchEnquiries = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/enquiries/enquiries', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const { data } = await response.json();
                setEnquiries(data);
            } else {
                throw new Error('Failed to fetch enquiries');
            }
        } catch (error) {
            console.error('Error fetching enquiries:', error);
            setError(error.message);
        }
    };

    return (
        <>
            <Header />
            <div className="enquiry-page-container">
                <h2>Enquiry Management</h2>
                {error && <div className="error-message">Error: {error}</div>}
                {enquiries.length === 0 && !error && <p>No enquiries found.</p>}
                {enquiries.length > 0 && (
                    <table className="enquiry-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Message</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {enquiries.map((enquiry) => (
                                <tr key={enquiry.id}>
                                    <td>{enquiry.id}</td>
                                    <td>{enquiry.name}</td>
                                    <td>{enquiry.email}</td>
                                    <td>{enquiry.message}</td>
                                    <td>{new Date(enquiry.created_at).toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
          
        </>
    );
};

export default Enquirypage;