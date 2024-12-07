import { useEffect, useState } from "react";
import axios from "axios";

export const Feature = ({ props, siteUrl }) => {
  const [featureBgImage, setFeatureBgImage] = useState(null);
  const [cardData, setCardData] = useState([]);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        // Fetch background image and card icons concurrently
        const bgImagePromise = axios.get(
          `${siteUrl}/wp-json/wp/v2/media/${props.background_image}`
        );
        const cardIconsPromise = Promise.all(
          props.card_blocks.map((card) =>
            axios.get(`${siteUrl}/wp-json/wp/v2/media/${card.icon}`)
          )
        );

        const [bgImageResponse, cardIconsResponses] = await Promise.all([
          bgImagePromise,
          cardIconsPromise,
        ]);

        // Set background image
        setFeatureBgImage(bgImageResponse.data);

        // Map card data with icons
        const updatedCardData = props.card_blocks.map((card, index) => ({
          ...card,
          iconUrl: cardIconsResponses[index]?.data?.source_url || null,
        }));

        setCardData(updatedCardData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchMedia();
  }, [props.background_image, props.card_blocks, siteUrl]);

  return (
    <section
      className="see_cards_sec features_sec hero pt_100 pb_100"
      style={{
        "--bgImage": featureBgImage
          ? `url(${featureBgImage.source_url})`
          : "none",
      }}
    >
      <div className="container">
        <h3 className="hdng fs_64 mb_60">{props.heading}</h3>
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
                  <h4 className="hdng fs_48">{card.heading}</h4>
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
