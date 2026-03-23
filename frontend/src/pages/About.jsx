import React, { useEffect, useState } from "react";
import Navbar from "../components/NavBar";
import { getOwnerDetails } from "../services/ownerService";
import "./About.css";

export default function About() {
  const [owner, setOwner] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOwnerDetails()
      .then(setOwner)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="loading-container">
          <h2>Loading...</h2>
        </div>
      </>
    );
  }

  if (!owner) {
    return (
      <>
        <Navbar />
        <div className="loading-container">
          <h2>Unable to load owner information</h2>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="about-container">
        <div className="about-header">
          <h1>{owner.storeName}</h1>
          <p className="about-description">{owner.about}</p>
        </div>

        <div className="owner-info">
          <div className="about-section">
            <h3>Owner</h3>
            <p>{owner.ownerName}</p>
          </div>

          <div className="contact-info">
            <h3>Contact Information</h3>
            <p><strong>Email:</strong> {owner.email}</p>
            <p><strong>Phone:</strong> {owner.phone}</p>
            <p><strong>Address:</strong> {owner.address}</p>
          </div>
        </div>
      </div>
    </>
  );
}
