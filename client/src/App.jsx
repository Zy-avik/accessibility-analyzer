import React, { useState } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file); // <-- IMPORTANT: "file" must match backend

    try {
      const res = await axios.post("http://localhost:5000/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setResult(res.data.result || "No result returned.");
    } catch (err) {
      console.error("Upload error:", err);
      setResult("Error uploading file.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Accessibility Analyzer</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Scan File</button>
      <h2>Results:</h2>
      <pre>{result}</pre>
    </div>
  );
}

export default App;
