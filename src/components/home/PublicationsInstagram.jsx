import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { motion } from "framer-motion";

// Versión simple para debugging
const SimpleDebugContainer = styled.div`
  width: 100%;
  background: red;
  color: white;
  padding: 2rem;
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  padding: 3rem 1rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 100%;
  min-height: 80vh;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")
      repeat;
    opacity: 0.1;
  }

  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
`;

const Title = styled(motion.h2)`
  font-size: 3rem;
  font-weight: 700;
  color: white;
  text-align: center;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  position: relative;
  z-index: 2;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }

  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.9);
  text-align: center;
  margin-bottom: 3rem;
  max-width: 600px;
  position: relative;
  z-index: 2;

  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin-bottom: 2rem;
  }
`;

const PostsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  width: 100%;
  position: relative;
  z-index: 2;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    padding: 0 1rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const PostCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 1.5rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 30px 60px rgba(0, 0, 0, 0.2);
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(
      90deg,
      #ff6b6b,
      #4ecdc4,
      #45b7d1,
      #96ceb4,
      #feca57
    );
    background-size: 200% 100%;
    animation: shimmer 3s infinite linear;
  }

  @keyframes shimmer {
    0% {
      background-position: -200% 0;
    }
    100% {
      background-position: 200% 0;
    }
  }
`;

const PostHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const InstagramIcon = styled.div`
  width: 40px;
  height: 40px;
  background: linear-gradient(
    45deg,
    #f09433 0%,
    #e6683c 25%,
    #dc2743 50%,
    #cc2366 75%,
    #bc1888 100%
  );
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  &::before {
    content: "📷";
    font-size: 20px;
    filter: brightness(0) invert(1);
  }
`;

const PostInfo = styled.div`
  flex: 1;
`;

const Username = styled.h4`
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
`;

const PostType = styled.span`
  font-size: 0.9rem;
  color: #666;
  background: #f0f0f0;
  padding: 0.2rem 0.6rem;
  border-radius: 12px;
  display: inline-block;
`;

const EmbedContainer = styled.div`
  position: relative;
  width: 100%;
  height: 300px;
  border-radius: 15px;
  overflow: hidden;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;

  &:hover {
    border: 2px solid #667eea;
    box-shadow: 0 10px 25px rgba(102, 126, 234, 0.2);
    transform: scale(1.02);
  }
`;

const PreviewImage = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, #667eea, #764ba2);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2rem;
  font-weight: 600;
  text-align: center;
  padding: 2rem;
  position: relative;

  &::before {
    content: "📱";
    font-size: 4rem;
    margin-bottom: 1rem;
    animation: bounce 2s infinite;
  }

  @keyframes bounce {
    0%,
    20%,
    50%,
    80%,
    100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-10px);
    }
    60% {
      transform: translateY(-5px);
    }
  }
`;

const PlayIcon = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60px;
  height: 60px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: #667eea;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;

  &:hover {
    transform: translate(-50%, -50%) scale(1.1);
    background: white;
  }

  &::before {
    content: "▶";
    margin-left: 3px;
  }
`;

const ViewButton = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
  text-decoration: none;
  padding: 0.8rem 1.5rem;
  border-radius: 25px;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);

  &:hover {
    background: linear-gradient(45deg, #764ba2, #667eea);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
    color: white;
    text-decoration: none;
  }

  &::after {
    content: "↗";
    font-size: 1.1rem;
  }
`;

const LoadingSpinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const PublicationsInstagram = () => {
  const [loading, setLoading] = useState(false); // Deshabilitado el loading para debugging
  const [debugMode, setDebugMode] = useState(true); // Modo debug activado

  const instagramPosts = [
    {
      id: 1,
      url: "https://www.instagram.com/reel/DNyStYO4skr/",
      title: "¡Descubre nuestro último reel!",
      description: "Toca para ver en Instagram",
    },
    {
      id: 2,
      url: "https://www.instagram.com/reel/DNn30-dRzVs/",
      title: "¡Mira nuestros nuevos diseños!",
      description: "Contenido exclusivo te espera",
    },
    {
      id: 3,
      url: "https://www.instagram.com/reel/DMYhtB8yDoI/",
      title: "¡Tendencias que te encantarán!",
      description: "No te pierdas este increíble contenido",
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500); // Reducido a 500ms para debugging

    return () => clearTimeout(timer);
  }, []);

  // Si estamos en modo debug, mostramos un componente simple
  if (debugMode) {
    return (
      <SimpleDebugContainer>
        <div>
          <div>🌟 COMPONENTE INSTAGRAM FUNCIONANDO 🌟</div>
          <div style={{ fontSize: "1rem", marginTop: "1rem" }}>
            Si ves esto, el componente se está renderizando correctamente
          </div>
          <button
            onClick={() => setDebugMode(false)}
            style={{
              marginTop: "1rem",
              padding: "10px 20px",
              background: "white",
              color: "red",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "1rem",
            }}
          >
            Ver Versión Final
          </button>
        </div>
      </SimpleDebugContainer>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  if (loading) {
    return (
      <Container>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1rem",
            color: "white",
          }}
        >
          <LoadingSpinner />
          <p style={{ fontSize: "1.2rem", fontWeight: "600" }}>
            Cargando publicaciones increíbles...
          </p>
        </motion.div>
      </Container>
    );
  }

  return (
    <Container>
      {/* Texto de debugging */}
      <div
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          background: "red",
          color: "white",
          padding: "5px",
          zIndex: 1000,
          fontSize: "12px",
        }}
      >
        DEBUG: Componente Instagram cargado
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          zIndex: 10,
        }}
      >
        <Title variants={itemVariants}>🌟 Síguenos en Instagram</Title>

        <Subtitle variants={itemVariants}>
          Descubre nuestras últimas publicaciones y mantente al día con las
          tendencias más cool
        </Subtitle>

        <PostsGrid variants={itemVariants}>
          {instagramPosts.map((post, index) => (
            <PostCard
              key={post.id}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                animationDelay: `${index * 0.2}s`,
              }}
            >
              <PostHeader>
                <InstagramIcon />
                <PostInfo>
                  <Username>@amvkids</Username>
                  <PostType>Reel de Instagram</PostType>
                </PostInfo>
              </PostHeader>

              <EmbedContainer onClick={() => window.open(post.url, "_blank")}>
                <PreviewImage>
                  <div style={{ marginTop: "1rem" }}>{post.title}</div>
                  <div
                    style={{
                      fontSize: "1rem",
                      opacity: 0.9,
                      marginTop: "0.5rem",
                    }}
                  >
                    {post.description}
                  </div>
                </PreviewImage>
                <PlayIcon />
              </EmbedContainer>

              <ViewButton
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Ver en Instagram
              </ViewButton>
            </PostCard>
          ))}
        </PostsGrid>

        <motion.div
          variants={itemVariants}
          style={{
            marginTop: "3rem",
            textAlign: "center",
          }}
        >
          <ViewButton
            href="https://www.instagram.com/amvkids/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              fontSize: "1.1rem",
              padding: "1rem 2rem",
              background: "linear-gradient(45deg, #ff6b6b, #4ecdc4)",
              boxShadow: "0 6px 20px rgba(255, 107, 107, 0.3)",
            }}
          >
            🚀 Síguenos para más contenido
          </ViewButton>
        </motion.div>
      </motion.div>
    </Container>
  );
};

export default PublicationsInstagram;
