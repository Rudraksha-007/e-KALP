import React, { useState } from "react";
import { Mic, X } from "lucide-react";

// Link to your ElevenLabs voice assistant
const VOICE_ASSISTANT_URL =
  "https://elevenlabs.io/app/talk-to?agent_id=agent_0501m26gbwzmej3t81egz3dypbbs&branch_id=agtbrch_5801m26gby9bfvhs33hm9qvbwgkm";

export default function VoiceAssistantButton() {
  const [hovered, setHovered] = useState(false);

  return (
    <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 9999 }}>
      <a
        href={VOICE_ASSISTANT_URL}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: hovered ? 10 : 0,
          padding: hovered ? "14px 20px 14px 14px" : "16px",
          borderRadius: 999,
          background: "linear-gradient(135deg, #FF7A00 0%, #1E6FEB 100%)",
          color: "#FFFFFF",
          textDecoration: "none",
          boxShadow: "0 6px 20px rgba(30,111,235,0.35), 0 2px 8px rgba(255,122,0,0.25)",
          border: "2px solid #FFFFFF",
          transition: "all 0.25s ease",
          fontFamily: "sans-serif",
          fontWeight: 600,
          fontSize: 14,
          whiteSpace: "nowrap",
          overflow: "hidden",
        }}
      >
        <span
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minWidth: 24,
            minHeight: 24,
          }}
        >
          <Mic size={24} strokeWidth={2.2} />
        </span>
        <span
          style={{
            maxWidth: hovered ? 200 : 0,
            opacity: hovered ? 1 : 0,
            transition: "all 0.25s ease",
          }}
        >
          Talk to assistant
        </span>
      </a>
    </div>
  );
}
