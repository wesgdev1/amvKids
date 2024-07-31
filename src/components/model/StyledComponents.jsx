import styled from "@emotion/styled";

export const ContainerImages = styled("div")(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  gap: "5em",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "row",
  padding: "10px",
  boxShadow: `0px 0px 10px 0px ${theme.colors.secondaryColor}`,
  borderRadius: "15px",
  marginTop: "20px",
  marginBottom: "20px",
  width: "100%",
}));
