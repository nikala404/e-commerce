import styled from "styled-components";

const HeroStyle = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 3rem;

  img {
    height: 700px;
  }
  h1 {
    max-width: 790px;
    color: #003256;
    font-family: "Red Rose", serif;
  }
  span {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    top: 93%;
    border: none;
    font-size: 16px;
    font-family: "Red Rose", serif;
    cursor: pointer;
  }
`;
export default function Hero() {
  return (
    <HeroStyle>
      <h1>
        Welcome to our Fashion Emporium! Discover the latest trends and timeless
        classics for every occasion.
      </h1>
      <img
        src="../public/01c2e10974288f6ce356472d402adfdb-removebg-preview.png"
        alt="well_dressed_woman"
      />

      <span
        onClick={() => {
          window.scrollTo({
            top: 900,
            behavior: "smooth",
          });
        }}
      >
        <h3>Explore</h3>&darr;
      </span>
    </HeroStyle>
  );
}
