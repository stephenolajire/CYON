import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import api from "../constant/api/api";
import Swal from "sweetalert2";

const DonationSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [verifying, setVerifying] = useState(true);

  useEffect(() => {
    const verifyPayment = async () => {
      const reference = searchParams.get("reference");
      const trxref = searchParams.get("trxref");

      if (!reference || !trxref) {
        Swal.fire({
          title: "Invalid Payment",
          text: "Missing reference or transaction ID. Redirecting...",
          icon: "error",
          confirmButtonText: "OK",
        }).then(() => {
          navigate("/");
        });
        return;
      }

      try {
        const response = await api.get(`paystack/verify/${reference}/`);

        if (response.data.status === "success") {
          Swal.fire({
            title: "Thank You!",
            text: "Your donation was successful",
            icon: "success",
            confirmButtonText: "OK",
          }).then(() => {
            navigate("/");
          });
        } else {
          throw new Error("Payment verification failed");
        }
      } catch (error) {
        Swal.fire({
          title: "Verification Failed",
          text: error.message || "An error occurred during verification.",
          icon: "error",
          confirmButtonText: "OK",
        }).then(() => {
          navigate("/");
        });
      } finally {
        setVerifying(false);
      }
    };

    verifyPayment();
  }, [searchParams, navigate]);

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      {verifying ? (
        <div>
          <h2>Verifying your payment...</h2>
          <p>Please wait...</p>
        </div>
      ) : null}
    </div>
  );
};

export default DonationSuccess;
