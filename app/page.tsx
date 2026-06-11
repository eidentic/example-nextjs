"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useEffect, useMemo, useRef, useState } from "react";

export default function ChatPage() {
  const transport = useMemo(
    () => new DefaultChatTransport({ api: "/api/chat" }),
    []
  );

  const { messages, sendMessage, status } = useChat({ transport });
  const [input, setInput] = useState("");

  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, status]);

  const isStreaming = status === "streaming" || status === "submitted";

  const submit = () => {
    const text = input.trim();
    if (!text || isStreaming) return;
    setInput("");
    sendMessage({ text });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };

  return (
    <div className="chat-root">
      <header className="chat-header">
        <div className="chat-header-dot" />
        <h1>Eidentic Chat</h1>
        <span className="chat-header-sub">memory-backed · persistent</span>
      </header>

      <div className="chat-messages">
        {messages.length === 0 && (
          <div className="chat-empty">
            <div className="chat-empty-icon">◎</div>
            <p>Start a conversation. The agent remembers across sessions.</p>
          </div>
        )}

        {messages.map((m) => {
          const text = m.parts
            .filter((p): p is { type: "text"; text: string } => p.type === "text")
            .map((p) => p.text)
            .join("");

          if (!text) return null;

          return (
            <div key={m.id} className={`message ${m.role}`}>
              <span className="message-role">
                {m.role === "user" ? "You" : "Assistant"}
              </span>
              <div className="message-bubble">{text}</div>
            </div>
          );
        })}

        {isStreaming && (
          <div className="thinking">
            <div className="thinking-dots">
              <span />
              <span />
              <span />
            </div>
            Thinking…
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      <div className="chat-form-wrap">
        <form
          className="chat-form"
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
        >
          <textarea
            className="chat-input"
            rows={1}
            placeholder="Send a message… (Shift+Enter for newline)"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isStreaming}
          />
          <button
            type="submit"
            className="chat-send"
            disabled={!input.trim() || isStreaming}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
