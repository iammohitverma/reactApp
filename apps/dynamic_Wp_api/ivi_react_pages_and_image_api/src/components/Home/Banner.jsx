import { useState } from "react";
import { MediaFetcher } from "../MediaFetcher";

export const Banner = ({ props, siteUrl }) => {
  const [imagesData, setImagesData] = useState(null);

  // Image IDs to fetch
  const imageIds = [
    props.background_image,
    props.reviews_image,
    props.banner_shape,
    props.banner_image,
  ];

  // Handle media data once fetched
  const handleMediaFetched = (media) => {
    if (!media) return;

    // Set images data
    setImagesData(media);
  };

  return (
    <section
      className="homepage_banner_sec hero lg_banner pt_100 pb_100"
      style={{
        "--bgImage": imagesData?.[props.background_image]?.source_url
          ? `url(${imagesData[props.background_image].source_url})`
          : "none",
      }}
    >
      {/* Fetch media using MediaFetcher */}
      <MediaFetcher
        imageIds={imageIds}
        siteUrl={siteUrl}
        onMediaFetched={handleMediaFetched}
      />

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
                  rel="noopener noreferrer"
                >
                  {btn.link.title}
                </a>
              ))
            ) : (
              <p>No buttons available</p>
            )}
          </div>

          <div className="reviews">
            {imagesData?.[props.reviews_image]?.source_url && (
              <img
                src={imagesData[props.reviews_image].source_url}
                alt="Review"
              />
            )}
            <p>{props.review_text}</p>
          </div>
        </div>

        <div className="banner_shape">
          {imagesData?.[props.banner_shape]?.source_url && (
            <img
              src={imagesData[props.banner_shape].source_url}
              alt="Banner Shape"
            />
          )}
        </div>

        <div className="banner_image">
          {imagesData?.[props.banner_image]?.source_url && (
            <img src={imagesData[props.banner_image].source_url} alt="Banner" />
          )}
        </div>
      </div>
    </section>
  );
};
