import Header from "../desktop_page_components/Header";
import { createGlobalStyle } from "styled-components";
import Hero from "../desktop_page_components/Hero.tsx";
import MainContent from "../desktop_page_components/MainContent";
import { useState } from "react";

const GlobalStyle = createGlobalStyle`
      *{
          padding:0;
          margin:0;
          box-sizing:border-box;
      }
      body{
          padding: 0px 10px 20px 10px
       }

  `;
export default function DesktopPage() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  return (
    <>
      <GlobalStyle />
      <Header isSearchVisible={true} setSearchQuery={setSearchQuery} />
      <Hero />
      <MainContent searchQuery={searchQuery} />
    </>
  );
}
