"use client";

import { Instructor } from "@/constants";
import { vapi } from "@/lib/vapi";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface UserType {
  id: string;
  username: string;
  email: string;
}

interface Message {
  type: string;
  transcriptType?: string;
  role: "user" | "system" | "assistant";
  transcript: string;
}

enum CallStatus {
  INACTIVE = "INACTIVE",
  CONNECTING = "CONNECTING",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}

interface SavedMessage {
  role: "user" | "system" | "assistant";
  content: string;
}

interface AgentProps {
  subject?: string;
  lesson?: string[];
  level?: string;
  username?: string;
  userId: string;
  type: "generate" | "study";
  topics?: string[];
}

interface SavedSession {
  messages: SavedMessage[];
  subject?: string;
  lesson?: string[];
  level?: string;
}

const Agent = ({ subject, lesson, level, type, topics, username, userId }: AgentProps) => {
  const router = useRouter();
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [messages, setMessages] = useState<SavedMessage[]>([]);

  useEffect(() => {
    if (type === "study") {
      const savedSession = localStorage.getItem(`studySession_${userId}_${subject}`);
      if (savedSession) {
        const parsedSession: SavedSession = JSON.parse(savedSession);
        if (
          parsedSession.subject === subject &&
          parsedSession.level === level &&
          JSON.stringify(parsedSession.lesson) === JSON.stringify(lesson)
        ) {
          setMessages(parsedSession.messages);
        }
      }
    }
  }, [type, userId, subject, lesson, level]);

  useEffect(() => {
    const onCallStart = () => setCallStatus(CallStatus.ACTIVE);
    const onCallEnd = () => setCallStatus(CallStatus.FINISHED);
    const onMessage = (message: Message) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        const newMessage = {
          role: message.role,
          content: message.transcript,
        };
        setMessages((prev) => [...prev, newMessage]);
      }
    };
    const onSpeechStart = () => setIsSpeaking(true);
    const onSpeechEnd = () => setIsSpeaking(false);
    const onError = (err: Error) => console.error("Vapi Error:", err);

    vapi.on("call-start", onCallStart);
    vapi.on("call-end", onCallEnd);
    vapi.on("message", onMessage);
    vapi.on("speech-start", onSpeechStart);
    vapi.on("speech-end", onSpeechEnd);
    vapi.on("error", onError);

    return () => {
      vapi.off("call-start", onCallStart);
      vapi.off("call-end", onCallEnd);
      vapi.off("message", onMessage);
      vapi.off("speech-start", onSpeechStart);
      vapi.off("speech-end", onSpeechEnd);
      vapi.off("error", onError);
    };
  }, []);

  const handleCall = async () => {
    if (callStatus === CallStatus.ACTIVE) {
      vapi.stop();
      setCallStatus(CallStatus.FINISHED);
      return;
    }

    setCallStatus(CallStatus.CONNECTING);
    try {
      if (type === "generate") {
        await vapi.start(process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID!, {
          variableValues: { username, userId },
        });
      } else {
        const formattedLessons = lesson.map((lesson)=>`- ${lesson}`).join('\n');
        await vapi.start(Instructor, {
          variableValues: {
            lessons: formattedLessons,
            topics,
            type,
            username,
            subject,
            level,
          },
        });
      }
    } catch (error) {
      console.error("Error starting call:", error);
      setCallStatus(CallStatus.INACTIVE);
    }
  };

  const handleSave = () => {
    if (type === "study") {
      const session: SavedSession = { messages, subject, lesson, level };
      localStorage.setItem(`studySession_${userId}_${subject}`, JSON.stringify(session));
      alert("Session saved successfully!");
    }
  };

  const handleResume = () => {
    if (type === "study" && messages.length > 0) {
      handleCall();
    }
  };

  const handleClear = () => {
    if (type === "study") {
      localStorage.removeItem(`studySession_${userId}_${subject}`);
      setMessages([]);
      alert("Saved session cleared!");
    }
  };

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center p-4">
      <div className="bg-neutral-900 mt-12 rounded-2xl shadow-lg w-full max-w-4xl h-[80vh] flex flex-col p-6 md:p-8 lg:p-10">
        <h1 className="text-2xl md:text-3xl font-bold text-[#62F6B5] mb-6">
          {type === "generate" ? "Course Generator" : `${subject} Instructor`}
        </h1>

        <div className="flex items-center mb-4">
          <span
            className={`w-3 h-3 rounded-full mr-2 ${
              callStatus === CallStatus.ACTIVE
                ? "bg-green-500"
                : callStatus === CallStatus.CONNECTING
                ? "bg-yellow-500"
                : callStatus === CallStatus.FINISHED
                ? "bg-red-500"
                : "bg-gray-400"
            }`}
          />
          <p className="text-sm text-gray-400">
            {callStatus === CallStatus.INACTIVE
              ? "Ready to start"
              : callStatus === CallStatus.CONNECTING
              ? "Connecting..."
              : callStatus === CallStatus.ACTIVE
              ? `AI is ${isSpeaking ? "speaking" : "listening"}`
              : "Call finished"}
          </p>
        </div>

        <div className="flex-1 bg-[#62F6B5] rounded-xl p-4 overflow-y-auto mb-6">
          {messages.length === 0 ? (
            <p className="text-gray-800 text-center text-sm">No messages yet</p>
          ) : (
            messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-3 flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[70%] p-3 rounded-xl shadow-sm ${
                    msg.role === "user"
                      ? "bg-secondary text-primary"
                      : "bg-white text-gray-800"
                  }`}
                >
                  <p className="text-sm leading-relaxed">{msg.content}</p>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleCall}
            disabled={callStatus === CallStatus.CONNECTING}
            className={`btn-primary py-2 flex-1 min-w-[120px] ${
              callStatus === CallStatus.ACTIVE ? "bg-red-600 hover:bg-red-700" : ""
            }`}
          >
            {callStatus === CallStatus.ACTIVE
              ? "End Call"
              : callStatus === CallStatus.CONNECTING
              ? "Connecting..."
              : "Start Call"}
          </button>

          {type === "study" && (
            <>
              <button
                onClick={handleSave}
                disabled={messages.length === 0}
                className="btn-primary flex-1 min-w-[120px] disabled:opacity-50"
              >
                Save Session
              </button>
              <button
                onClick={handleResume}
                disabled={messages.length === 0 || callStatus === CallStatus.ACTIVE}
                className="btn-primary flex-1 min-w-[120px] disabled:opacity-50"
              >
                Resume Session
              </button>
              <button
                onClick={handleClear}
                disabled={messages.length === 0}
                className="btn-primary flex-1 min-w-[120px] disabled:opacity-50"
              >
                Clear Session
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Agent;