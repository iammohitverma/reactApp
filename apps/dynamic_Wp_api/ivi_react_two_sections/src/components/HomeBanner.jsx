import React, { useEffect, useState } from 'react';
import axios from 'axios';

function HomeBanner({ props }) {
  const [backgroundImage, setBackgroundImage] = useState(null);
  const bannerImageId = props.banner_bg;
  
  useEffect(() => {

    // following code is to fetch the banner image using page id and image id
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://bookmyevents.wp/wp-json/wp/v2/media/${bannerImageId}`);
        
        // Find the media item with the specified ID
        if (response.data.guid.rendered) {
          setBackgroundImage(response.data.guid.rendered); // Set the image URL
        } else {
          console.warn("Media not found for banner_bg:", props.banner_bg);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [props]);

  return (
    <section className="bannerSection" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1>{props.banner_heading}</h1>
            <p>{props.banner_description}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomeBanner;
