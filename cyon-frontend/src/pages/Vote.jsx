import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../style/Vote.module.css"; // Importing CSS module
import api from "../constant/api/api";
import Swal from "sweetalert2";

const Vote = () => {
  const [candidates, setCandidates] = useState([]);
  const [votedPosts, setVotedPosts] = useState(new Set()); // Tracks posts that have been voted on

  // Fetch candidates when the component loads
  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await api.get("candidates");
        setCandidates(response.data);
        // console.log(response.data);
      } catch (error) {
        console.error("Error fetching candidates:", error);
      }
    };
    fetchCandidates();
  }, []);

  // Handle voting
  const handleVote = async (candidateId, post) => {
    try {
      await api.post(`vote/${candidateId}/`); // Update with your vote endpoint
      setVotedPosts((prev) => new Set(prev.add(post)));

      // Update votes locally
      setCandidates((prevCandidates) =>
        prevCandidates.map((candidate) =>
          candidate.id === candidateId
            ? { ...candidate, votes: candidate.votes + 1 }
            : candidate
        )
      );
    } catch (error) {
      Swal.fire({
              title: "Voting Failed!",
              icon: "error",
              text:
                error.response?.data?.message || "You have already Voted.",
              showClass: {
                popup: `
                      animate__animated
                      animate__fadeInUp
                      animate__faster
                  `,
              },
              hideClass: {
                popup: `
                      animate__animated
                      animate__fadeOutDown
                      animate__faster
                  `,
              },
            });
      
    }
  };

  // Group candidates by post name
  const groupedCandidates = candidates.reduce((acc, candidate) => {
    const postName = candidate.post.name; // Use the post name
    acc[postName] = acc[postName] || [];
    acc[postName].push(candidate);
    return acc;
  }, {});

  return (
    <div className={styles.votingPage}>
      <h1 className={styles.title}>Election Voting Page</h1>
      {Object.entries(groupedCandidates).map(([postName, candidates]) => (
        <div className={styles.postSection} key={postName}>
          <h2 className={styles.postTitle}>{postName}</h2>
          <ul className={styles.candidateList}>
            {candidates.map((candidate) => (
              <li className={styles.candidateCard} key={candidate.id}>
                <img
                  src={candidate.image}
                  alt={candidate.name}
                  className={styles.candidateImage}
                />
                <div className={styles.candidateInfo}>
                  <h3 className={styles.candidateName}>{candidate.name}</h3>
                  <p className={styles.totalVotes}>Votes: {candidate.votes}</p>
                  <button
                    className={styles.voteButton}
                    onClick={() =>
                      handleVote(candidate.id, candidate.post.name)
                    }
                    disabled={votedPosts.has(candidate.post.name)}
                  >
                    {votedPosts.has(candidate.post.name) ? "Voted" : "Vote"}
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className={styles.totalVotesSection}>
            <strong>Total Votes for {postName}: </strong>
            {candidates.reduce(
              (total, candidate) => total + candidate.votes,
              0
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Vote;
