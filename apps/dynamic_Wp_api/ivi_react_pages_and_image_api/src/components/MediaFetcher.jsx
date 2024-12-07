import { useEffect } from "react";
import axios from "axios";

export const MediaFetcher = ({ imageIds = [], siteUrl, onMediaFetched }) => {
  useEffect(() => {
    const fetchMedia = async () => {
      if (!imageIds.length) {
        console.error("No image IDs provided for MediaFetcher.");
        return;
      }

      try {
        const mediaData = await Promise.all(
          imageIds.map((id) =>
            axios
              .get(`${siteUrl}/wp-json/wp/v2/media/${id}`)
              .then((res) => ({ [id]: res.data }))
          )
        );

        // Combine fetched media into a single object
        const combinedMedia = mediaData.reduce((acc, item) => {
          return { ...acc, ...item };
        }, {});

        // Pass the media data to the parent component
        if (onMediaFetched) {
          onMediaFetched(combinedMedia);
        }
      } catch (error) {
        console.error("Error fetching media:", error);
      }
    };

    fetchMedia();
  }, [imageIds, siteUrl, onMediaFetched]);

  return null; // Render nothing
};
