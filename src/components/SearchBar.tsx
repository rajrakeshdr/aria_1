import { useState } from "react";
import svgPaths from "../imports/svg-qxfoti4d98";

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading?: boolean;
}

function SearchIcon() {
  return (
    <div className="h-[55.602px] relative shrink-0 w-[57.339px]" data-name="Search">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 58 56">
        <g id="Search">
          <path d={svgPaths.p3c9e66c0} fill="white" id="Vector" />
          <path d={svgPaths.p2d72bc80} fill="white" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function SendIcon() {
  return (
    <div className="h-[71.154px] relative shrink-0 w-[72.185px]" data-name="send">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 73 72">
        <g id="send">
          <rect fill="#272B34" height="71.1538" rx="10.3122" width="72.1851" />
          <path 
            d={svgPaths.p112e8400} 
            id="Vector" 
            stroke="white" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="3.4751" 
          />
        </g>
      </svg>
    </div>
  );
}

export function SearchBar({ onSearch, isLoading = false }: SearchBarProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && !isLoading) {
      onSearch(query);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-[961px] mx-auto">
      <div className="absolute bg-[#1c1f28] bottom-0 left-0 right-0 rounded-[29.643px] shadow-[0px_0px_139.322px_16.355px_rgba(236,131,187,0.6)] top-0" />
      
      <div className="relative bg-[#1c1f28] box-border content-stretch flex flex-col gap-[10.312px] items-center justify-center px-[46.405px] py-[13.406px] rounded-[29.905px]">
        <div aria-hidden="true" className="absolute border-[#ec83bb] border-[4.125px] border-solid inset-0 pointer-events-none rounded-[29.905px] shadow-[0px_0px_100.131px_16.499px_#3e2487]" />
        
        <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
          <div className="content-stretch flex gap-[33.014px] items-start relative shrink-0 flex-1">
            <SearchIcon />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask a cybersecurity question..."
              disabled={isLoading}
              className="font-['Poppins',_sans-serif] leading-[normal] not-italic relative shrink-0 text-[37.621px] text-white bg-transparent border-none outline-none flex-1 placeholder:text-white/40 disabled:opacity-50"
            />
          </div>
          
          <button 
            type="submit" 
            disabled={!query.trim() || isLoading}
            className="disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-transform"
          >
            <SendIcon />
          </button>
        </div>
      </div>
    </form>
  );
}
