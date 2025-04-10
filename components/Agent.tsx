"use client";

import { getCurrentUser } from "@/actions/user.actions";
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
  lessons?: string[];
  level?: string;
  username?: string;
  userId:string;
  type: "generate" | "study";
  topics?: string[];
}

const Agent = ({ subject, lessons, level, type, topics,username,userId }: AgentProps) => {
  const router = useRouter();
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [messages, setMessages] = useState<SavedMessage[]>([]);

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
          variableValues: {
            username: username,
            userId,
          },
        });
      } else {
        const formattedLessons = lessons.map((lesson) => `- ${lesson}`).join("\n");
        await vapi.start(Instructor, {
          variableValues: {
            lessons: formattedLessons,
            subject,
            level,
            topics: topics.join(", "),
          },
        });
      }
    } catch (error) {
      console.error("Error starting call:", error);
      setCallStatus(CallStatus.INACTIVE);
    }
  };

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center p-4">
      <div className="bg-[#62F6B5] rounded-lg shadow-lg w-full max-w-2xl p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
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
          <p className="text-sm text-gray-600">
            {callStatus === CallStatus.INACTIVE
              ? "Ready to start"
              : callStatus === CallStatus.CONNECTING
              ? "Connecting..."
              : callStatus === CallStatus.ACTIVE
              ? `AI is ${isSpeaking ? "speaking" : "listening"}`
              : "Call finished"}
          </p>
        </div>

        <div className="bg-gray-50 rounded-md p-4 h-64 overflow-y-auto mb-4">
          {messages.length === 0 ? (
            <p className="text-gray-500 text-center">No messages yet</p>
          ) : (
            messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-2 p-2 rounded-lg ${
                  msg.role === "user"
                    ? "bg-blue-100 text-blue-800 ml-auto"
                    : "bg-gray-200 text-gray-800"
                } max-w-[80%]`}
              >
                <p className="text-sm">{msg.content}</p>
              </div>
            ))
          )}
        </div>

        <button
          onClick={handleCall}
          disabled={callStatus === CallStatus.CONNECTING}
          className={`w-full py-2 px-4 rounded-md text-white font-semibold ${
            callStatus === CallStatus.ACTIVE
              ? "bg-red-500 hover:bg-red-600"
              : "bg-blue-500 hover:bg-blue-600"
          } disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors`}
        >
          {callStatus === CallStatus.ACTIVE
            ? "End Call"
            : callStatus === CallStatus.CONNECTING
            ? "Connecting..."
            : "Start Call"}
        </button>
      </div>
    </div>
  );
};

export default Agent;