import { useState } from "react";
import axios from "axios"; // Importing axios

export const Contact4 = () => {
  const siteUrl = "http://ivi.local";
  const formId = 225;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
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
      const formBody = new FormData();
      formBody.append("your-name", formData.name);
      formBody.append("your-email", formData.email);
      formBody.append("your-phone", formData.phone);
      formBody.append("your-message", formData.message);

      // Add the unit-tag value from your Contact Form 7 form configuration
      formBody.append("_wpcf7_unit_tag", "60");

      // Make the POST request using Axios
      const response = await axios.post(
        `${siteUrl}/wp-json/contact-form-7/v1/contact-forms/${formId}/feedback`,
        formBody
      );

      if (response.status === 200 && response.data.status === "mail_sent") {
        setResponseMessage("Your message was sent successfully!");
        setFormData({ name: "", email: "", phone: "", message: "" }); // Reset form
      } else {
        setResponseMessage(
          response.data.message ||
            "Failed to send your message. Please try again."
        );
      }
    } catch (error) {
      console.error("Error:", error);
      setResponseMessage("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <section className="py-5">
        <div className="container">
          <div className="row">
            <div className="col-8 mx-auto">
              <div style={{ marginTop: "100px" }}>
                <h1 className="mb-5">Contact Us by mv</h1>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="form-group">
                    <label>Phone</label>
                    <input
                      type="text"
                      name="phone"
                      className="form-control"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="form-group">
                    <label>Message</label>
                    <textarea
                      name="message"
                      className="form-control"
                      value={formData.message}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>

                  <button type="submit" className="btn btn-primary">
                    Send Message
                  </button>
                </form>
                {responseMessage && <p>{responseMessage}</p>}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
