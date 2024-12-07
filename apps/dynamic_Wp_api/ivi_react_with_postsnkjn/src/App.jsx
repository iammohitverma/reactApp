import { Routes, Route } from "react-router-dom";

import { Home } from "./Pages/Home";
import { About } from "./Pages/About";
import { Contact } from "./Pages/Contact";
import { Error } from "./Pages/Error";

function App() {
  const siteUrl = "http://ivi.local";
  return (
    <>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <Home
              pageName="Home" //The pageName prop is used to dynamically fetch data based on the current page. In your case, the pageName is "Home", which corresponds to a specific page (likely the homepage) in your WordPress backend or CMS.
              flexibleContentId={"sections"} //This prop refers to the key that holds the flexible content fields in your WordPress ACF (Advanced Custom Fields) setup. In your example, "sections" represents the ACF field name that contains an array of content sections for the page.
              siteUrl={siteUrl} //The siteUrl prop is the URL of the WordPress site (or any API endpoint) where the data is fetched from. It’s essential for dynamically loading content via API calls.
            />
          }
        />
        <Route
          path="/about"
          element={
            <About
              pageName="About"
              flexibleContentId={"sections"}
              siteUrl={siteUrl}
            />
          }
        />
        <Route
          path="/contact"
          element={
            <Contact
              pageName="Contact Page"
              flexibleContentId={"sections"}
              siteUrl={siteUrl}
            />
          }
        />
        <Route
          path="*"
          element={
            <Error
              pageName="404 Page"
              flexibleContentId={"sections"}
              siteUrl={siteUrl}
            />
          }
        />
      </Routes>
    </>
  );
}
export default App;
