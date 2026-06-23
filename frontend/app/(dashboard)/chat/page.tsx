"use client";

import { useEffect, useRef, useState } from "react";
import { Send, Trash2, Bot, User } from "lucide-react";
import { sendMessage, getChatHistory, clearChatHistory } from "@/services/chat";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

interface Message {
  role: "user" | "assistant";
  message: string;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [messageLoaded, isMessageLoaded] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const loadHistory = async () => {
    try {
      isMessageLoaded(false);
      const data = await getChatHistory();

      if (Array.isArray(data)) {
        setMessages(data);
      } else {
        setMessages([]);
      }
      isMessageLoaded(true);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void loadHistory();
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  const handleSend = async () => {
    if (!question.trim()) return;

    const userMessage: Message = {
      role: "user",
      message: question,
    };

    setMessages((prev) => [...prev, userMessage]);

    const currentQuestion = question;

    setQuestion("");
    setLoading(true);

    try {
      const response = await sendMessage(currentQuestion);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          message: response.response,
        },
      ]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = async () => {
    try {
      await clearChatHistory();
      setMessages([]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex h-[calc(100vh-120px)] flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-400">Financial Assistant</p>

          <h1 className="text-4xl font-bold text-white">AI Chat</h1>
        </div>

        <Button variant="destructive" onClick={handleClear}>
          <Trash2 className="mr-2 h-4 w-4" />
          Clear History
        </Button>
      </div>

      {/* Chat Container */}
      <Card className="flex flex-1 flex-col border-slate-800 bg-[#111C3D]">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 scrollbar-hide scrollbar-hide::-webkit-scrollbar">
          <div className="space-y-4">
            {!messageLoaded && (
              <div className="flex h-100 items-center justify-center">
                <p className="text-slate-500">Your message is loading..</p>
              </div>
            )}
            {messages.length === 0 && messageLoaded && (
              <div className="flex h-100 items-center justify-center">
                <p className="text-slate-500">
                  Ask anything about your finances...
                </p>
              </div>
            )}

            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[75%] rounded-2xl p-4 ${
                    message.role === "user"
                      ? "bg-[#2E62FF] text-white"
                      : "bg-slate-800 text-slate-100"
                  }`}
                >
                  <div className="mb-2 flex items-center gap-2">
                    {message.role === "user" ? (
                      <User className="h-4 w-4" />
                    ) : (
                      <Bot className="h-4 w-4 text-[#10B981]" />
                    )}

                    <span className="text-xs font-medium">
                      {message.role === "user" ? "You" : "AI Assistant"}
                    </span>
                  </div>

                  <p className="whitespace-pre-wrap text-sm leading-relaxed">
                    {message.message}
                  </p>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="rounded-xl bg-slate-800 p-4 text-slate-400">
                  Thinking...
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>
        <div className="border-t border-slate-800 p-4">
          <div className="flex gap-3">
            <Textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask about spending, budgets, savings..."
              className="min-h-15 border-slate-700 bg-slate-900 text-white"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  void handleSend();
                }
              }}
            />

            <Button
              disabled={loading}
              onClick={handleSend}
              className="bg-linear-to-r from-[#2E62FF] to-[#10B981]"
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
