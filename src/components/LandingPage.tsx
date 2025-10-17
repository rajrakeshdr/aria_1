import svgPaths from "../imports/svg-qxfoti4d98";
import imgFlares from "figma:asset/99d9597f0f7819bf1ea492a390459a0a767e0e63.png";
import { SearchBar } from "./SearchBar";

interface LandingPageProps {
  onSearch: (query: string) => void;
}

function DecorativeVector() {
  return (
    <div className="flex-none h-[35.325px] rotate-[165deg] w-[26.493px]">
      <div className="relative size-full" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 27 36">
          <path d={svgPaths.p29d99f00} fill="#E55AC5" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

export function LandingPage({ onSearch }: LandingPageProps) {
  return (
    <div className="bg-gradient-to-b from-[#0e0719] min-h-screen relative to-[#181c49] via-[#100c23] via-[59.273%] flex items-center justify-center overflow-hidden">
      {/* Flares Background */}
      <div className="absolute h-[654.188px] left-1/2 top-0 w-[1030.35px] -translate-x-1/2 pointer-events-none">
        <div className="absolute inset-0 opacity-5 overflow-hidden">
          <img 
            alt="" 
            className="absolute h-[157.62%] left-0 max-w-none top-[17.28%] w-full" 
            src={imgFlares} 
          />
        </div>
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-8 py-16">
        {/* Main Title */}
        <div className="text-center mb-16">
          <h1 className="font-['Poppins',_sans-serif] leading-[73.5%] text-[76.713px] text-center text-white mb-4">
            <span>Search with </span>
            <span className="text-[#de55de]">Seamless</span>
            <span> Power</span>
          </h1>
          <div className="flex justify-center mt-8">
            <DecorativeVector />
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-16">
          <SearchBar onSearch={onSearch} />
        </div>

        {/* Description Text */}
        <div className="max-w-[858px] mx-auto">
          <div 
            className="bg-clip-text bg-gradient-to-b font-['Poppins',_sans-serif] from-[9.799%] from-[rgba(255,255,255,0)] leading-[normal] not-italic text-[23.868px] text-justify to-[92.95%] to-[rgba(255,255,255,0.33)]" 
            style={{ WebkitTextFillColor: "transparent" }}
          >
            <p className="mb-4">
              AI-driven cybersecurity search is reshaping digital defense, offering an ever-evolving and sophisticated approach to threat intelligence retrieval. With each interaction, these systems learn and adapt, providing security professionals with personalized and intuitive exploration of vast security data landscapes.
            </p>
            
            <p className="mb-4">
              <strong className="text-[rgba(255,255,255,0.5)]">Precision at Every Query:</strong> Unleash the power of AI search's accuracy and relevance, ensuring that each security query brings forth precisely the threat intelligence you're looking for.
            </p>
            
            <p>
              <strong className="text-[rgba(255,255,255,0.5)]">Adaptive Intelligence in Action:</strong> Experience a dynamic search journey as AI adapts to your security preferences, offering a tailored exploration that evolves with every interaction, strengthening your defense posture with each query.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
