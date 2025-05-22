// src/components/BackButton.jsx
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import React from "react";

export default function BackButton() {
  const navigate = useNavigate();

  return (
    <div className="fixed top-4 left-4 z-50">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1 text-[#333] hover:text-black text-lg"
      >
        <IoArrowBack size={24} />
      </button>
    </div>
  );
}
