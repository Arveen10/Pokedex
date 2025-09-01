"use client";

import { useEffect, useState } from "react";
import styles from "./Carousel.module.css";

const slidesData = [
  { text: "We Do Have A Lot In Common...", backgroundColor: "#3B4CCA" },
  {
    text: "You Can't Expect To Win Every Single Battle...",
    backgroundColor: "#FFDE00",
    color: "#333",
  },
  {
    text: "Hey, I'll Use My Trusty Frying Pan As A Drying Pan.",
    backgroundColor: "#CC0000",
  },
];

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Set up a timer to advance the slide every 4 seconds
    const timer = setTimeout(() => {
      const nextIndex = (currentIndex + 1) % slidesData.length;
      setCurrentIndex(nextIndex);
    }, 4000);

    // This is a cleanup function that React runs when the component
    // unmounts or before the effect runs again. It prevents memory leaks.
    return () => clearTimeout(timer);
  }, [currentIndex]);

  return (
    <div className={styles.carouselContainer}>
      <div
        className={styles.carouselSlider}
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {/* We map over the new slidesData array */}
        {slidesData.map((slide, index) => (
          <div
            className={styles.carouselSlide}
            key={index}
            // Apply background and text color directly
            style={{
              backgroundColor: slide.backgroundColor,
              color: slide.color || "#FFFFFF",
            }}
          >
            <h2>{slide.text}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
