import { useEffect, useState } from "react";
import axios from "axios";

export const AboutBanner = ({ props, siteUrl }) => {
  const [bannerBgImage, setBannerBgImage] = useState(null);
  const [reviewImage, setReviewImage] = useState(null);
  const [bannerShape, setBannerShape] = useState(null);
  const [bannerImage, setBannerImage] = useState(null);
  const bannerBgImageId = props.background_image;
  const reviewImageId = props.reviews_image;
  const bannerShapeId = props.banner_shape;
  const bannerImageId = props.banner_image;

  useEffect(() => {
    const fetchAllMedia = async () => {
      try {
        // Fetch both images concurrently using Promise.all
        const [
          bannerResponse,
          reviewResponse,
          bannerShapeResponse,
          bannerImageResponse,
        ] = await Promise.all([
          axios.get(`${siteUrl}/wp-json/wp/v2/media/${bannerBgImageId}`),
          axios.get(`${siteUrl}/wp-json/wp/v2/media/${reviewImageId}`),
          axios.get(`${siteUrl}/wp-json/wp/v2/media/${bannerShapeId}`),
          axios.get(`${siteUrl}/wp-json/wp/v2/media/${bannerImageId}`),
        ]);

        // Set the image data for both images
        setBannerBgImage(bannerResponse.data);
        setReviewImage(reviewResponse.data);
        setBannerShape(bannerShapeResponse.data);
        setBannerImage(bannerImageResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Only fetch media if image IDs are provided
    // if (bannerBgImageId && reviewImageId && bannerShapeId && bannerImageId) {
    fetchAllMedia();
    // }
  }, [bannerBgImageId, reviewImageId, bannerShapeId, bannerImageId, siteUrl]); // Dependencies

  return (
    <>
      <section
        className="homepage_banner_sec hero lg_banner pt_100 pb_100"
        style={{
          "--bgImage": bannerBgImage
            ? `url(${bannerBgImage.source_url})`
            : "none",
        }}
      >
        <div className="container">
          <div className="text_wrap mw_800">
            <h1 className="hdng fs_100">{props.heading}</h1>

            <h4 className="subhdng">{props.subheading}</h4>

            <div className="btn_wrap">
              {props.buttons && props.buttons.length > 0 ? (
                props.buttons.map((btn, index) => (
                  <a
                    key={index}
                    className="site_btn"
                    href={btn.link.url}
                    target="_blank"
                  >
                    {btn.link.title}
                  </a>
                ))
              ) : (
                <p>No buttons available</p> // Optional message or fallback content
              )}
            </div>
            <div className="reviews">
              {reviewImage ? (
                <img src={reviewImage.source_url} alt="rating" />
              ) : (
                <p>Loading review image...</p>
              )}
              <p>{props.review_text}</p>
            </div>
          </div>
          <div className="banner_shape">
            {bannerShape ? (
              <img src={bannerShape.source_url} alt="rating" />
            ) : (
              <p>Loading review image...</p>
            )}
          </div>
          <div className="banner_image">
            {bannerImage ? (
              <img src={bannerImage.source_url} alt="rating" />
            ) : (
              <p>Loading review image...</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
};
