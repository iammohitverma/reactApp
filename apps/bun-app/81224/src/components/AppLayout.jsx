import { Outlet, useNavigation } from "react-router-dom"; // To render child routes
import { Footer } from "./Footer";
import { Header } from "./Header";

export const AppLayout = () => {
  const navigationState = useNavigation();
  if (navigationState.state === "loading") return <h2>Loading...</h2>;
  return (
    <div className="appLayout">
      <Header /> {/* Common Header */}
      <Outlet /> {/* Renders nested child components */}
      <Footer /> {/* Common Footer */}
    </div>
  );
};
