import { useEffect, useRef } from "react";
import axios from "axios";

export const MediaFetcher = ({ imageIds = [], siteUrl, onMediaFetched }) => {
  // Ref to store already fetched image IDs
  const fetchedImageIds = useRef(new Set());

  useEffect(() => {
    const fetchMedia = async () => {
      if (!imageIds.length) {
        // console.error("No image IDs provided for MediaFetcher.");
        return;
      }

      try {
        // Filter out imageIds that have already been fetched
        const newImageIds = imageIds.filter(
          (id) => !fetchedImageIds.current.has(id)
        );

        // If no new IDs, skip fetching
        if (!newImageIds.length) {
          console.log("No new image IDs to fetch.");
          return;
        }

        // Fetch media data for the new image IDs
        const mediaData = await Promise.all(
          newImageIds.map((id) =>
            axios
              .get(`${siteUrl}/wp-json/wp/v2/media/${id}`)
              .then((res) => ({ [id]: res.data }))
          )
        );

        // Combine the fetched media
        const combinedMedia = mediaData.reduce((acc, item) => {
          return { ...acc, ...item };
        }, {});

        console.log(combinedMedia);
        // Mark these image IDs as fetched
        newImageIds.forEach((id) => fetchedImageIds.current.add(id));

        if (onMediaFetched) {
          onMediaFetched(combinedMedia);
        }
      } catch (error) {
        console.error("Error fetching media:", error);
      }
    };

    // Only fetch when imageIds change
    fetchMedia();
  }, [imageIds, onMediaFetched]);

  return null;
};
