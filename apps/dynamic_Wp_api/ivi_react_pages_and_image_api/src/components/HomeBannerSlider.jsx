import React, { useEffect, useState } from 'react';
import axios from 'axios';

function HomeBannerSlider({ props }) {
  const [MediaItem, setMediaItems] = useState([]);

  // console.log(props.banner_gallery);
  const bannerIds = props.banner_gallery;
  
  useEffect(() => {
    const fetchAllMedia = async () => {
      try {
        // Use Promise.all to fetch all media items
        const responses = await Promise.all(
          bannerIds.map((bannerId) =>
            axios.get(`http://bookmyevents.wp/wp-json/wp/v2/media/${bannerId}`)
          )
        );

        // Extract the data from each response and update state
        const items = responses.map((response) => response.data);
        setMediaItems(items);
        
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchAllMedia();
  }, [bannerIds]);

  return (
    <section className="bannerSection">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1>{props.banner_heading}</h1>
            <p>{props.banner_description}</p>

            {MediaItem.map((item) => (
              <img
                key={item.id}
                src={item.guid.rendered}
                alt={`Media ID ${item.id}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomeBannerSlider;
