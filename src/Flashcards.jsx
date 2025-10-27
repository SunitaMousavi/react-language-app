import React from "react";
import frenchA1 from "./data/frenchA1.json";

export default function Flashcards() {
  const VOCAB_DATABASE = {
    A1: frenchA1,
  };

  return <div className="Flashcards">Hello from Flashcards</div>;
}
