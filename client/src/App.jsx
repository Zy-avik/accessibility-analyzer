import { useState } from 'react';
import './App.css';

function App() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleScan = async () => {
    if (!file) return alert("Please upload a file first!");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://localhost:5000/analyze", {
        method: "POST",
        body: formData
      });

      const data = await res.json();
      setResult(data.message || "Scan complete!");
    } catch (err) {
      setResult("Error occurred while scanning.");
    }
  };

  return (
    <div className="app-container">
      <h1>Accessibility Analyzer 🔍</h1>

      <input type="file" onChange={handleFileChange} />
      <button onClick={handleScan}>Scan</button>

      <div className="result-box">
        <h3>Results:</h3>
        <p>{result}</p>
      </div>
    </div>
  );
}

export default App;
