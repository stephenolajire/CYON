import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
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
import Swal from "sweetalert2";

const HomePage = () => {
  const navigate = useNavigate(); // Initialize navigate function
  const { program, openEmailModal } = useContext(GlobalContext);
  const [isElectionClosed, setIsElectionClosed] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    if (program?.date_created) {
      const createdDate = new Date(program.date_created);
      const closingTime = new Date(createdDate.getTime() + 24 * 60 * 60 * 1000); // Add 24 hours

      const updateCountdown = () => {
        const now = new Date();
        const timeDifference = closingTime - now;

        if (timeDifference <= 0) {
          setIsElectionClosed(true);
          setTimeLeft(null);
        } else {
          const hours = Math.floor(timeDifference / (1000 * 60 * 60));
          const minutes = Math.floor(
            (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
          );
          const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
          setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
        }
      };

      updateCountdown();
      const timerInterval = setInterval(updateCountdown, 1000);

      return () => clearInterval(timerInterval);
    }
  }, [program?.date_created]);

  const handleClick = () => {
    if (isElectionClosed) {
      Swal.fire({
        icon: "info",
        title: "Election Closed",
        text: "Do you want to view the results?",
        showCancelButton: true,
        confirmButtonText: "Yes, View Results",
        cancelButtonText: "No, Close",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/results"); // Redirect to results page
        }
      });
    }
  };

  return (
    <section>
      <Helmet>
        <title>Home - CYON St George</title>
      </Helmet>
      <div className={styles.voteDiv}>
        {program?.title === "Election" && (
          <div onClick={handleClick}>
            <FaVoteYea
              className={styles.vote}
              onClick={!isElectionClosed ? openEmailModal : null}
              style={{
                cursor: isElectionClosed ? "not-allowed" : "pointer",
                opacity: isElectionClosed ? 0.5 : 1,
              }}
            />
          </div>
        )}
        {!isElectionClosed && timeLeft && (
          <p className={styles.countDown}>{timeLeft}</p>
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
