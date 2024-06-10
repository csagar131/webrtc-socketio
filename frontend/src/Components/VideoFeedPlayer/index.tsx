import { useEffect, useRef } from "react";

const VideoFeedPlayer = ({ stream }: { stream: MediaStream | undefined }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (stream && videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);
  return (
    <div>
      <video ref={videoRef} autoPlay muted />
    </div>
  );
};

export default VideoFeedPlayer;
