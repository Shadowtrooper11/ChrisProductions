import { useState } from 'react'
import './Contact.css'

function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        notes: '',
        contactMethod: 'email',
        bestTime: 'anytime'
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div className="contact-page">
            <div className="contact-form-container">
                <div className="contact-form-header">
                    <h1>Contact Me</h1>
                    <p>Interested in collaborations, commissions, or bookings? Let's talk!</p>
                </div>

                <form className="contact-form">
                    <div className="form-section">
                        <h3>Contact Information</h3>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="name">Name *</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder="Your Name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email *</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="example@gmail.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="phone">Phone Number *</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    placeholder="(123) 456-7890"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="company">Company Name</label>
                                <input
                                    type="text"
                                    id="company"
                                    name="company"
                                    placeholder="Company (Optional)"
                                    value={formData.company}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>    
                    </div>

                    <div className="form-section">
                        <h3>Contact Preferences</h3>

                        <div className="form-group">
                            <label htmlFor="contactMethod">Best Contact Method</label>
                            <select
                                id="contactMethod"
                                name="contactMethod"
                                value={formData.contactMethod}
                                onChange={handleChange}
                            >
                                <option value="email">Email</option>
                                <option value="phone">Phone</option>
                                <option value="text">Text Message</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="bestTime">Best Time to Contact</label>
                            <select
                                id="bestTime"
                                name="bestTime"
                                value={formData.bestTime}
                                onChange={handleChange}
                            >
                                <option value="morning">Morning</option>
                                <option value="afternoon">Afternoon</option>
                                <option value="evening">Evening</option>
                                <option value="anytime">Anytime</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="notes">Additional Notes</label>
                            <textarea
                                id="notes"
                                name="notes"
                                placeholder="Tell me about your project or inquiry..."
                                rows="5"
                                value={formData.notes}
                                onChange={handleChange}
                            />
                        </div>

                        <button type="submit" className="submit-btn" disabled>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Contact