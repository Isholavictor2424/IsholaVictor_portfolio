import { useState } from "react";
import axios from "axios";

function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
    if (status.message) setStatus({ type: "", message: "" });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setStatus({ type: "", message: "" });

    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      if (!apiUrl) throw new Error("Contact service is not configured.");

      const response = await axios.post(`${apiUrl}/send-email`, formData, { timeout: 15000 });

      setStatus({
        type: "success",
        message: response.data?.message || "Thanks! Your message has been sent.",
      });
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Contact form error:", error);
      setStatus({
        type: "error",
        message:
          error.response?.data?.message ||
          "Something went wrong. Please try again or email me directly.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section" id="contact">
      <div className="container">
        <div className="contact-grid">
          <div>
            <p className="eyebrow">Contact</p>
            <h2 className="contact-heading">
              Have an idea? <em>Let's build it.</em>
            </h2>
            <p className="contact-intro">
              Whether it's a project, an opportunity, or you just want to say
              hi — my inbox is open.
            </p>

            <div className="contact-links">
              <a className="contact-link" href="mailto:Adeoluwavictor829@gmail.com">
                <span className="contact-link-label">Email</span>
                <span className="contact-link-value">Adeoluwavictor829@gmail.com</span>
              </a>
              <a
                className="contact-link"
                href="https://github.com/Isholavictor2424"
                target="_blank"
                rel="noreferrer"
              >
                <span className="contact-link-label">GitHub</span>
                <span className="contact-link-value">github.com/Isholavictor2424</span>
              </a>
              <a
                className="contact-link"
                href="https://www.linkedin.com/in/victor-ishola-941b61285/"
                target="_blank"
                rel="noreferrer"
              >
                <span className="contact-link-label">LinkedIn</span>
                <span className="contact-link-value">victor-ishola</span>
              </a>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-field">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                required
                minLength={2}
                maxLength={80}
              />
            </div>

            <div className="form-field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                maxLength={120}
              />
            </div>

            <div className="form-field">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell me a little about your project..."
                required
                minLength={10}
                maxLength={2000}
                rows={5}
              />
            </div>

            {status.message && (
              <p className={`form-status ${status.type}`}>{status.message}</p>
            )}

            <button type="submit" className="form-submit" disabled={loading}>
              {loading ? "Sending..." : "Send message"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;