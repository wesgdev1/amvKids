import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";

/* ─── animations ─────────────────────────────────────────── */
const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

/* ─── section ─────────────────────────────────────────────── */
const Section = styled.section`
  width: 100%;
  background: linear-gradient(150deg, #f5f7ff 0%, #ede9ff 55%, #faf0ff 100%);
  padding: 5rem 1.5rem 4rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    width: 600px;
    height: 600px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(102,126,234,0.08) 0%, transparent 70%);
    top: -150px;
    right: -150px;
    pointer-events: none;
  }

  &::after {
    content: "";
    position: absolute;
    width: 400px;
    height: 400px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(118,75,162,0.07) 0%, transparent 70%);
    bottom: -100px;
    left: -80px;
    pointer-events: none;
  }
`;

/* ─── header ──────────────────────────────────────────────── */
const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  position: relative;
  z-index: 2;
  animation: ${fadeUp} 0.6s ease both;
`;

const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: rgba(102, 126, 234, 0.1);
  color: #667eea;
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 0.35rem 1rem;
  border-radius: 50px;
  border: 1px solid rgba(102, 126, 234, 0.2);
  margin-bottom: 1rem;
`;

const Title = styled.h2`
  font-size: clamp(1.9rem, 4.5vw, 3rem);
  font-weight: 800;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0 0 0.7rem;
  letter-spacing: -0.5px;
`;

const Subtitle = styled.p`
  color: #8892b0;
  font-size: 1rem;
  margin: 0;
`;

/* ─── grid ────────────────────────────────────────────────── */
const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.6rem;
  max-width: 1020px;
  margin: 0 auto;
  position: relative;
  z-index: 2;

  @media (max-width: 860px) {
    grid-template-columns: repeat(2, 1fr);
    max-width: 640px;
  }

  @media (max-width: 540px) {
    grid-template-columns: 1fr;
    max-width: 340px;
  }
`;

/* ─── card ────────────────────────────────────────────────── */
const Card = styled(motion.a)`
  display: flex;
  flex-direction: column;
  text-decoration: none;
  border-radius: 22px;
  overflow: hidden;
  background: #fff;
  border: 1.5px solid rgba(102, 126, 234, 0.12);
  box-shadow: 0 4px 20px rgba(102, 126, 234, 0.08);
  transition: border-color 0.25s, box-shadow 0.25s;
  position: relative;

  &:hover {
    border-color: rgba(102, 126, 234, 0.35);
    box-shadow: 0 12px 40px rgba(102, 126, 234, 0.18);
  }

  &::before {
    content: "";
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 3px;
    background: linear-gradient(90deg, #667eea, #764ba2, #4ecdc4);
    border-radius: 22px 22px 0 0;
    z-index: 3;
  }
`;

/* ─── iframe area ─────────────────────────────────────────── */
const VideoArea = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 177%;
  background: linear-gradient(135deg, #f0f2ff 0%, #f8f0ff 100%);
  overflow: hidden;
`;

const StyledIframe = styled.iframe`
  position: absolute;
  top: 0; left: 0;
  width: 100%;
  height: 100%;
  border: none;
  pointer-events: none; /* clicks handled by card <a> */
`;

const Spinner = styled.div`
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  width: 32px; height: 32px;
  border: 3px solid rgba(102, 126, 234, 0.2);
  border-top-color: #667eea;
  border-radius: 50%;
  animation: ${spin} 0.9s linear infinite;
`;

const HoverOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, transparent 50%, rgba(102,126,234,0.75) 100%);
  opacity: 0;
  transition: opacity 0.25s;
  display: flex;
  align-items: flex-end;
  padding: 1rem 1.1rem;
  z-index: 4;

  ${Card}:hover & {
    opacity: 1;
  }
`;

const WatchLabel = styled.span`
  color: #fff;
  font-size: 0.88rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 0.35rem;

  &::after { content: "↗"; font-size: 1rem; }
`;

/* ─── card footer ─────────────────────────────────────────── */
const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.85rem 1rem;
  background: #fafbff;
  border-top: 1px solid rgba(102, 126, 234, 0.08);
`;

const Handle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Dot = styled.div`
  width: 28px; height: 28px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea, #764ba2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.78rem;
  font-weight: 800;
  color: #fff;
  flex-shrink: 0;
`;

const HandleText = styled.span`
  color: #5a6a8a;
  font-size: 0.8rem;
  font-weight: 600;
`;

const Pill = styled.span`
  background: linear-gradient(135deg, rgba(102,126,234,0.1), rgba(118,75,162,0.1));
  color: #764ba2;
  border: 1px solid rgba(118, 75, 162, 0.2);
  border-radius: 20px;
  padding: 0.22rem 0.65rem;
  font-size: 0.73rem;
  font-weight: 700;
`;

/* ─── CTA ─────────────────────────────────────────────────── */
const CTARow = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2.8rem;
  position: relative;
  z-index: 2;
`;

const CTAButton = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.85rem 2.2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  font-weight: 700;
  font-size: 0.95rem;
  text-decoration: none;
  border-radius: 50px;
  box-shadow: 0 6px 22px rgba(102, 126, 234, 0.3);
  transition: box-shadow 0.25s;

  &:hover {
    box-shadow: 0 10px 32px rgba(102, 126, 234, 0.45);
    color: #fff;
    text-decoration: none;
  }
`;

/* ─── lazy iframe ─────────────────────────────────────────── */
const LazyEmbed = ({ videoId }) => {
  const [visible, setVisible] = useState(false);
  const [ready, setReady] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <VideoArea ref={ref}>
      {!ready && <Spinner />}
      {visible && (
        <StyledIframe
          src={`https://www.tiktok.com/embed/v2/${videoId}`}
          title={`TikTok ${videoId}`}
          allow="encrypted-media"
          loading="lazy"
          tabIndex={-1}
          scrolling="no"
          onLoad={() => setReady(true)}
        />
      )}
      <HoverOverlay>
        <WatchLabel>Ver en TikTok</WatchLabel>
      </HoverOverlay>
    </VideoArea>
  );
};

/* ─── data ────────────────────────────────────────────────── */
const videos = [
  { id: "7632802884165455124", url: "https://www.tiktok.com/@amv__kids/video/7632802884165455124" },
  { id: "7632125681165470997", url: "https://www.tiktok.com/@amv__kids/video/7632125681165470997" },
  { id: "7606542966060027156", url: "https://www.tiktok.com/@amv__kids/video/7606542966060027156" },
];

/* ─── component ───────────────────────────────────────────── */
export const TikTolFeed = () => (
  <Section>
    <Header>
      <Badge>🎵 TikTok</Badge>
      <Title>Últimos videos</Title>
      <Subtitle>Conoce lo que está pasando en nuestro TikTok ✨</Subtitle>
    </Header>

    <Grid
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.05 }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.14 } },
      }}
    >
      {videos.map((v) => (
        <Card
          key={v.id}
          href={v.url}
          target="_blank"
          rel="noopener noreferrer"
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
          }}
          whileHover={{ y: -5 }}
          transition={{ type: "spring", stiffness: 280, damping: 22 }}
        >
          <LazyEmbed videoId={v.id} />

          <Footer>
            <Handle>
              <Dot>A</Dot>
              <HandleText>@amv__kids</HandleText>
            </Handle>
            <Pill>▶ TikTok</Pill>
          </Footer>
        </Card>
      ))}
    </Grid>

    <CTARow>
      <CTAButton
        href="https://www.tiktok.com/@amv__kids"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
      >
        🎵 Seguir en TikTok
      </CTAButton>
    </CTARow>
  </Section>
);
