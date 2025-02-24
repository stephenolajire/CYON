import React, { useContext, useEffect, useState } from "react";
import styles from "../style/ResultPage.module.css";
import { GlobalContext } from "../constant/context/GlobalContext";
import api from "../constant/api/api";
import Spinner from "../components/Spinner";

const ResultsPage = () => {
  const { candidates } = useContext(GlobalContext);
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(false);

  const id = candidates?.election_id; // Safe access

  const fetchResult = async () => {
    if (!id) return;
    setLoading(true);
    try {
      const response = await api.get(`results/${id}/`);
      console.log("API Response:", response.data);
      setResults(response.data || {}); // Ensure results is an object
    } catch (error) {
      console.error("Error fetching results:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResult();
  }, [id]);

  if (loading) return <Spinner />;

  return (
    <div className={styles.resultsContainer}>
      <h1>Election Results: {results?.election || "N/A"}</h1>
      <table className={styles.resultsTable}>
        <thead>
          <tr>
            <th>Candidate</th>
            <th>Post</th>
            <th>Votes</th>
          </tr>
        </thead>
        <tbody>
          {results?.candidates?.length > 0 ? (
            results.candidates.map((candidate) => (
              <tr key={candidate.id}>
                <td className={styles.candidate}>
                  <img
                    src={candidate.image}
                    alt={candidate.name}
                    className={styles.candidateImage}
                  />
                  {candidate.name}
                </td>
                <td>{candidate.post_name}</td>
                <td>{candidate.votes}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No results available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ResultsPage;
