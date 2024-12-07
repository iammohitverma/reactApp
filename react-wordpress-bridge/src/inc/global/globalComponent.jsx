import React, { useEffect , useState } from 'react';
import axios from 'axios';

// Import Components 
import Banner from '../components/HomeBanner';
import BannerSlider from '../components/HomeBannerSlider';
import About from '../components/AboutSection';

function GlobalComp({ PageName }) {
    const [acfData, setAcfData] = useState(null);
    // fetch data from wordpress
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://bookmyevents.wp/wp-json/wp/v2/pages/`);
                // console.log(response.data);

                // Find the object with title "home"
                const currentPage = response.data.find(item => item.title && item.title.rendered === PageName);

                if (currentPage && currentPage.acf) {
                    // Store the acf data in state
                    setAcfData(currentPage.acf);
                } else {
                    console.log("No ACF data found for home page");
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <div>   
                {acfData && acfData.sections && acfData.sections.map((section, index) => {
                    // You can add logic to render different components based on the section type
                    switch (section.acf_fc_layout) {
                    case 'main_banner':
                        // return <Banner key={index} props={section} pageId={pageId} />;
                        return <BannerSlider key={index} props={section} />;
                    case 'about_section':
                        return <About key={index} props={section} />;
                    // Add more case blocks for other section types as needed
                    default:
                        return null;
                    }
                })}
            </div>
        </>
    );
}

export default GlobalComp;
