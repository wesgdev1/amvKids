export const Homevideo = () => {
  return (
    <div>
      {/* insertare el url de un video con la etiqueta video*/}
      <video width="100%" height="auto" autoPlay loop muted playsInline>
        <source
          src="https://hype.com.co/cdn/shop/videos/c/vp/b856b2f83fc64eab87da8af202219d5f/b856b2f83fc64eab87da8af202219d5f.HD-720p-4.5Mbps-44955249.mp4?v=0"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};
