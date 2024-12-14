import { NavLink } from "react-router-dom";
export const Header = () => {
  const getCustomActiveClass = ({ isActive }) => {
    return isActive ? "link active" : "";
  };
  return (
    <header>
      <div className="container">
        <div className="inner">
          <NavLink to="/" className="logo">
            Logo
          </NavLink>
          <nav>
            <ul>
              <li>
                <NavLink
                  to="/"
                  className={getCustomActiveClass} //by default react provide active class on active item if we need to customize active or change to another active class then use this function
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className={getCustomActiveClass} //by default react provide active class on active item if we need to customize active or change to another active class then use this function
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/movies"
                  className={getCustomActiveClass} //by default react provide active class on active item if we need to customize active or change to another active class then use this function
                >
                  Movies
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  className={getCustomActiveClass} //by default react provide active class on active item if we need to customize active or change to another active class then use this function
                >
                  Contact
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/apiCheckPage"
                  className={getCustomActiveClass} //by default react provide active class on active item if we need to customize active or change to another active class then use this function
                >
                  ApiCheckPage

                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/xyz"
                  className={getCustomActiveClass} //by default react provide active class on active item if we need to customize active or change to another active class then use this function
                >
                  XYZ
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};
