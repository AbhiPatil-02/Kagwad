// src/components/common/ServiceCard.jsx
import React from "react";
import { Link } from "react-router-dom";
import "../../styles/components.css";

export default function ServiceCard({ service, categorySlug }) {
  if (!service) {
    return null; // nothing to render if no service
  }

  const imageUrl =
    service?.images?.[0] || "/images/no_image.png";

  return (
    <Link
      to={`/services/${categorySlug || "general"}/${service.id}`}
      className="service-card"
    >
      <img
        src={imageUrl}
        alt={service.name || "Service"}
        className="service-card-image"
      />
      <div className="service-card-content">
        <h3>{service.name || "Unnamed Service"}</h3>
        <p>{service.address || "Address not available"}</p>
      </div>
    </Link>
  );
}
