import React from "react";
import styled from "styled-components";

const BrandsContainer = styled.section`
  min-height: 80vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 3rem 2rem;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    min-height: 70vh;
    padding: 2rem 1rem;
  }
`;

const FloatingEmoji = styled.div`
  position: absolute;
  font-size: ${(props) => props.size || "2rem"};
  opacity: 0.6;
  animation: float ${(props) => props.duration || "6s"} ease-in-out infinite;
  animation-delay: ${(props) => props.delay || "0s"};
  z-index: 1;

  @keyframes float {
    0%,
    100% {
      transform: translateY(0px) rotate(0deg);
      opacity: 0.3;
    }
    25% {
      transform: translateY(-20px) rotate(5deg);
      opacity: 0.6;
    }
    50% {
      transform: translateY(-40px) rotate(-5deg);
      opacity: 0.8;
    }
    75% {
      transform: translateY(-20px) rotate(3deg);
      opacity: 0.6;
    }
  }
`;

const AnimatedBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 1;
`;

const Title = styled.h2`
  font-size: 2.8rem;
  font-weight: 800;
  color: white;
  text-align: center;
  margin-bottom: 1.5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  letter-spacing: -0.02em;
  position: relative;
  z-index: 2;

  @media (max-width: 768px) {
    font-size: 2.2rem;
    margin-bottom: 1rem;
  }

  @media (max-width: 480px) {
    font-size: 1.8rem;
  }
`;

const BrandsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
  max-width: 1000px;
  width: 100%;
  position: relative;
  z-index: 2;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 1.2rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    max-width: 100%;
  }
`;

const BrandCard = styled.a`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 1.8rem 1.5rem;
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 160px;
  position: relative;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  border: 2px solid transparent;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);

  @media (max-width: 480px) {
    padding: 1.5rem 1rem;
    min-height: 140px;
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.4),
      transparent
    );
    transition: left 0.5s;
  }

  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
    border-color: rgba(255, 255, 255, 0.3);

    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(-4px) scale(0.98);
  }
`;

const BrandLogo = styled.div`
  font-size: 2rem;
  font-weight: 900;
  margin-bottom: 0.8rem;
  text-transform: uppercase;
  letter-spacing: -0.05em;
  background: ${(props) => props.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  position: relative;
  z-index: 1;

  @media (max-width: 480px) {
    font-size: 1.5rem;
    margin-bottom: 0.6rem;
  }
`;

const BrandDescription = styled.p`
  font-size: 0.9rem;
  color: #666;
  text-align: center;
  margin: 0;
  font-weight: 500;
  opacity: 0.8;

  @media (max-width: 480px) {
    font-size: 0.8rem;
    line-height: 1.3;
  }
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.9);
  text-align: center;
  margin-bottom: 2rem;
  font-weight: 300;
  position: relative;
  z-index: 2;

  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 1.5rem;
  }
`;

const brands = [
  {
    name: "Nike",
    description: "Just Do It - Innovación y rendimiento",
    gradient: "linear-gradient(45deg, #FF6B6B, #FF8E53)",
    link: "https://amvkids.com.co/productos?filtersBrand=Nike",
  },
  {
    name: "Adidas",
    description: "Impossible is Nothing - Estilo deportivo",
    gradient: "linear-gradient(45deg, #4ECDC4, #44A08D)",
    link: "https://amvkids.com.co/productos?filtersBrand=Adidas",
  },
  {
    name: "New Balance",
    description: "Endorsed by No One - Calidad premium",
    gradient: "linear-gradient(45deg, #667eea, #764ba2)",
    link: "https://amvkids.com.co/productos?filtersBrand=New%20Balance",
  },
  {
    name: "Puma",
    description: "Forever Faster - Velocidad y agilidad",
    gradient: "linear-gradient(45deg, #f093fb, #f5576c)",
    link: "https://amvkids.com.co/productos?filtersBrand=Puma",
  },
  {
    name: "Coach",
    description: "  Elegancia y lujo atemporal",
    gradient: "linear-gradient(45deg, #ffecd2, #fcb69f)",
    link: "https://amvkids.com.co/productos?filtersBrand=Coach",
  },
  {
    name: "Vans",
    description: "Off The Wall - Cultura skate auténtica",
    gradient: "linear-gradient(45deg, #a8edea, #fed6e3)",
    link: "https://www.vans.com",
  },
];

// Emojis y elementos animados para el fondo
const floatingElements = [
  {
    emoji: "👟",
    top: "10%",
    left: "5%",
    size: "2.5rem",
    duration: "8s",
    delay: "0s",
  },
  {
    emoji: "👠",
    top: "20%",
    right: "10%",
    size: "2rem",
    duration: "7s",
    delay: "1s",
  },
  {
    emoji: "🥾",
    top: "70%",
    left: "8%",
    size: "2.2rem",
    duration: "9s",
    delay: "2s",
  },
  {
    emoji: "👡",
    top: "80%",
    right: "15%",
    size: "1.8rem",
    duration: "6s",
    delay: "3s",
  },
  {
    emoji: "🩴",
    top: "15%",
    left: "85%",
    size: "2rem",
    duration: "7.5s",
    delay: "1.5s",
  },
  {
    emoji: "👢",
    top: "60%",
    right: "5%",
    size: "2.3rem",
    duration: "8.5s",
    delay: "2.5s",
  },
  {
    emoji: "⚡",
    top: "30%",
    left: "15%",
    size: "1.5rem",
    duration: "5s",
    delay: "0.5s",
  },
  {
    emoji: "💨",
    top: "50%",
    right: "25%",
    size: "1.8rem",
    duration: "6s",
    delay: "1.8s",
  },
  {
    emoji: "🔥",
    top: "40%",
    left: "75%",
    size: "1.6rem",
    duration: "5.5s",
    delay: "3.2s",
  },
  {
    emoji: "⭐",
    top: "25%",
    left: "45%",
    size: "1.4rem",
    duration: "7s",
    delay: "2.8s",
  },
  {
    emoji: "💎",
    top: "65%",
    left: "60%",
    size: "1.7rem",
    duration: "8s",
    delay: "4s",
  },
  {
    emoji: "🏃‍♂️",
    top: "35%",
    right: "40%",
    size: "2rem",
    duration: "9s",
    delay: "1.2s",
  },
];

const Brands = () => {
  return (
    <BrandsContainer>
      <AnimatedBackground>
        {floatingElements.map((element, index) => (
          <FloatingEmoji
            key={index}
            size={element.size}
            duration={element.duration}
            delay={element.delay}
            style={{
              top: element.top,
              left: element.left,
              right: element.right,
            }}
          >
            {element.emoji}
          </FloatingEmoji>
        ))}
      </AnimatedBackground>

      <Title>Explora Nuestras Marcas</Title>
      <Subtitle>
        Descubre la colección más exclusiva de las mejores marcas del mundo
      </Subtitle>
      <BrandsGrid>
        {brands.map((brand, index) => (
          <BrandCard key={index} href={brand.link} rel="noopener noreferrer">
            <BrandLogo gradient={brand.gradient}>{brand.name}</BrandLogo>
            <BrandDescription>{brand.description}</BrandDescription>
          </BrandCard>
        ))}
      </BrandsGrid>
    </BrandsContainer>
  );
};

export default Brands;
