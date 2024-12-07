import { useState } from "react";
import { MediaFetcher } from "../MediaFetcher";

export const Feature = ({ props, siteUrl }) => {
  const [featureBgImage, setFeatureBgImage] = useState(null);
  const [cardData, setCardData] = useState([]);

  // Image IDs to fetch
  const imageIds = [
    props.background_image,
    ...props.card_blocks.map((card) => card.icon),
  ];

  // Handle media data once fetched
  const handleMediaFetched = (media) => {
    if (!media) return;

    // Set the background image
    setFeatureBgImage(media[props.background_image]);

    // Map card blocks with icons
    const updatedCardData = props.card_blocks.map((card) => ({
      ...card,
      iconUrl: media[card.icon]?.source_url || null,
    }));

    setCardData(updatedCardData);
  };

  return (
    <section
      className="see_cards_sec features_sec hero pt_100 pb_100"
      style={{
        "--bgImage": featureBgImage
          ? `url(${featureBgImage.source_url})`
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
        <h3
          className="hdng fs_64 mb_60"
          dangerouslySetInnerHTML={{ __html: props.heading }}
        ></h3>

        <div className="feature_cards">
          <div className="row">
            {cardData.map((card, index) => (
              <div className="col-md-6 col-lg-3" key={index}>
                <div className="feature_card">
                  <span className="icon">
                    {card.iconUrl ? (
                      <img src={card.iconUrl} alt="Feature Icon" />
                    ) : (
                      <p>Loading...</p>
                    )}
                  </span>
                  <h4
                    className="hdng fs_48"
                    dangerouslySetInnerHTML={{ __html: card.heading }}
                  ></h4>
                  <p>{card.editor}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
