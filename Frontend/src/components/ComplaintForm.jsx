import { useState } from "react";

export default function ComplaintForm({ addComplaint }) {
  const today = new Date().toISOString().split("T")[0];
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    type: "",
  });

  const handleInputChange = (event) => {
    setForm((currData) => ({
      ...currData,
      [event.target.name]: event.target.value,
    }));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      await addComplaint(form);
      setForm({ title: "", description: "", date: "", type: "" });
    } catch (err) {
      console.error("Form submission error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="dashboard-form-card animate-fade-in">
      <h2 className="form-title">Submit New Complaint</h2>
      
      <form onSubmit={handleFormSubmit} className="dashboard-form">
        <div className="form-group">
          <label htmlFor="title">Complaint Title</label>
          <input 
            id="title" 
            type="text"
            className="form-input"
            name="title" 
            value={form.title} 
            onChange={handleInputChange} 
            placeholder="E.g. Broken Fan in Room 101" 
            required 
            disabled={isSubmitting}
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Detailed Description</label>
          <textarea 
            id="description" 
            className="form-input"
            name="description" 
            value={form.description} 
            onChange={handleInputChange} 
            placeholder="Please provide specific details about the issue..." 
            rows="4"
            required 
            disabled={isSubmitting}
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="date">Date of Issue</label>
            <input 
              id="date"
              type="date" 
              className="form-input"
              name="date" 
              value={form.date} 
              onChange={handleInputChange} 
              required 
              min = {today}
              disabled={isSubmitting}
            />
          </div>

          <div className="form-group">
            <label htmlFor="type">Category Type</label>
            <select 
              id="type"
              className="form-input"
              name="type" 
              value={form.type} 
              onChange={handleInputChange} 
              required
              disabled={isSubmitting}
            >
              <option value="">Select Category</option>
              <option value="Electrical">⚡ Electrical</option>
              <option value="Water">💧 Water & Plumbing</option>
              <option value="Cleaning">🧹 Cleaning & Hygiene</option>
              <option value="Internet">🌐 Internet / WiFi</option>
              <option value="Other">📌 Other</option>
            </select>
          </div>
        </div>

        <button type="submit" className="btn-primary form-submit-btn" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit Complaint"}
        </button>
      </form>
    </div>
  );
}
