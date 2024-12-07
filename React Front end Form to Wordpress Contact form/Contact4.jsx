import { useState } from "react";

export const Contact4 = () => {
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
      const formBody = new FormData();
      console.log(formBody);
      formBody.append("your-name", formData.name);
      formBody.append("your-email", formData.email);
      formBody.append("your-message", formData.message);

      // Ensure you include the correct unit-tag value.
      formBody.append("_wpcf7_unit_tag", "60"); // Add the unit-tag value from your Contact Form 7 form configuration

      const response = await fetch(
        "http://ivi.local/wp-json/contact-form-7/v1/contact-forms/225/feedback",
        {
          method: "POST",
          body: formBody, // No need to set Content-Type, fetch will handle it
        }
      );

      const result = await response.json();

      if (response.ok && result.status === "mail_sent") {
        setResponseMessage("Your message was sent successfully!");
        setFormData({ name: "", email: "", message: "" }); // Reset form
      } else {
        setResponseMessage(
          result.message || "Failed to send your message. Please try again."
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
                      required
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
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Message</label>
                    <textarea
                      name="message"
                      className="form-control"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
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
