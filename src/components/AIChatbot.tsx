import React, { useState } from "react";
import { MessageCircle, X, Send, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hello! I'm your NHS pathway assistant. I can help you navigate PLAB exams, specialty training, sponsorship matching, and more. How can I assist you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");

  const sendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    // Simulate AI response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: getBotResponse(inputValue),
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 1000);
  };

  const getBotResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();

    if (lowerInput.includes("plab")) {
      return "PLAB (Professional and Linguistic Assessments Board) consists of PLAB 1 and PLAB 2. I can guide you through the requirements, timeline, and preparation strategies. Would you like to know about eligibility criteria or exam format?";
    }

    if (lowerInput.includes("mrcp") || lowerInput.includes("medicine")) {
      return "MRCP is the membership exam for the Royal College of Physicians. It consists of Part 1, Part 2 Written, and PACES. I can help you understand the pathway and connect you with our MRCP mentors and resources.";
    }

    if (lowerInput.includes("mrcs") || lowerInput.includes("surgery")) {
      return "MRCS is the membership exam for the Royal College of Surgeons. It includes Part A and Part B (OSCE). Our platform offers specialised surgical pathway guidance and mentor matching for surgical specialties.";
    }

    if (
      lowerInput.includes("sponsor") ||
      lowerInput.includes("visa") ||
      lowerInput.includes("job")
    ) {
      return "SponsorMatch™ can help you find NHS Trusts offering Certificate of Sponsorship. I can guide you through visa requirements, eligibility criteria, and application processes. Which specialty are you interested in?";
    }

    if (lowerInput.includes("cv") || lowerInput.includes("resume")) {
      return "CV Booster™ creates NHS-compliant CVs optimised for UK healthcare recruitment. It automatically formats your experience according to NHS standards and highlights relevant qualifications.";
    }

    if (lowerInput.includes("interview")) {
      return "InterviewSim™ provides AI-powered interview practice with specialty-specific questions. You can practice NHS job interviews, training interviews, and get feedback from our Principal Mentors.";
    }

    if (lowerInput.includes("mentor")) {
      return "Our NHS Principal Mentors are experienced consultants and senior doctors who provide personalised guidance. They can help with pathway planning, exam preparation, and career development. Would you like to be matched with a mentor in your specialty?";
    }

    return "I understand you're looking for NHS pathway guidance. I can help with PLAB exams, Royal College memberships (MRCP, MRCS, MRCOG, MRCPCH), sponsorship matching, CV optimization, and interview preparation. Could you be more specific about what you'd like to know?";
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen && (
          <Button
            onClick={() => setIsOpen(true)}
            className="w-14 h-14 rounded-full bg-primary hover:bg-primary/90 shadow-lg"
            size="icon"
          >
            <MessageCircle className="h-6 w-6" />
          </Button>
        )}
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-96 h-[600px] max-w-[calc(100vw-2rem)] max-h-[calc(100vh-2rem)]">
          <Card className="h-full flex flex-col shadow-2xl">
            <CardHeader className="bg-primary text-primary-foreground rounded-t-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Bot className="h-5 w-5" />
                  <CardTitle className="text-lg">NHS Assistant</CardTitle>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-primary-foreground hover:bg-primary-foreground/20"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-primary-foreground/80">
                Powered by NextDoc UK AI
              </p>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
              <ScrollArea className="flex-1 p-4 overflow-y-auto overflow-x-hidden">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.sender === "user"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-lg text-sm break-words ${
                          message.sender === "user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {message.content}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <div className="p-4 border-t">
                <div className="flex space-x-2">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask about NHS pathways, exams, sponsorship..."
                    className="flex-1 text-sm"
                  />
                  <Button
                    onClick={sendMessage}
                    size="icon"
                    className="shrink-0"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Press Enter to send • AI responses may take a moment
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default AIChatbot;
