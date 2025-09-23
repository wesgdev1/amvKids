export const Homevideo = () => {
  return (
    <div>
      {/* insertare el url de un video con la etiqueta video*/}
      <video width="100%" height="auto" autoPlay loop muted playsInline>
        <source
          src="https://res.cloudinary.com/djrdozcdw/video/upload/v1758313511/V%C3%ADdeo_sin_t%C3%ADtulo_1_axdnpg.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};
