// src/pages/NotFound.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="text-center p-10">
      <h1 className="text-3xl font-bold">404 - Page Not Found</h1>
      <p className="mt-4 text-gray-600">The page you are looking for does not exist.</p>
      <Link to="/" className="text-blue-600 underline mt-4 inline-block">
        Go back to Home
      </Link>
    </div>
  );
}
