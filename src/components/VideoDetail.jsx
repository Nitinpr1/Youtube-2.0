import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { Typography, Stack, Box } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import VideoComments from "./VideoComments";

import Videos from "./Videos";
import { fetchFromAPI } from "../utils/fetchFromAPI";

const VideoDetail = () => {
  const [videoDetail, setVideoDetail] = useState(null);
  const [videos, setVideos] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    fetchFromAPI(`videos?part=snippet,statistics&id=${id}`).then((data) =>
      setVideoDetail(data.items[0])
    );
  }, [id]);

  useEffect(() => {
    fetchFromAPI(`search?part=snippet`).then((data) => setVideos(data.items));
  }, [setVideos]);

  if (!videoDetail) {
    return <div>Loading...</div>;
  }

  const {
    snippet: { title, channelId, channelTitle },
    statistics: { viewCount, likeCount },
  } = videoDetail;

  return (
    <Box
      minHeight="95vh"
      maxWidth={{ sx: "100%", sm: "100%", md: "90%" }}
      marginTop={{ sx: "0", sm: "0", md: "10px" }}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        margin: "auto",
      }}
    >
      <Stack
        gap={{ sx: 0, sm: 0, md: 4 }}
        direction={{ xs: "column", md: "row" }}
      >
        <Box flex={1}>
          <Box
            sx={{
              width: "100%",
              marginTop: "20px",
              top: "96px",
              borderBottom: "1px solid red",
              borderRadius: "10px",
            }}
          >
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${id}`}
              className="react-player"
              controls
            />
            <Typography color="#fff" variant="h5" fontWeight="bold" p={2}>
              {title}
            </Typography>
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ color: "#fff" }}
              py={1}
              px={2}
            >
              <Link to={`/channel/${channelId}`}>
                <Typography variant="h6" color="#fff">
                  {channelTitle}
                  <CheckCircleIcon
                    sx={{ fontSize: "12px", color: "gray", ml: "5px" }}
                  />
                </Typography>
              </Link>
              <Stack direction="row" gap="20px" alignItems="center">
                <Typography variant="body1" sx={{ opacity: 0.7 }}>
                  {parseInt(viewCount).toLocaleString()} views
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.7 }}>
                  {parseInt(likeCount).toLocaleString()} likes
                </Typography>
              </Stack>
            </Stack>
          </Box>
          <VideoComments />
        </Box>
        <Box
          sx={{ overflowY: "auto", height: "100vh" }}
          px={2}
          py={{ md: 2, xs: 5 }}
          justifyContent="center"
          alignItems="center"
        >
          <Typography
            variant="h5"
            p={2}
            color="red"
            sx={{
              borderBottom: "2px solid gray",
              marginBottom: "15px",
              borderRadius: "10px",
              textAlign: "center",
              cursor: "pointer",
              boxShadow:
                "0px 2px 8px 0px rgba(224, 75, 82, 0.5), 0px 4px 16px 0px rgba(224, 75, 82, 0.5)",
            }}
          >
            Suggested for You
          </Typography>
          <Videos videos={videos} direction="column" />
        </Box>
      </Stack>
    </Box>
  );
};

export default VideoDetail;
