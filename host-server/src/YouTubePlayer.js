// YouTubePlayer.js
import React, { useEffect, useRef } from "react";
import io from "socket.io-client";

const YouTubePlayer = () => {
  const playerRef = useRef(null);

  useEffect(() => {
    // Load the IFrame Player API code asynchronously
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // Set up socket.io connection
    const socket = io.connect("http://localhost:3000"); // Change to your server address and port

    // Once the API is ready, create the player
    window.onYouTubeIframeAPIReady = () => {
      if (playerRef.current) {
        // safety check
        new window.YT.Player(playerRef.current, {
          height: "390",
          width: "640",
          videoId: "mTk12Ld420k", // Sample video ID, replace with yours
          events: {
            onReady: (event) => {
              // Setup socket.io listeners once the player is ready
              socket.on("play", () => {
                event.target.playVideo();
              });

              socket.on("pause", () => {
                event.target.pauseVideo();
              });
            },
          },
        });
      }
    };

    // Clean up the socket connection when the component is destroyed
    return () => {
      if (socket.connected) {
        socket.disconnect();
      }
    };
  }, []);

  return <div ref={playerRef}></div>;
};

export default YouTubePlayer;
