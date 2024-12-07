import { useState, useEffect } from "react";
import axios from "axios";
import { MediaFetcher } from "../MediaFetcher";

export const EventPosts = ({ props, siteUrl }) => {
  // Extract post_type from props
  const postType = props.post_type;
  console.log("Post Type:", postType);

  // State to store the fetched posts and loading/error states
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [postsImages, setPostsImages] = useState([]); // State to hold post images

  // Fetch posts when the component mounts or when the postType changes
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Fetch posts based on the custom post type
        const response = await axios.get(
          `${siteUrl}/wp-json/wp/v2/${postType}`
        );

        // Store the fetched posts in state
        setPosts(response.data);
      } catch (err) {
        setError("Error fetching posts");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    // Fetch posts only if postType is available
    if (postType) {
      fetchPosts();
    } else {
      setError("Invalid post type");
      setLoading(false);
    }
  }, [postType, siteUrl]); // Re-run the effect when postType or siteUrl changes

  // Extract image IDs to fetch
  useEffect(() => {
    if (posts.length > 0) {
      const imageIds = posts.map((post) => post.featured_media); // Using 'featured_media' as the image ID
      setPostsImages(imageIds);
    }
  }, [posts]); // Re-run the effect when posts change

  // Handle media data once fetched
  const handleMediaFetched = (media) => {
    if (!media) return;

    // Map posts to include the fetched media (e.g., featured image URLs)
    const updatedPosts = posts.map((post) => {
      const featuredImage = media[post.featured_media]; // Get the media object based on the 'featured_media' ID

      return {
        ...post,
        featured_image_url: featuredImage ? featuredImage.source_url : null, // Save the image URL
      };
    });

    // Update posts with their featured image URLs
    setPosts(updatedPosts);
  };

  // Display loading or error messages
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      {/* Fetch media using MediaFetcher */}
      <MediaFetcher
        imageIds={postsImages} // Pass the list of image IDs to MediaFetcher
        siteUrl={siteUrl}
        onMediaFetched={handleMediaFetched} // Handle the fetched media
      />

      {/* Render posts */}
      {posts.length > 0 ? (
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              {/* Display the featured image if available */}
              {post.featured_image_url && (
                <img src={post.featured_image_url} alt={post.title.rendered} />
              )}
              <h2>{post.title.rendered}</h2>
              <div
                dangerouslySetInnerHTML={{ __html: post.content.rendered }}
              />
              <a href={post.link} className="">
                Read more
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p>No posts found for this post type.</p>
      )}
    </div>
  );
};
