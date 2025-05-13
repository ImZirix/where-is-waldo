import { useState, useEffect, useRef } from "react";
import waldoImg from "./assets/waldo.jpg";

function App() {
  // Track click coordinates, win state, start time, and elapsed time
  const [clickCoords, setClickCoords] = useState(null);
  const [won, setWon] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const intervalRef = useRef(null);

  // Start the timer when the app loads
  useEffect(() => {
    const now = Date.now();
    setStartTime(now);

    intervalRef.current = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - now) / 1000));
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, []);

  // Stop the timer if Waldo is found
  useEffect(() => {
    if (won) clearInterval(intervalRef.current);
  }, [won]);

  // Handle user clicks on the image
  const handleImageClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width).toFixed(4);
    const y = ((e.clientY - rect.top) / rect.height).toFixed(4);
    setClickCoords({ x, y });

    fetch("http://localhost:3000/api/validate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Waldo",
        x: parseFloat(x),
        y: parseFloat(y),
      }),
    })
      .then((res) => res.json())
      .then((data) => setWon(data.correct))
      .catch((error) => console.error("Error validating click:", error));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-4xl font-bold mb-4 text-center text-blue-700">
        Where's Waldo
      </h1>
      <p className="mb-2 text-lg text-gray-700">
        Time: <span className="font-mono">{elapsedTime}s</span>
      </p>
      {won && (
        <h2 className="text-2xl font-semibold text-green-600 mb-4">
          🎉 You found Waldo!
        </h2>
      )}

      {/* Image and click target */}
      <div
        className="relative w-full max-w-4xl border-4 border-blue-200 rounded overflow-hidden shadow-lg cursor-crosshair"
        onClick={handleImageClick}
      >
        <img src={waldoImg} alt="Waldo Scene" className="w-full h-auto block" />
        {clickCoords && !won && (
          <div
            className="absolute w-10 h-10 border-4 border-red-500 rounded-full pointer-events-none"
            style={{
              left: `${clickCoords.x * 100}%`,
              top: `${clickCoords.y * 100}%`,
              transform: "translate(-50%, -50%)",
            }}
          ></div>
        )}
      </div>
    </div>
  );
}

export default App;
