import React, { useState } from 'react';

export default function PopupModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    telegram: '',
    email: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      alert('Please provide your name and email.');
      return;
    }
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setFormData({ name: '', telegram: '', email: '', message: '' });
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div
      className="popup-portal"
      style={{
        display: 'flex',
        background: 'rgba(0,0,0,0.65)',
        backdropFilter: 'blur(8px)',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="popup-body"
        style={{
          background: '#ffd905',
          borderRadius: '24px',
          border: '3px solid #000',
          boxShadow: '10px 10px 0px #000',
          padding: '40px 32px',
          maxWidth: '540px',
          width: '90%',
          position: 'relative'
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: '#ff64d5',
            border: '2px solid #000',
            boxShadow: '2px 2px 0px #000',
            borderRadius: '50%',
            width: '38px',
            height: '38px',
            fontWeight: 'bold',
            fontSize: '18px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          aria-label="Close modal"
        >
          ✕
        </button>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="popup-message-form">
            <h2
              style={{
                fontFamily: 'Bebas Neue, sans-serif',
                fontSize: '44px',
                color: '#ff64d5',
                WebkitTextStroke: '1px #000',
                marginBottom: '24px',
                textAlign: 'center'
              }}
            >
              LEAVE A MESSAGE
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%' }}>
              <div className="input-wrapper">
                <label className="input-label" style={{ fontWeight: 600 }}>Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="Marina"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    border: '2px solid #000',
                    background: '#fff',
                    fontSize: '16px',
                    outline: 'none'
                  }}
                />
              </div>

              <div className="input-wrapper">
                <label className="input-label" style={{ fontWeight: 600 }}>Telegram or Phone</label>
                <input
                  type="text"
                  placeholder="@username"
                  value={formData.telegram}
                  onChange={(e) => setFormData({ ...formData, telegram: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    border: '2px solid #000',
                    background: '#fff',
                    fontSize: '16px',
                    outline: 'none'
                  }}
                />
              </div>

              <div className="input-wrapper">
                <label className="input-label" style={{ fontWeight: 600 }}>Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="hello@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    border: '2px solid #000',
                    background: '#fff',
                    fontSize: '16px',
                    outline: 'none'
                  }}
                />
              </div>

              <div className="textarea-wrapper">
                <label className="textarea-label" style={{ fontWeight: 600 }}>Project Details</label>
                <textarea
                  rows="3"
                  placeholder="Tell us about your brand, timeline, and goals..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    border: '2px solid #000',
                    background: '#fff',
                    fontSize: '16px',
                    outline: 'none',
                    resize: 'vertical'
                  }}
                />
              </div>

              <button
                type="submit"
                className="button pink-big"
                style={{ marginTop: '16px', width: '100%', cursor: 'pointer' }}
              >
                <div className="button-content">SEND INQUIRY</div>
              </button>
            </div>
          </form>
        ) : (
          <div className="popup-success" style={{ textAlign: 'center', padding: '20px 0' }}>
            <h2
              style={{
                fontFamily: 'Bebas Neue, sans-serif',
                fontSize: '48px',
                color: '#ff64d5',
                WebkitTextStroke: '1px #000',
                marginBottom: '16px'
              }}
            >
              MESSAGE SENT!
            </h2>
            <p style={{ fontSize: '18px', fontWeight: 600, marginBottom: '24px' }}>
              Thank you, {formData.name}! We will review your inquiry and get back to you within 24 hours.
            </p>
            <button
              onClick={handleReset}
              className="button yellow"
              style={{ padding: '12px 28px', fontSize: '16px', cursor: 'pointer' }}
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
