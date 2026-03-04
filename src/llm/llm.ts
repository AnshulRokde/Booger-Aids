import dotenv from "dotenv";
dotenv.config();

export async function askLLM(prompt: string) {
  const key = process.env.GROQ_API_KEY;
  console.log("GROQ_API_KEY present?", Boolean(process.env.GROQ_API_KEY))
  if (!key) {
    throw new Error("Missing GROQ_API_KEY. Put it in .env next to package.json");
  }

  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile", // good default on Groq
      messages: [{ role: "user", content: prompt }],
      temperature: 0.2,
    }),
  });

  const text = await res.text(); // read raw text first
  let data: any;
  try {
    data = JSON.parse(text);
  } catch {
    throw new Error(`Groq returned non-JSON response (status ${res.status}):\n${text}`);
  }

  if (!res.ok) {
    throw new Error(
      `Groq API error (status ${res.status}): ${JSON.stringify(data, null, 2)}`
    );
  }

  const content = data?.choices?.[0]?.message?.content;
  if (!content) {
    throw new Error(
      `Unexpected Groq response shape:\n${JSON.stringify(data, null, 2)}`
    );
  }

  return content;
}