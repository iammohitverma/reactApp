import { useEffect, useState } from "react";
import axios from "axios";

// Import Components
import { Banner } from "../components/Home/Banner";
import { Feature } from "../components/Home/Feature";

const COMPONENT_MAP = {
  banner: Banner,
  features_section: Feature,
};

export const GlobalComponent = ({ PageName, siteUrl }) => {
  const [acfData, setAcfData] = useState(null);
  // fetch data from wordpress
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${siteUrl}/wp-json/wp/v2/pages/`);

        // Find the object with title "home"
        const currentPage = response.data.find(
          (item) => item.title && item.title.rendered === PageName
        );

        if (currentPage && currentPage.acf) {
          // Store the acf data in state
          setAcfData(currentPage.acf);
        } else {
          console.log("No ACF data found for home page");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div>
        {acfData &&
          acfData.home_page_layout &&
          acfData.home_page_layout.map((section, index) => {
            const SectionComponent = COMPONENT_MAP[section.acf_fc_layout];
            {
              if (SectionComponent) {
                return (
                  <SectionComponent
                    key={index}
                    siteUrl={siteUrl}
                    props={section}
                  />
                );
              }
            }
            // Return null if no matching component is found
            return null;
          })}
      </div>
    </>
  );
};
