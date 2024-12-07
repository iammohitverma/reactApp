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
          element={<Home pageName="Home" siteUrl={siteUrl} />}
        />
        <Route path="about" element={<About pageName="About Page" />} />
        <Route path="contact" element={<Contact pageName="Contact Page" />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}
export default App;
