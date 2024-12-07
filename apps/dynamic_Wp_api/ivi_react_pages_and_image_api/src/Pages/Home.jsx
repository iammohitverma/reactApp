import { GlobalComponent } from "../global/GlobalComponent";
export const Home = ({ pageName, flexibleContentId, siteUrl }) => {
  return (
    <>
      <GlobalComponent
        PageName={pageName}
        flexibleContentId={flexibleContentId}
        siteUrl={siteUrl}
      />
    </>
  );
};
