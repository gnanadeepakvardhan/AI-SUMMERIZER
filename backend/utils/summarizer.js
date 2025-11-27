import fetch from "node-fetch";
import Summary from "../models/SummaryModel.js";

export const summarizeText = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: "Text is required" });

    try {
      // Try Cohere API first
      const response = await fetch("https://api.cohere.ai/v1/summarize", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.COHERE_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          text: text,
          length: "medium"
        })
      });

      const data = await response.json();
      console.log("Cohere Response:", data);

      if (response.ok && data.summary) {
        const saved = await Summary.create({ text, summary: data.summary });
        return res.json(saved);
      } else {
        console.warn("Cohere API failed, using local summarizer");
      }
    } catch (cohereError) {
      console.warn("Cohere API error:", cohereError.message);
    }

    // Fallback to local summarization
    const summary = generateLocalSummary(text);
    const saved = await Summary.create({ text, summary });
    res.json(saved);
  } catch (err) {
    console.error("Summarization ERROR:", err);
    res.status(500).json({ error: "Summarization failed", details: err.message });
  }
};

// Local summarization fallback
function generateLocalSummary(text, sentenceCount = 3) {
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
  if (sentences.length === 0) return text;

  const words = text.toLowerCase().match(/\b\w+\b/g) || [];
  const wordFreq = {};
  
  words.forEach(word => {
    if (word.length > 3) {
      wordFreq[word] = (wordFreq[word] || 0) + 1;
    }
  });

  const scoredSentences = sentences.map((sentence, index) => {
    const words = sentence.toLowerCase().match(/\b\w+\b/g) || [];
    const score = words.reduce((sum, word) => sum + (wordFreq[word] || 0), 0);
    return { sentence: sentence.trim(), score, index };
  });

  const topSentences = scoredSentences
    .sort((a, b) => b.score - a.score)
    .slice(0, Math.min(sentenceCount, scoredSentences.length))
    .sort((a, b) => a.index - b.index)
    .map(s => s.sentence)
    .join(" ");

  return topSentences || sentences[0].trim();
}


// --- Fetch All Summaries ---
export const getHistory = async (req, res) => {
  const all = await Summary.find().sort({ createdAt: -1 });
  res.json(all);
};

// --- Delete Summary ---
export const deleteSummary = async (req, res) => {
  await Summary.findByIdAndDelete(req.params.id);
  res.json({ success: true });
};
