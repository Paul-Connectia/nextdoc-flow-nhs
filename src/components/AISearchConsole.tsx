import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const AISearchConsole = () => {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState("");
  const [showResponse, setShowResponse] = useState(false);
  const { toast } = useToast();

  const handleSearch = async () => {
    if (!query.trim()) return;

    setIsLoading(true);
    setShowResponse(false);

    try {
      const { data: session } = await supabase.auth.getSession();
      const userId = session?.session?.user?.id;

      const { data, error } = await supabase.functions.invoke('nextdoc-ai-search', {
        body: { 
          query: query.trim(),
          userId 
        }
      });

      if (error) throw error;

      setResponse(data.response || "I'm here to help with your NHS career questions. Feel free to ask about PLAB preparation, CV optimization, or career guidance.");
      setShowResponse(true);
    } catch (error) {
      console.error('AI search error:', error);
      toast({
        title: "Search Error",
        description: "Unable to process your query. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      {/* Search Input */}
      <div className="flex gap-3 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary/60 h-4 w-4" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask anything about NHS careers, PLAB, CVs…"
            className="pl-10 h-12 bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-white/60 focus:border-white/40"
            disabled={isLoading}
          />
        </div>
        <Button
          onClick={handleSearch}
          disabled={isLoading || !query.trim()}
          className="h-12 px-6 bg-white text-primary hover:bg-white/90 font-semibold"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Thinking...
            </>
          ) : (
            "Ask NextDoc AI"
          )}
        </Button>
      </div>

      {/* Response Panel */}
      {showResponse && (
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-5 text-white animate-fade-in">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-1">
              <Search className="h-4 w-4 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm leading-relaxed mb-4">{response}</p>
              <Button
                variant="outline"
                size="sm"
                className="border-white/30 text-white hover:bg-white/10 hover:text-white"
              >
                Explore Tools
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};