import React from "react";
import Hero from "../components/Hero";
import { Helmet } from "react-helmet";
import OurHistory from "../components/OurHistory";

const AboutPage = () => {
  return (
    <main>
      <Helmet>
        <title>About - CYON St George</title>
      </Helmet>
      <Hero title="About" />
      <OurHistory />
    </main>
  );
};

export default AboutPage;
