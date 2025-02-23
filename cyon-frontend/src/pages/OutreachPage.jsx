import React, { useState, useEffect } from "react";
import styles from "../style/OutreachList.module.css"; // Importing CSS Module
import api from "../constant/api/api";

const OutreachList = () => {
  const [outreaches, setOutreaches] = useState([]);
  const [selectedOutreach, setSelectedOutreach] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const fetchOutreach = async () => {
    try {
      const response = await api.get("outreach/");
      if (response.data) {
        setOutreaches(response.data)
        console.log(response.data)
      }
    } catch (error) {
      console.log (error)
    }
  }

  useEffect(() => {
    fetchOutreach()
  }, []);

  const openModal = (outreach) => {
    setSelectedOutreach(outreach);
    setModalOpen(true);
  };

  return (
    <div className={styles.container}>
      {outreaches.map((outreach) => (
        <div key={outreach.id} className={styles.outreachCard}>
          {/* Title */}
          <h2 className={styles.title}>{outreach.title}</h2>
          {/* Description */}
          <p className={styles.description}>{outreach.description}</p>

          {/* Images Scrollable Section */}
          <div className={styles.imageScroll}>
            {outreach.gallery.map((image, index) => (
              <img
                key={index}
                src={image.image}
                alt={`Outreach ${index}`}
                className={styles.image}
                onClick={() => setSelectedImage(image.image)}
              />
            ))}
          </div>

          {/* Show All Link */}
          <button
            className={styles.showAll}
            onClick={() => openModal(outreach)}
          >
            Show All
          </button>
        </div>
      ))}

      {/* Modal for Viewing All Images */}
      {modalOpen && selectedOutreach && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2 className={styles.modalTitle}>{selectedOutreach.title}</h2>
            <div className={styles.imageGrid}>
              {selectedOutreach.gallery.map((image, index) => (
                <img
                  key={index}
                  src={image.image}
                  alt={`Gallery ${index}`}
                  className={styles.modalImage}
                  onClick={() => setSelectedImage(image.image)}
                />
              ))}
            </div>
            <button
              className={styles.closeButton}
              onClick={() => setModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Image Preview Modal */}
      {selectedImage && (
        <div
          className={styles.fullscreenOverlay}
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            alt="Preview"
            className={styles.fullscreenImage}
          />
          <button
            className={styles.closeFullscreen}
            onClick={() => setSelectedImage(null)}
          >
            ✖
          </button>
        </div>
      )}
    </div>
  );
};

export default OutreachList;
