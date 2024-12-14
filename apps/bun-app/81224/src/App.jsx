import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppLayout } from "./components/AppLayout";
import { Home } from "./routing/Home";
import { About } from "./routing/About";
import { Movies } from "./routing/Movies";
import { MovieSingle } from "./routing/MovieSingle";
import { Contact } from "./routing/Contact";
import { Error } from "./routing/Error";
import { MoviesListingData } from "./apiFunctions/moviesListingData";
import { MovieSinglePostData } from "./apiFunctions/movieSinglePostData";
import { getContactData } from "./routing/Contact";
import "./App.css";
import { ApiCheckPage } from "./JsonPlaceholder/ApiCheckPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />, // For Error Page layout
    errorElement: <Error />, // Parent layout component
    children: [
      {
        path: "/", // Child route
        element: <Home />,
      },
      {
        path: "/about", // Another child route
        element: <About />,
      },
      {
        path: "/movies", // Another child route
        element: <Movies />,
        loader: MoviesListingData, // API call as a loader function
      },
      {
        path: "/movie/:ID", // Another child route for single movie post
        element: <MovieSingle />,
        loader: MovieSinglePostData, // API call as a loader function
      },
      {
        path: "/contact", // Another child route for single movie post
        element: <Contact />,
        action: getContactData, // For getting form data
      },
      {
        path: "/apiCheckPage", // Another child route for single movie post
        element: <ApiCheckPage />,
      },
      // {
      //   path: "*", // Another child route
      //   element: <Error />,
      // },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
