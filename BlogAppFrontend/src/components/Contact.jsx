import React from 'react';
import '../css/Contact.css';


const Contact = () => {
  return (
    <div className="contact-container">
      <h2 className="contact-title">Get in Touch</h2>
      <p className="contact-description">
        Have questions or feedback? We'd love to hear from you! Fill out the form below, and we'll get back to you as soon as possible.
      </p>
      <form className="contact-form">
        <div className="form-grp">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" placeholder="Enter your name" />
        </div>
        <div className="form-grp">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="Enter your email" />
        </div>
        <div className="form-grp">
          <label htmlFor="message">Message</label>
          <textarea id="message" placeholder="Enter your message" rows="5"></textarea>
        </div>
        <button type="submit" className="contact-button">Send Message</button>
      </form>
    </div>
  );
};

export default Contact;