import { GlobalComponent } from "../global/GlobalComponent";
export const About = ({ pageName, flexibleContentId, siteUrl }) => {
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
