import React, { useCallback, useContext, useEffect } from "react";
import Hero from "../components/Hero";
import Mission from "../components/Mission";
import About from "../components/About";
import Contact from "../components/Contact";
import { Helmet } from "react-helmet";
import OurMission from "../components/OurMission";
import OurProgram from "../components/OurProgram";
import Outreach from "../components/Outreach";
import { GlobalContext } from "../constant/context/GlobalContext";
import styles from "../style/Navigation.module.css";
import { FaVoteYea } from "react-icons/fa";

const HomePage = () => {
  const { program, openEmailModal } = useContext(GlobalContext);

  useEffect(() => {}, []);
  return (
    <section>
      <Helmet>
        <title>Home - CYON St George</title>
      </Helmet>
      <div className={styles.voteDiv}>
        {program.title === "Election" && (
          <FaVoteYea className={styles.vote} onClick={openEmailModal} />
        )}
      </div>
      <Hero />
      <Mission />
      <About id="about" />
      <OurProgram id="programs" />
      <Contact id="contact" />
      <OurMission />
      <Outreach />
    </section>
  );
};

export default HomePage;
