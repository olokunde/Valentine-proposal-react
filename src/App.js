import { useState } from "react";
import "./styles.css";

/* 🔁 IMAGE SOURCES */
const IMAGES = {
  default: "/penguin_waiting.gif",
  sad: "/sad_penguin_heartbreak.gif",
  love: "/cute_penguin_hug.gif",
};

const phrases = [
  "No",
  "Are you sure Princess?",
  "Reconsider…",
  "My heart is shaking My Diamond Princess 🥺",
  "Don’t let your penguin down baby girl",
  "Love is patient…",
  "Will try again Baby Girl 💔",
];

export default function App() {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const [sadMode, setSadMode] = useState(false);
  const [noStyle, setNoStyle] = useState({});

  const yesButtonSize = noCount * 18 + 16;

  function handleNoClick() {
    if (yesPressed) return;

    const nextCount = noCount + 1;
    setNoCount(nextCount);

    // ONLY trigger heartbreak at the LAST phrase
    if (nextCount >= phrases.length - 1) {
      setSadMode(true);
    }
  }

  function getNoButtonText() {
    return phrases[Math.min(noCount, phrases.length - 1)];
  }

  // 🏃‍♂️ Make NO button move
  function moveNoButton() {
    const x = Math.random() * 200 - 100;
    const y = Math.random() * 200 - 100;

    setNoStyle({
      transform: `translate(${x}px, ${y}px)`,
    });
  }

  /* 🧠 IMAGE DECISION */
  let currentImage = IMAGES.default;
  if (yesPressed) currentImage = IMAGES.love;
  else if (sadMode) currentImage = IMAGES.sad;

  return (
    <div className="valentine-container">
      {yesPressed && <div className="hearts"></div>}
      {sadMode && !yesPressed && <div className="broken-hearts"></div>}

      {/* 🌸 IMAGE WITH FADE */}
      <img
        key={currentImage}
        className="fade-in"
        alt="penguin scene"
        src={currentImage}
      />

      <div className="text romantic">
        {yesPressed
          ? "I choose you, today and always 💎💖"
          : sadMode
          ? "My heart is broken…"
          : "Will you be my Valentine My Diamond Princess 💎?"}
      </div>

      {!yesPressed && (
        <div className="buttons">
          <button
            className="yesButton"
            style={{ fontSize: yesButtonSize }}
            onClick={() => setYesPressed(true)}
          >
            Yes
          </button>

          <button
            className="noButton"
            onClick={handleNoClick}
            onMouseEnter={moveNoButton}
            style={noStyle}
          >
            {getNoButtonText()}
          </button>
        </div>
      )}
      <div className="watermark">Coded by Olokunde Olaoluwa</div>
    </div>
  );
}
