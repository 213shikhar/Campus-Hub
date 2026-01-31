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
        <div className="min-vh-100 d-flex flex-column bg-light py-5">
    <div className="container flex-grow-1">
        <div className="row justify-content-center">
            <div className="col-12 col-sm-11 col-md-8 col-lg-6 px-3 px-sm-4">
                {/* Back Button */}
                <button 
                    className="btn btn-outline-secondary mb-3 transition-all" 
                    onClick={() => navigate(-1)}
                    style={{transition: 'all 0.3s ease'}}
                >
                    <i className="bi bi-arrow-left me-2"></i>Back
                </button>

                {/* Feedback Form Card */}
                <div className="card shadow-lg border-0 rounded-4">
                    <div className="card-body p-4 p-md-5">
                        <div className="text-center mb-4">
                            <div className="mb-3">
                                <i className="bi bi-chat-left-dots fs-1 text-primary"></i>
                            </div>
                            <h2 className="fw-semibold text-primary mb-2">Submit Feedback</h2>
                            <p className="text-muted small mb-0">
                                <i className="bi bi-incognito me-1"></i>
                                Your feedback is anonymous!
                            </p>
                        </div>

                        {/* Status Message */}
                        {status.text && (
                            <div 
                                className={`alert ${status.type === 'error' ? 'alert-danger' : 'alert-success'} alert-dismissible fade show`} 
                                role="alert"
                            >
                                <i className={`bi ${status.type === 'error' ? 'bi-exclamation-triangle-fill' : 'bi-check-circle-fill'} me-2`}></i>
                                {status.text}
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="feedback" className="form-label fw-medium">
                                    Your Message
                                </label>
                                <textarea 
                                    id="feedback"
                                    name="feedback"
                                    rows="8"
                                    className="form-control transition-all"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Write your suggestions, complaints, or feedback here..."
                                    style={{
                                        transition: 'all 0.3s ease',
                                        resize: 'vertical',
                                        minHeight: '200px'
                                    }}
                                    required
                                />
                                <div className="form-text">
                                    <i className="bi bi-info-circle me-1"></i>
                                    Share your honest thoughts. This helps us improve.
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="row g-3 mt-2">
                                <div className="col-md-6">
                                    <button 
                                        type="button" 
                                        onClick={() => navigate(-1)}
                                        className="btn btn-secondary btn-lg w-100 fw-semibold transition-all"
                                        style={{transition: 'all 0.3s ease'}}
                                        disabled={isSubmitting}
                                    >
                                        <i className="bi bi-x-circle me-2"></i>Cancel
                                    </button>
                                </div>
                                <div className="col-md-6">
                                    <button 
                                        type="submit" 
                                        disabled={isSubmitting}
                                        className="btn btn-primary btn-lg w-100 fw-semibold transition-all"
                                        style={{transition: 'all 0.3s ease'}}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                Submitting...
                                            </>
                                        ) : (
                                            <>
                                                <i className="bi bi-send me-2"></i>Submit Feedback
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
    );
};

export default Feedback;