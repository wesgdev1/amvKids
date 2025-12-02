import { useRef } from "react";

export const Homevideo = () => {
  const videoRef = useRef(null);

  const handleEnded = () => {
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = 0;
    video.play();
  };
  return (
    <div>
      {/* insertare el url de un video con la etiqueta video*/}
      <video
        ref={videoRef}
        width="100%"
        height="auto"
        autoPlay
        muted
        playsInline
        preload="metadata"
        onEnded={handleEnded}
      >
        <source
          src="https://res.cloudinary.com/dl6n9lrrm/video/upload/f_auto,q_auto/v1764706797/V%C3%ADdeo_sin_t%C3%ADtulo_1_axdnpg_ppy4dw.mp4

"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};
