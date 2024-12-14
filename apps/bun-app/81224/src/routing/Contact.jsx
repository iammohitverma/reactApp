import { Form } from "react-router-dom";
export const updateUserName = () => {
  console.log("updateUserName run");
};
export const getContactData = async ({ request }) => {
  try {
    const res = await request.formData();
    const formDataObj = Object.fromEntries(res);
    console.log(formDataObj);
    window.dispatchEvent(new Event("userNameUpdated"));
    window.addEventListener("userNameUpdated", updateUserName);
  } catch (error) {
    console.log(error);
  }
};

export const Contact = () => {
  return (
    <div className="contact_page py-5">
      <div className="container">
        <div className="row">
          <div className="col-md-8 mx-auto">
            <h1 className="mb-5">Welcome to the Contact Page</h1>
            <div className="form_wrap">
              <Form action="/contact" method="POST">
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    placeholder="John doe"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    placeholder="name@example.com"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Example textarea</label>
                  <textarea
                    className="form-control"
                    name="message"
                    rows="3"
                  ></textarea>
                </div>
                <div className="mb-3">
                  <input
                    type="submit"
                    value="Submit"
                    className="btn btn-primary"
                  />
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
