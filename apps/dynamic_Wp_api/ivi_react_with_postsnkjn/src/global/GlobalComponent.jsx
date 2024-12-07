import { useEffect, useState } from "react";
import axios from "axios";

// Import Components
import { Banner } from "../components/Home/Banner";
import { Feature } from "../components/Home/Feature";
import { EventPosts } from "../components/Home/EventPosts";
import { AboutBanner } from "../components/About/AboutBanner";
import { AboutFeature } from "../components/About/AboutFeature";

// Map based on the page
const COMPONENT_MAP = {
  Home: {
    banner: Banner,
    features_section: Feature,
    selected_post: EventPosts,
  },
  About: {
    banner: AboutBanner,
    features_section: AboutFeature,
  },
};

export const GlobalComponent = ({ PageName, flexibleContentId, siteUrl }) => {
  const [acfData, setAcfData] = useState(null);
  const [error, setError] = useState(null);

  // Fetch data from WordPress
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${siteUrl}/wp-json/wp/v2/pages/?per_page=99`
        );

        const currentPage = response.data.find(
          (item) => item.title && item.title.rendered === PageName
        );

        if (currentPage && currentPage.acf) {
          setAcfData(currentPage.acf);
        } else {
          setError(`No ACF data found for page: ${PageName}`);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data.");
      }
    };

    fetchData();
  }, [PageName, flexibleContentId, siteUrl]); // Dependency array

  if (error) return <p>{error}</p>;
  if (!acfData) return <p>Loading...</p>;

  // Dynamically access the flexible content section
  const flexibleContent = acfData[flexibleContentId];

  if (!flexibleContent) {
    return <p>No content found for {flexibleContentId}</p>;
  }

  console.log(acfData);

  return (
    <div>
      {flexibleContent.map((section, index) => {
        const pageComponents = COMPONENT_MAP[PageName];

        if (!pageComponents) {
          console.error(`No components found for page: ${PageName}`);
          return null;
        }

        const SectionComponent = pageComponents[section.acf_fc_layout];
        if (SectionComponent) {
          return (
            <SectionComponent key={index} siteUrl={siteUrl} props={section} />
          );
        } else {
          // Conditional fallback for unknown layouts
          console.warn(
            `No matching component for layout: ${section.acf_fc_layout}`
          );
          return (
            <div key={index} className="unknown-layout">
              <p>No component for layout: {section.acf_fc_layout}</p>
            </div>
          );
        }
      })}
    </div>
  );
};
