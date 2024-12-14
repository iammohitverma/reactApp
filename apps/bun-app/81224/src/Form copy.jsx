import { useState } from "react";

export const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const formSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <section>
      <div className="container">
        <form onSubmit={formSubmit}>
          <div className="input_wrap">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={onChangeHandler}
            />
          </div>
          <div className="input_wrap">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={onChangeHandler}
            />
          </div>
          <div className="input_wrap">
            <textarea
              name="message"
              value={formData.message}
              onChange={onChangeHandler}
            ></textarea>
          </div>
          <div className="submit_wrap">
            <input type="submit" value="Submit" />
          </div>
        </form>
      </div>
    </section>
  );
};
