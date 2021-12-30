import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { GlobalStyle } from "../common";
import Home from '../Pages/Home';
import Items from '../Items/Items';
import { HelmetProvider, Helmet } from "react-helmet-async";
import Header from "../Header";

const CenterDiv = styled.div`
  align: center;
  max-width: 960px;
  margin-top: 0;
  margin: auto;
`;

function Head() {
  const { i18n, t } = useTranslation();

  return (
    <Helmet htmlAttributes={{ lang: i18n.language }}>
      <title>{t("app_name")}</title>
      <meta name="description" content={t("app_description")} />
    </Helmet>
  );
}

function DefaultSwitch() {
  return (
    <Routes>
      <Route path="/items" element={<Items />} />
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

function Content() {
  return (
    <>
      <CenterDiv>
        <Header />
        <DefaultSwitch />
      </CenterDiv>
    </>
  );
}

/**
 * The main application component.
 * It provides a suspense fallback for react-i18next, translated head content via react-helmet-async, an app header, and routing.
 */
export default function App() {
  return (
    <Suspense fallback="loading">
      <HelmetProvider>
        <Head />
        <GlobalStyle />
        <Content />
      </HelmetProvider>
    </Suspense>
  );
}