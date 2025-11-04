import React, { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send, Bot, Stethoscope, Brain, Heart, Zap, Eraser, EraserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useAuth, useUser } from "@clerk/clerk-react";
import Markdown from 'markdown-to-jsx'
// import { useInstagramAccess } from "@/hooks/useInstagramAccess";
// import { InstagramGateModal } from "@/components/InstagramGateModal";

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface SpecialtyMode {
  id: string;
  name: string;
  icon: React.ElementType;
  description: string;
}

const specialtyModes: SpecialtyMode[] = [
  { id: 'general', name: 'General', icon: Bot, description: 'General medical AI assistant' },
  { id: 'cardiology', name: 'Cardiology', icon: Heart, description: 'Cardiovascular medicine specialist' },
  { id: 'emergency', name: 'Emergency', icon: Zap, description: 'Emergency medicine expert' },
  { id: 'surgery', name: 'Surgery', icon: Stethoscope, description: 'Surgical specialty assistant' },
  { id: 'medicine', name: 'Internal Medicine', icon: Brain, description: 'Internal medicine specialist' },
];

const AdvancedAIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isSignedIn, isLoaded, userId } = useAuth()
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Welcome to NextDoc UK Assistant 🏥\n\nYour AI-powered career and exam companion for the NHS journey. Ask me about PLAB, CV reviews, CPD certificates, or mentorship options.",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId] = useState(`conv_${Date.now()}`);
  const [selectedSpecialty, setSelectedSpecialty] = useState('general');
  const [gateModalOpen, setGateModalOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  // const { canAccess, remainingUses, trackUsage, openVerificationModal, isPaidUser } = useInstagramAccess();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<{ message?: string; specialty?: string }>).detail || {};
      if (detail.specialty) setSelectedSpecialty(detail.specialty);
      setIsOpen(true);
      if (detail.message) {
        sendMessage(detail.message);
      }
    };
    window.addEventListener('nextdoc:open-ai' as any, handler as EventListener);
    return () => {
      window.removeEventListener('nextdoc:open-ai' as any, handler as EventListener);
    };
  }, []);

  const sendMessage = async (overrideText?: string) => {
    const text = (overrideText ?? inputValue).trim();
    if (!text || isLoading) return;


    // Check access for non-paid users
    // if (!isPaidUser && !canAccess('chat')) {
    //   const limitMessage: Message = {
    //     id: Date.now().toString(),
    //     content: `You've reached your daily limit (10 messages). Follow @nextdoc_uk on Instagram for 10 free queries/day, or upgrade to Pro for unlimited access.`,
    //     sender: 'bot',
    //     timestamp: new Date()
    //   };
    //   setMessages(prev => [...prev, limitMessage]);
    //   openVerificationModal('NextDoc AI Chat');
    //   return;
    // }

    const userMessage: Message = {
      id: Date.now().toString(),
      content: text,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Track usage for Instagram-verified users
    // if (!isPaidUser) {
    //   await trackUsage('chat');
    // }

    // Clear input only when using the input field
    if (!overrideText) setInputValue("");

    setIsLoading(true);

    try {
      // const { data: session } = await supabase.auth.getSession();
      // const userId = session?.session?.user?.id;

      // const { data, error } = await supabase.functions.invoke('nextdoc-ai-chat', {
      //   body: {
      //     message: text,
      //     userId,
      //     conversationId,
      //     specialty: selectedSpecialty
      //   }
      // });

      // if (error) throw error

      // if (isLoaded && !isSignedIn) {
      //   toast({
      //     title: "Login required",
      //     description: "Please login to continue with this feature",
      //     variant: "destructive",
      //   });
      //   return
      // }

      // if (isLoaded && isSignedIn) {

      const data = await fetch(`${import.meta.env.VITE_API_BASE_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          userId,
          conversationId,
        }),
      })

      const apiRes = await data.json()
      console.log(apiRes)

      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: apiRes.data.response,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);

      // }

    } catch (error: any) {
      console.error('AI chat error:', error);

      if (error.message?.includes('limit reached')) {
        toast({
          title: "Usage Limit Reached",
          description: "Upgrade to continue unlimited AI conversations.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Chat Error",
          description: "Unable to process your message. Please try again.",
          variant: "destructive",
        });
      }

      // Add error message to chat
      const errorMessage: Message = {
        id: (Date.now() + 2).toString(),
        content: "I apologize, but I'm experiencing technical difficulties. Please try again in a moment.",
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearConversation = () => {
    setMessages([{
      id: '1',
      content: "Conversation cleared. I'm ready to help with your NHS career journey. What would you like to know about PLAB, applications, career pathways, or specialty training?",
      sender: 'bot',
      timestamp: new Date()
    }]);
  };

  const selectedMode = specialtyModes.find(mode => mode.id === selectedSpecialty) || specialtyModes[0];
  const IconComponent = selectedMode.icon;

  return (
    <>
      {/* Chat Toggle Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen && (
          <Button
            onClick={() => {
              if (isLoaded && isSignedIn) {
                setIsOpen(true)
              }
              if (isLoaded && !isSignedIn) {
                toast({
                  title: "Login required",
                  description: "Please login to use our advanced AI ChatBot feature",
                  variant: "destructive",
                });
              }
            }}
            className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-white/20"
            size="icon"
          >
            <Bot className="h-7 w-7 text-white" />
          </Button>
        )}
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed left-2 right-2 bottom-2 h-[calc(100svh-60px)] sm:left-auto sm:bottom-6 sm:top-0 sm:right-6 z-50 sm:w-96 sm:h-[700px] sm:max-w-[calc(100vw-2rem)] sm:max-h-[calc(100vh-2rem)]">
          <Card className="h-full flex flex-col shadow-2xl bg-gradient-to-b from-background to-background/95 border-2 border-primary/20">
            <CardHeader className="bg-gradient-to-r from-primary to-primary/90 text-primary-foreground rounded-t-lg border-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 flex-1">
                  <IconComponent className="h-5 w-5" />
                  <div>
                    <CardTitle className="text-sm">NextDoc UK AI — NHS Career Assistant</CardTitle>
                    <p className="text-xs text-primary-foreground/80">{selectedMode.description}</p>
                  </div>
                </div>
                {/* {!isPaidUser && canAccess('chat') && (
                  <Badge variant="secondary" className="text-xs">
                    {remainingUses('chat')}/10 left
                  </Badge>
                )} */}
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-primary-foreground hover:bg-primary-foreground/20"
                    onClick={() => setIsOpen(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent className="flex-1 flex flex-col p-0 overflow-y-scroll">
              {/* Disclaimer Box */}
              <div className="p-1 px-3 border-b bg-amber-50/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                    <span className="text-xs font-medium text-amber-700">Educational & Career Guidance Only</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 px-2 text-xs text-amber-600 hover:text-amber-800"
                    onClick={() => setShowDisclaimer(!showDisclaimer)}
                  >
                    {showDisclaimer ? 'Hide' : 'Info'}
                  </Button>
                </div>
                {/* {showDisclaimer && (
                  <div className="mt-2 text-xs text-amber-600 leading-relaxed">
                    This assistant is for educational and career guidance only. It does not provide medical or visa advice. For personalised support, book a consultation with our NHS mentors.
                    {!isPaidUser && (
                      <div className="mt-2 pt-2 border-t border-amber-300">
                        💡 Instagram-verified users get 10 free queries/day. Upgrade to Pro for unlimited access.
                      </div>
                    )}
                  </div>
                )} */}
              </div>

              {/* Specialty Mode Selector */}
              {/* <div className="p-3 border-b bg-muted/30">
                <div className="flex flex-wrap gap-1">
                  {specialtyModes.map((mode) => {
                    const ModeIcon = mode.icon;
                    return (
                      <Button
                        key={mode.id}
                        variant={selectedSpecialty === mode.id ? "default" : "outline"}
                        size="sm"
                        className="text-xs h-7"
                        onClick={() => setSelectedSpecialty(mode.id)}
                      >
                        <ModeIcon className="h-3 w-3 mr-1" />
                        {mode.name}
                      </Button>
                    );
                  })}
                </div>
              </div> */}

              <ScrollArea className="flex-1 p-4 relative">
                <Button
                  variant="outline"
                  size="icon"
                  className="text-muted-foreground flex absolute top-2 right-0 items-center justify-center mr-5 text-sm hover:bg-primary-foreground/20 h-8 w-8"
                  onClick={clearConversation}
                  title="Clear conversation"
                >
                  <EraserIcon className="h-4 w-4 text-muted-foreground" />
                </Button>
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[85%] p-3 rounded-lg text-sm leading-relaxed ${message.sender === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-foreground border'
                          }`}
                      >
                        {message.sender === 'bot' ? <Markdown>{message.content}</Markdown> : message.content}
                        {message.sender === 'bot' && (
                          <div className="flex items-center mt-2 text-xs text-muted-foreground">
                            <Badge variant="outline" className="text-xs px-1 py-0">
                              NextDoc AI
                            </Badge>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  {(isLoading || !isLoaded) && (
                    <div className="flex justify-start">
                      <div className="bg-muted border rounded-lg p-3 max-w-[85%]">
                        <div className="flex items-center space-x-2">
                          <div className="animate-pulse flex space-x-1">
                            <div className="rounded-full bg-primary/60 h-2 w-2 animate-bounce"></div>
                            <div className="rounded-full bg-primary/60 h-2 w-2 animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="rounded-full bg-primary/60 h-2 w-2 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                          <span className="text-xs text-muted-foreground">NextDoc UK AI is thinking...</span>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              <div className="p-4 border-t bg-background">
                <div className="flex space-x-2">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask about medical topics, NHS careers, exams..."
                    className="flex-1 text-sm"
                    disabled={isLoading}
                  />
                  <Button
                    onClick={() => sendMessage()}
                    size="icon"
                    className="shrink-0"
                    disabled={isLoading || !inputValue.trim()}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Press Enter to send • NHS Mentor Assistant
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* <InstagramGateModal
        isOpen={gateModalOpen}
        onClose={() => setGateModalOpen(false)}
        featureName="NextDoc AI Chat"
        onVerificationSuccess={() => setGateModalOpen(false)}
      /> */}
    </>
  );
};

export default AdvancedAIChatbot;
