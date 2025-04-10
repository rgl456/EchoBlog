import React, { useState } from 'react';
import '../css/Faq.css';

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: 'What is this blog about?',
      answer: 'This blog covers a wide range of topics, including technology, gaming, science, and more. Our goal is to provide insightful and engaging content for our readers.',
    },
    {
      question: 'How can I create an account?',
      answer: 'You can create an account by clicking on the "Sign Up" button at the top of the page and filling out the registration form.',
    },
    {
      question: 'How do I contact support?',
      answer: 'You can contact support by visiting the "Contact" section and filling out the form. We’ll get back to you as soon as possible.',
    },
    {
      question: 'Can I contribute to the blog?',
      answer: 'Yes, we welcome guest contributions! Please reach out to us via the "Contact" section for more details.',
    },
  ];

  const toggleFaq = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
      <h2 className="faq-title">Frequently Asked Questions</h2>
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`faq-item ${activeIndex === index ? 'active' : ''}`}
            onClick={() => toggleFaq(index)}
          >
            <h3 className="faq-question">
              {faq.question}
              <span>{activeIndex === index ? '-' : '+'}</span>
            </h3>
            <p className="faq-answer">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq;