import Header from "../desktop_page_components/Header";
import { styled, createGlobalStyle } from "styled-components";
import Hero from "../desktop_page_components/Hero";
import MainContent from "../desktop_page_components/MainContent";

const GlobalStyle = createGlobalStyle`
    *{
        padding:0;
        margin:0;
        box-sizing:border-box;
    }
    body{
        padding:20px 20px
    }

`;
export default function DesktopPage() {
  return (
    <>
      <GlobalStyle />
      <Header />
      <Hero />
      <MainContent />
    </>
  );
}
