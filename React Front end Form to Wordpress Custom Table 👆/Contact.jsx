import React, { useState } from "react";

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [responseMessage, setResponseMessage] = useState("");

  // Handle input changes and update formData state
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send form data to the WordPress REST API
      const response = await fetch(
        "http://ivi.local/wp-json/myplugin/v1/submit-contact-form", // Change this URL to your WordPress API endpoint
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData), // Sending the form data as JSON
        }
      );

      // Handle the response from the backend
      const result = await response.json();

      if (result.success) {
        setResponseMessage("Your message was sent successfully!");
        setFormData({ name: "", email: "", message: "" }); // Reset form after successful submission
      } else {
        setResponseMessage("Failed to send your message. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setResponseMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div style={{ marginTop: "100px" }}>
      <h1>Contact Us</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            required
          ></textarea>
        </div>
        <button type="submit">Send Message</button>
      </form>
      {responseMessage && <p>{responseMessage}</p>}{" "}
      {/* Show response message */}
    </div>
  );
};
