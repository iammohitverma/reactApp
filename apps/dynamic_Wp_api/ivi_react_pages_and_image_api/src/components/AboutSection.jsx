import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AboutSection({props}) {
  const [aboutImage, setAboutImage] = useState(null);
  const aboutImageId = props.about_image;

  useEffect(() => {

    // following code is to fetch the banner image using page id and image id
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://bookmyevents.wp/wp-json/wp/v2/media/${aboutImageId}`);
        
        // Find the media item with the specified ID
        if (response.data.guid.rendered) {
          setAboutImage(response.data.guid.rendered); // Set the image URL
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
    <>
      <section className="about_section">
        <div className="container">
          <div className="row">
            <div className="col-md-6 d-flex align-items-center">
              <div className="inner">
                <h1 className="hdng">
                  {props.heading}
                </h1>
                <h4 className="subHdng">
                  {props.sub_heading}
                </h4>
                <p className="desc">
                {props.description}
                </p>
              </div>
            </div>

            <div className="col-md-6">
              <div className="inner">
                <img src={aboutImage} alt="" className="w-100"/>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default AboutSection;
