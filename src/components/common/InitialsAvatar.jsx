import PropTypes from "prop-types";
import styled from "styled-components";

const COLORS = [
  { bg: "#ede8f7", text: "#5a2d9e" },
  { bg: "#e3f4fd", text: "#2d7fa8" },
  { bg: "#e8fae0", text: "#3a8c1e" },
];

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background-color: ${({ $bg }) => $bg};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 0.85rem;
  color: ${({ $text }) => $text};
  flex-shrink: 0;
  letter-spacing: 0.5px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const InitialsAvatar = ({ name }) => {
  const color = COLORS[(name?.charCodeAt(0) || 0) % COLORS.length];
  return (
    <Wrapper>
      <Avatar $bg={color.bg} $text={color.text}>
        {name?.charAt(0).toUpperCase()}
        {name?.charAt(1).toUpperCase()}
      </Avatar>
      <strong>{name}</strong>
    </Wrapper>
  );
};

InitialsAvatar.propTypes = {
  name: PropTypes.string.isRequired,
};
