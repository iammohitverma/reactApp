import React from 'react';

// import sections
// import Banner from '../components/sections/homepage/Banner';
// import TypeSection from '../components/sections/homepage/Type';
// import EventTabSection from '../components/sections/homepage/EventTabSection';
// import PopularEventSection from '../components/sections/homepage/PopularEvent';
// import LogoSliderSection from '../components/sections/homepage/LogoSlider';
// import UpcomingEventsSection from '../components/sections/homepage/UpcomingEvents';

import GlobalComp from '../global/globalComponent';

//import module
import { Helmet } from 'react-helmet-async';

function Home({pageName , flexibleContentId , siteUrl }) {
  return (
    <>
      <Helmet>
        <title>Home Page - Book my event</title>
        <meta name="description" content="This is the homepage of Bookmyevent." />
      </Helmet>


      <GlobalComp PageName={pageName} siteUrl={siteUrl} flexibleContentId={flexibleContentId} />

      {/* banner section */} 
      {/* <Banner/> */}

      {/* type section */}
      {/* <TypeSection/> */}

      {/* Tab Section */}
      {/* <EventTabSection/> */}

      {/* Popular Events */}
      {/* <PopularEventSection/> */}

      {/* LogoSlider */}
      {/* <LogoSliderSection/> */}

      {/* Upcoming Events */}
      {/* <UpcomingEventsSection/> */}
    
    </>
  );
}

export default Home;
