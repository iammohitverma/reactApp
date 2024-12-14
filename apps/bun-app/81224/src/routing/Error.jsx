import { NavLink, useNavigate } from "react-router";
export const Error = () => {
  let navigate = useNavigate();
  const goBackHandle = () => {
    navigate(-1);
  };
  return (
    <div>
      <h1>Welcome to the Error Page ❌</h1>
      <NavLink to="/" className="logo">
        Go Home
      </NavLink>
      <button onClick={goBackHandle}>Go Back</button>
    </div>
  );
};
