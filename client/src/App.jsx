import React, { useState } from "react";
import axios from "axios";
import "./App.css"; // If you want custom styling

function App() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setResult(null);
    setError("");
  };

  const handleScan = async () => {
    if (!file) {
      setError("Please upload a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://localhost:5000/upload", formData);
      setResult(response.data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Error uploading file.");
    }
  };

  return (
    <div className="app">
      <h1>Accessibility Analyzer</h1>

      <input type="file" accept=".html" onChange={handleFileChange} />
      <button onClick={handleScan}>Scan File</button>

      <h2>Results:</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {result && (
        <ul>
          <li>
            {result.imagesWithoutAlt === 0 ? (
              <span>✅ All images have alt attributes.</span>
            ) : (
              <span>⚠️ {result.imagesWithoutAlt} image(s) missing alt attributes.</span>
            )}
          </li>
          <li>
            {result.inputsWithoutLabel === 0 ? (
              <span>✅ All input fields have labels.</span>
            ) : (
              <span>⚠️ {result.inputsWithoutLabel} input(s) missing labels.</span>
            )}
          </li>
        </ul>
      )}
    </div>
  );
}

export default App;
