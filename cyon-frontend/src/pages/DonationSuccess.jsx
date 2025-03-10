import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate, useParams } from "react-router-dom";
import api from "../constant/api/api";
import Swal from "sweetalert2";
import styles from "../style/DonationSuccess.module.css";

const DonationSuccess = () => {
  const { code } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState({
    verifying: true,
    success: false,
    error: null,
  });

  const verifyPayment = async () => {
    const reference = searchParams.get("reference");
    const trxref = searchParams.get("trxref");

    console.log("Params:", code, reference, trxref);

    if (!reference || !trxref) {
      setStatus({
        verifying: false,
        success: false,
        error: "Missing reference or transaction ID",
      });

      Swal.fire({
        title: "Invalid Payment",
        text: "Missing reference or transaction ID. Redirecting...",
        icon: "error",
        confirmButtonText: "OK",
      }).then(() => {
        navigate("/donate");
      });

      return;
    }

    try {
      const response = await api.get(`paystack/verify/${code}/`, {
        params: { reference },
      });

      console.log("API Response:", response.data);
      console.log("Status:", response.status);
      console.log("Message:", response.data.message);

      if (response.status === 200) {
        setStatus({
          verifying: false,
          success: true,
          error: null,
        });

        Swal.fire({
          title: "Thank You!",
          text: "Your donation was successful. We appreciate your support!",
          icon: "success",
          confirmButtonText: "Return Home",
        }).then(() => {
          navigate("/");
        });
      } else {
        throw new Error(response.data.message || "Payment verification failed");
      }
    } catch (error) {
      console.error("Error:", error.message || "An error occurred.");

      setStatus({
        verifying: false,
        success: false,
        error: error.message || "Payment verification failed.",
      });

      Swal.fire({
        title: "Verification Failed",
        text: `Payment verification failed. (Ref: ${reference})`,
        icon: "error",
        confirmButtonText: "Try Again",
        showCancelButton: true,
        cancelButtonText: "Contact Support",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          navigate("/contact", {
            state: { subject: "Payment Issue", reference },
          });
        } else {
          navigate("/donate");
        }
      });
    }
  };

  useEffect(() => {
    verifyPayment();
  }, [searchParams, navigate, code]); // Ensure dependencies are correct

  return (
    <div className={styles.container}>
      {status.verifying && (
        <div className={styles.loaderWrapper}>
          <div className={styles.loader}></div>
          <h2 className={styles.title}>Verifying your donation</h2>
          <p className={styles.message}>
            Please wait while we confirm your payment...
          </p>
          <p className={styles.reference}>
            Reference: {searchParams.get("reference") || "N/A"}
          </p>
        </div>
      )}

      {!status.verifying && status.error && !Swal.isVisible() && (
        <div className={styles.errorState}>
          <h2 className={styles.title}>Verification Issue</h2>
          <p className={styles.message}>{status.error}</p>
          <div className={styles.buttonGroup}>
            <button className={styles.primaryButton} onClick={() => window.location.reload()}>
              Try Again
            </button>
            <button className={styles.secondaryButton} onClick={() => navigate("/")}>
              Return Home
            </button>
          </div>
        </div>
      )}

      {!status.verifying && status.success && !Swal.isVisible() && (
        <div className={styles.successState}>
          <h2 className={styles.title}>Thank You!</h2>
          <p className={styles.message}>
            Your donation was successful. We appreciate your support!
          </p>
          <button className={styles.primaryButton} onClick={() => navigate("/")}>
            Return Home
          </button>
        </div>
      )}
    </div>
  );
};

export default DonationSuccess;
