import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Feedback = () => {
    const navigate = useNavigate();
    
    // 1. Get User Role from Local Storage (Saved during Login)
    // It will be 'student', 'employee', 'registrar', etc.
    const userRole = localStorage.getItem('userType') || 'Anonymous';

    const [message, setMessage] = useState('');
    const [status, setStatus] = useState({ text: '', type: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!message.trim()) {
            setStatus({ text: "Please enter some text.", type: 'error' });
            return;
        }

        setIsSubmitting(true);

        try {
            // 2. Prepare Payload
            // We map specific roles (like faculty, hod) to generic 'employee' if needed, 
            // or just send the role as is.
            const payload = {
                message: message,
                roleType: userRole // e.g., "student" or "employee"
            };

            // 3. Send Request
            await axios.post('http://localhost:8080/api/feedback/submit', payload);

            setStatus({ text: "Feedback submitted successfully!", type: 'success' });
            setMessage(''); // Clear the box
            
            // Optional: Redirect after success
            setTimeout(() => navigate(-1), 2000);

        } catch (error) {
            console.error("Feedback Error", error);
            setStatus({ text: "Failed to submit feedback. Try again.", type: 'error' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="form-container" style={{maxWidth: '600px', margin: '50px auto'}}>
            <h2>Submit Feedback</h2>
            <p style={{color: '#666', fontSize: '0.9em', marginBottom: '20px'}}>
                Your feedback is anonymous. We only record that you are a <strong>{userRole}</strong>.
            </p>

            {status.text && (
                <div className={`message ${status.type}`} style={{
                    padding: '10px', marginBottom: '15px', borderRadius: '5px',
                    backgroundColor: status.type === 'error' ? '#f8d7da' : '#d4edda',
                    color: status.type === 'error' ? '#721c24' : '#155724'
                }}>
                    {status.text}
                </div>
            )}

            <form className='register-form' onSubmit={handleSubmit}>
                <label htmlFor="feedback">Your Message:</label>
                <textarea 
                    id="feedback"
                    name="feedback"
                    rows="6"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write your suggestions or complaints here..."
                    style={{
                        width: '100%', 
                        padding: '10px', 
                        marginBottom: '20px', 
                        borderRadius: '4px',
                        border: '1px solid #ddd',
                        resize: 'vertical' // Allow vertical resizing only
                    }}
                />

                <div className='btn-row'>
                    <button type='button' onClick={() => navigate(-1)} style={{backgroundColor: '#666'}}>Cancel</button>
                    <button type='submit' disabled={isSubmitting}>
                        {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Feedback;