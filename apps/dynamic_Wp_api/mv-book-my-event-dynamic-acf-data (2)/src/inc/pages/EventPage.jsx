import React from 'react';

// import sections
// import Banner from '../components/sections/EventPage/Banner';
// import EventListing from '../components/sections/EventPage/EventListing';

import GlobalComp from '../global/globalComponent';

//import module
import { Helmet } from 'react-helmet-async';
function Events({ pageName, flexibleContentId, siteUrl }) {
  return (
    <>
      <Helmet>
        <title>Event Page - Book my event</title>
        <meta name="description" content="This is the eventpage of Bookmyevent." />
      </Helmet>
    {/* Banner Section */}
      {/* <Banner/> */}
    {/* Events Section */}
    {/* <EventListing/> */}
      <GlobalComp PageName={pageName} siteUrl={siteUrl} flexibleContentId={flexibleContentId} />
    </>
  );
}

export default Events;
