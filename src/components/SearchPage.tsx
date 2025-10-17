import { useState } from 'react'
import svgPaths from '../imports/svg-qxfoti4d98'
import imgFlares from 'figma:asset/99d9597f0f7819bf1ea492a390459a0a767e0e63.png'

interface SearchPageProps {
  onSearch: (query: string) => void
}

function Search() {
  return (
    <div className="h-[55.602px] relative shrink-0 w-[57.339px]" data-name="Search">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 58 56">
        <g id="Search">
          <path d={svgPaths.p3c9e66c0} fill="var(--fill-0, white)" id="Vector" />
          <path d={svgPaths.p2d72bc80} fill="var(--fill-0, white)" id="Vector_2" />
        </g>
      </svg>
    </div>
  )
}

function Send() {
  return (
    <div className="h-[71.154px] relative shrink-0 w-[72.185px]" data-name="send">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 73 72">
        <g id="send">
          <rect fill="var(--fill-0, #272B34)" height="71.1538" rx="10.3122" width="72.1851" />
          <path d={svgPaths.p112e8400} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.4751" />
        </g>
      </svg>
    </div>
  )
}

export default function SearchPage({ onSearch }: SearchPageProps) {
  const [query, setQuery] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      onSearch(query)
    }
  }

  return (
    <div className="bg-gradient-to-b from-[#0e0719] relative size-full to-[#181c49] via-[#100c23] via-[59.273%] flex items-center justify-center" data-name="SearchPage">
      {/* Flares Background */}
      <div className="absolute h-[654.188px] left-1/2 -translate-x-1/2 top-[-101px] w-[1030.35px]" data-name="Flares">
        <div className="absolute inset-0 opacity-5 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[157.62%] left-0 max-w-none top-[17.28%] w-full" src={imgFlares} />
        </div>
      </div>

      <div className="relative z-10 w-full max-w-[1200px] px-8">
        {/* Title */}
        <div className="text-center mb-16">
          <h1 className="font-['Poppins',sans-serif] leading-[73.5%] not-italic text-[76.713px] text-center text-white mb-8">
            <span>Search with </span>
            <span className="text-[#de55de]">Seamless</span>
            <span> Power</span>
          </h1>
          
          {/* Decorative Icon */}
          <div className="flex items-center justify-center mb-12">
            <div className="flex-none h-[35.325px] rotate-[165deg] w-[26.493px]">
              <div className="relative size-full">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 27 36">
                  <path d={svgPaths.p29d99f00} fill="var(--fill-0, #E55AC5)" id="Vector" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSubmit} className="mb-12">
          <div className="relative">
            <div className="absolute bg-[#1c1f28] bottom-0 left-0 right-0 rounded-[29.643px] shadow-[0px_0px_139.322px_16.355px_rgba(236,131,187,0.6)] top-0" />
            <div className="relative bg-[#1c1f28] content-stretch flex flex-col gap-[10.312px] items-center justify-center px-[46.405px] py-[13.406px] rounded-[29.905px]">
              <div aria-hidden="true" className="absolute border-[#ec83bb] border-[4.125px] border-solid inset-0 pointer-events-none rounded-[29.905px] shadow-[0px_0px_100.131px_16.499px_#3e2487]" />
              <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
                <div className="content-stretch flex gap-[33.014px] items-center relative shrink-0 flex-1">
                  <Search />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Ask a question"
                    className="font-['Poppins',sans-serif] leading-[normal] not-italic flex-1 text-[37.621px] text-white bg-transparent border-none outline-none placeholder:text-white/60"
                  />
                </div>
                <button type="submit" className="cursor-pointer transition-opacity hover:opacity-80">
                  <Send />
                </button>
              </div>
            </div>
          </div>
        </form>

        {/* Description Text */}
        <div className="bg-clip-text bg-gradient-to-b font-['Poppins',sans-serif] from-[9.799%] from-[rgba(255,255,255,0)] leading-[normal] not-italic text-[23.868px] text-justify to-[92.95%] to-[rgba(255,255,255,0.33)] max-w-[858px] mx-auto" style={{ WebkitTextFillColor: 'transparent' }}>
          <p className="mb-4">
            AI-driven search is reshaping the digital landscape, offering an ever-evolving and sophisticated approach to information retrieval. With each interaction, these systems learn and adapt, providing users with a personalized and intuitive exploration of vast data landscapes. As AI search technology continues to advance, it not only enhances efficiency but also unlocks new dimensions of user-centric experiences, ensuring that the quest for information is not just a task but a journey of discovery tailored to individual preferences.
          </p>
          <p className="mb-4">
            <strong>Precision at Every Query:</strong> Unleash the power of AI search's accuracy and relevance, ensuring that each search query brings forth precisely what you're looking for.
          </p>
          <p>
            <strong>Adaptive Intelligence in Action:</strong> Experience a dynamic search journey as AI adapts to your preferences, offering a tailored exploration that evolves with every interaction.
          </p>
        </div>
      </div>
    </div>
  )
}
