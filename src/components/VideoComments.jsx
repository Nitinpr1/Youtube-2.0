import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchFromAPI } from "../utils/fetchFromAPI";
import { Typography, Stack, Box, Button } from "@mui/material";

const VideoComments = () => {
  const { id } = useParams();

  const [comments, setComments] = useState(null);
  const [showAllComments, setShowAllComments] = useState(false);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const data = await fetchFromAPI(
          `commentThreads?part=snippet&videoId=${id}&maxResults=100`
        );

        if (data && data.items) {
          const commentItems = data.items.map((item) => ({
            author: item.snippet.topLevelComment.snippet.authorDisplayName,
            text: item.snippet.topLevelComment.snippet.textDisplay,
          }));
          setComments(commentItems);
        } else {
          console.log("No comments available.");
          setComments([]);
        }
      } catch (error) {
        console.log("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [id]);

  if (!comments) {
    return <div>Loading...</div>;
  }

  const toggleShowAllComments = () => {
    setShowAllComments(!showAllComments);
  };

  return (
    <Box mt={4}>
      <Stack direction="column" py={1} px={2} sx={{ color: "white" }}>
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "30px",
            }}
          >
            <Typography variant="h4">Comments</Typography>
            <Button variant="contained" onClick={toggleShowAllComments}>
              {showAllComments ? "Hide Comments" : "Show All Comments"}
            </Button>
          </div>
          <div>
            {comments.length > 0 && (
              <div>
                <strong>{comments[0].author}</strong>:
                <div dangerouslySetInnerHTML={{ __html: comments[0].text }} />
              </div>
            )}
            {showAllComments && (
              <div>
                {comments.slice(1).map((comment, index) => (
                  <div key={index}>
                    <strong>{comment.author}</strong>:
                    <div dangerouslySetInnerHTML={{ __html: comment.text }} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </Stack>
    </Box>
  );
};

export default VideoComments;
