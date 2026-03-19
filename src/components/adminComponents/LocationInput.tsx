import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Loader2, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface LocationInputProps {
  value: string;
  onChange: (value: string) => void;
  onBlur?: (e: any) => void;
  name?: string;
  error?: string;
  placeholder?: string;
  className?: string;
  hideLabel?: boolean;
}

const LocationInput: React.FC<LocationInputProps> = ({ 
  value, 
  onChange, 
  onBlur, 
  name, 
  error, 
  placeholder = "Search location...",
  className = "",
  hideLabel = false
}) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fetch suggestions with debounce
  useEffect(() => {
    if (!value || value.length < 2 || !isOpen) {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(value)}&limit=5&addressdetails=1`,
          {
            headers: {
              'Accept-Language': 'en-US,en;q=0.5',
            }
          }
        );
        const data = await response.json();
        const locations = data.map((item: any) => item.display_name);
        setSuggestions(locations);
      } catch (err) {
        console.error('Location fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(fetchSuggestions, 600);
    return () => clearTimeout(debounceTimer);
  }, [value, isOpen]);

  return (
    <div className={`relative space-y-2 ${className}`} ref={containerRef}>
      {!hideLabel && <label className="text-sm font-medium text-white/70">Location</label>}
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          {loading ? (
            <Loader2 className="w-4 h-4 text-brand animate-spin" />
          ) : (
            <MapPin className="w-4 h-4 text-white/40 group-focus-within:text-brand transition-colors" />
          )}
        </div>
        <input 
          type="text"
          name={name}
          value={value}
          autoComplete="off"
          onChange={(e) => {
            onChange(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onBlur={onBlur}
          className={`w-full bg-black/40 border rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none transition-colors ${
            error ? 'border-red-500/50' : 'border-white/10 focus:border-brand/50'
          }`}
          placeholder={placeholder}
        />

        {/* Suggestions Dropdown */}
        <AnimatePresence>
          {isOpen && suggestions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full left-0 right-0 z-[9999] mt-2 glass-card border-brand/20 overflow-hidden shadow-2xl"
            >
              <div className="py-2 max-h-60 overflow-y-auto custom-scrollbar">
                {suggestions.map((suggestion, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      onChange(suggestion);
                      setIsOpen(false);
                    }}
                    className="w-full px-4 py-3 text-left text-sm text-white/70 hover:text-white hover:bg-brand/10 transition-colors flex items-start gap-3 border-b border-white/5 last:border-0"
                  >
                    <Search className="w-4 h-4 mt-0.5 text-brand/60 shrink-0" />
                    <span className="truncate">{suggestion}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {error && (
        <div className="text-red-500 text-xs flex items-center gap-1 mt-1">
          <MapPin className="w-3 h-3" /> {error}
        </div>
      )}
    </div>
  );
};

export default LocationInput;
