import { useState, KeyboardEvent, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

interface ChipsInputProps {
  value: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
  maxLength?: number;
  pattern?: RegExp;
  caseSensitive?: boolean;
}

export default function ChipsInput({
  value,
  onChange,
  placeholder = "Enter value, press Enter to add",
  maxLength = 50,
  pattern = /^[A-Za-z0-9\s+\-\/]{1,50}$/,
  caseSensitive = false
}: ChipsInputProps) {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus when component mounts
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const normalize = (str: string) => 
    caseSensitive ? str.trim() : str.trim().toLowerCase();

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      addChip(inputValue.trim());
    } else if (e.key === "Backspace" && !inputValue && value.length > 0) {
      e.preventDefault();
      removeChip(value.length - 1);
    } else if (e.key === "Escape") {
      inputRef.current?.blur();
    }
  };

  const addChip = (chip: string) => {
    // Validate length
    if (chip.length > maxLength) {
      setError(`Maximum ${maxLength} characters`);
      return;
    }

    // Validate pattern
    if (!pattern.test(chip)) {
      setError("Invalid characters (allowed: letters, numbers, spaces, +, -, /)");
      return;
    }

    // Check for duplicates
    const normalized = normalize(chip);
    const exists = value.some(v => normalize(v) === normalized);
    if (exists) {
      setError("Already added");
      return;
    }

    // Add chip
    onChange([...value, chip]);
    setInputValue("");
    setError("");
    
    // Announce to screen readers
    announceToScreenReader(`Added chip: ${chip}`);
  };

  const removeChip = (index: number) => {
    const removed = value[index];
    onChange(value.filter((_, i) => i !== index));
    announceToScreenReader(`Removed chip: ${removed}`);
  };

  const announceToScreenReader = (message: string) => {
    const announcement = document.createElement("div");
    announcement.setAttribute("role", "status");
    announcement.setAttribute("aria-live", "polite");
    announcement.className = "sr-only";
    announcement.textContent = message;
    document.body.appendChild(announcement);
    setTimeout(() => document.body.removeChild(announcement), 1000);
  };

  return (
    <div className="space-y-2">
      {/* Chips display */}
      {value.length > 0 && (
        <div className="flex flex-wrap gap-2 p-2 bg-background rounded-md border">
          {value.map((chip, idx) => (
            <Badge
              key={idx}
              variant="secondary"
              className="pl-2 pr-1 py-1 flex items-center gap-1"
            >
              <span className="text-sm">{chip}</span>
              <button
                type="button"
                onClick={() => removeChip(idx)}
                className="ml-1 rounded-full p-0.5 hover:bg-destructive/20 focus:outline-none focus:ring-2 focus:ring-ring"
                aria-label={`Remove ${chip}`}
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}
      
      {/* Input field */}
      <Input
        ref={inputRef}
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
          if (error) setError("");
        }}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className={error ? "border-destructive" : ""}
        aria-invalid={!!error}
        aria-describedby={error ? "chips-error" : undefined}
      />
      
      {/* Error message */}
      {error && (
        <p id="chips-error" className="text-sm text-destructive">
          {error}
        </p>
      )}
      
      {/* Helper text */}
      <p className="text-xs text-muted-foreground">
        Press <kbd className="px-1 py-0.5 bg-muted rounded text-xs">Enter</kbd> to add, 
        <kbd className="px-1 py-0.5 bg-muted rounded text-xs ml-1">Backspace</kbd> to remove last
      </p>
    </div>
  );
}
