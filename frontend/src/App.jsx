import { useState, useEffect } from "react";

function App() {
  const [inputText, setInputText] = useState("");
  const [summary, setSummary] = useState("");
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ============================
  //   FETCH HISTORY ON LOAD
  // ============================

  const loadHistory = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/summarize");
      const data = await res.json();
      setHistory(data);
    } catch (err) {
      console.error("History load failed:", err);
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  // ============================
  //     SUMMARIZE TEXT
  // ============================

  const handleSummarize = async () => {
    if (!inputText.trim()) return;

    setLoading(true);
    setError("");

    try {
      console.log("Sending request to backend...");
      const res = await fetch("http://localhost:5000/api/summarize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ text: inputText })
      });

      console.log("Response status:", res.status);
      const data = await res.json();
      console.log("Response data:", data);

      if (!res.ok) {
        setError(data.error || "Failed to summarize");
        setLoading(false);
        return;
      }

      setSummary(data.summary);
      setInputText("");
      loadHistory();
    } catch (err) {
      console.error("Summarize error:", err);
      setError(err.message || "Network error");
    } finally {
      setLoading(false);
    }
  };

  // ============================
  //       DELETE SUMMARY
  // ============================

  const deleteItem = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/summarize/${id}`, {
        method: "DELETE"
      });
      loadHistory();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  // ============================
  //           UI
  // ============================

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>AI Summarizer</h1>
      <p style={styles.subtitle}>Summarize any text instantly with AI ✨</p>

      <textarea
        style={styles.textarea}
        placeholder="Paste text here..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />

      <button style={styles.button} onClick={handleSummarize} disabled={loading}>
        {loading ? "Summarizing..." : "Summarize"}
      </button>

      {error && (
        <div style={styles.errorBox}>
          <p style={{ color: "red" }}>Error: {error}</p>
        </div>
      )}

      {summary && (
        <div style={styles.summaryBox}>
          <h2>Summary</h2>
          <p>{summary}</p>
        </div>
      )}

      {/* ====================== */}
      {/*      HISTORY SECTION   */}
      {/* ====================== */}

      <h2 style={styles.historyTitle}>History</h2>

      <div style={{ width: "700px" }}>
        {history.map((item) => (
          <div key={item._id} style={styles.historyCard}>
            <p><b>Original:</b> {item.text}</p>
            <p><b>Summary:</b> {item.summary}</p>

            <button
              style={styles.deleteBtn}
              onClick={() => deleteItem(item._id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#0d0d0d",
    color: "white",
    paddingTop: "40px",
    textAlign: "center",
    fontFamily: "Arial",
  },
  title: {
    fontSize: "48px",
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: "18px",
    marginBottom: "30px",
    color: "#bbb",
  },
  textarea: {
    width: "700px",
    height: "160px",
    padding: "12px",
    background: "#111",
    color: "white",
    border: "2px solid #7a3cff",
    borderRadius: "8px",
    fontSize: "16px",
    outline: "none",
  },
  button: {
    marginTop: "20px",
    width: "700px",
    padding: "14px",
    background:
      "linear-gradient(90deg, #7a3cff, #b44cff)",
    color: "white",
    border: "none",
    fontSize: "20px",
    borderRadius: "8px",
    cursor: "pointer",
  },
  errorBox: {
    width: "700px",
    margin: "20px auto",
    background: "#2a0a0a",
    padding: "15px",
    borderRadius: "8px",
    border: "1px solid red",
  },
  summaryBox: {
    width: "700px",
    margin: "30px auto",
    background: "#111",
    padding: "20px",
    borderRadius: "10px",
    border: "1px solid #333",
    textAlign: "left",
  },
  historyTitle: {
    marginTop: "40px",
    fontSize: "28px",
    color: "#ccc",
  },
  historyCard: {
    background: "#141414",
    padding: "15px",
    borderRadius: "8px",
    border: "1px solid #333",
    marginBottom: "12px",
    textAlign: "left",
  },
  deleteBtn: {
    marginTop: "10px",
    padding: "8px 12px",
    background: "red",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default App;
