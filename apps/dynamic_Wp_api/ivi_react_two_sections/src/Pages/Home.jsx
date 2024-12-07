import { GlobalComponent } from "../global/GlobalComponent";
export const Home = ({ pageName, siteUrl }) => {
  return (
    <>
      <GlobalComponent PageName={pageName} siteUrl={siteUrl} />
    </>
  );
};
