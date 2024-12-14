import { useId, useRef, useState } from "react";

export const FormWithUseId = () => {
  const [formData, setFormData] = useState({});
  const nameId = useId();
  const emailId = useId();
  const messageId = useId();

  const name = useRef(null);
  const email = useRef(null);
  const message = useRef(null);
  console.log(name);

  const formSubmit = (e) => {
    e.preventDefault();
    setFormData(() => ({
      name: name.current.value,
      email: email.current.value,
      message: message.current.value,
    }));
    console.log(formData);
  };

  return (
    <section>
      <div className="container">
        <form onSubmit={formSubmit}>
          <div className="input_wrap">
            <input type="text" name="name" ref={name} id={nameId} />
          </div>
          <div className="input_wrap">
            <input type="text" name="email" ref={email} id={emailId} />
          </div>
          <div className="input_wrap">
            <textarea name="message" ref={message} id={messageId}></textarea>
          </div>
          <div className="submit_wrap">
            <input type="submit" value="Submit" />
          </div>
        </form>
      </div>
    </section>
  );
};
