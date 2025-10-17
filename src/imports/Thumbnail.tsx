import svgPaths from "./svg-qxfoti4d98";
import imgFlares from "figma:asset/99d9597f0f7819bf1ea492a390459a0a767e0e63.png";

function Backdrop() {
  return <div className="absolute bg-[#1c1f28] bottom-0 left-[0.65%] right-[0.39%] rounded-[29.643px] shadow-[0px_0px_139.322px_16.355px_rgba(236,131,187,0.6)] top-0" data-name="Backdrop" />;
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
  );
}

function SearchBar() {
  return (
    <div className="content-stretch flex gap-[33.014px] items-start relative shrink-0" data-name="Search bar">
      <Search />
      <p className="font-['Poppins:Regular',_sans-serif] leading-[normal] not-italic relative shrink-0 text-[37.621px] text-nowrap text-white whitespace-pre">Ask a question</p>
    </div>
  );
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
  );
}

function SearchBar1() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-[896.401px]" data-name="Search bar">
      <SearchBar />
      <Send />
    </div>
  );
}

function SearchBar2() {
  return (
    <div className="absolute bg-[#1c1f28] bottom-[1.23%] box-border content-stretch flex flex-col gap-[10.312px] items-center justify-center left-0 px-[46.405px] py-[13.406px] right-0 rounded-[29.905px] top-[0.86%]" data-name="Search bar">
      <div aria-hidden="true" className="absolute border-[#ec83bb] border-[4.125px] border-solid inset-0 pointer-events-none rounded-[29.905px] shadow-[0px_0px_100.131px_16.499px_#3e2487]" />
      <SearchBar1 />
    </div>
  );
}

function PromptBar() {
  return (
    <div className="absolute h-[119.016px] left-[322.52px] top-[468.35px] w-[961.093px]" data-name="Prompt bar">
      <Backdrop />
      <SearchBar2 />
    </div>
  );
}

function Text() {
  return (
    <div className="absolute contents left-[calc(50%+0.46px)] top-[208.72px] translate-x-[-50%]" data-name="Text">
      <p className="absolute font-['Poppins:Bold',_sans-serif] leading-[73.5%] left-[800.46px] not-italic text-[76.713px] text-center text-white top-[208.72px] translate-x-[-50%] w-[830.922px]">
        <span>{`Search with `}</span>
        <span className="text-[#de55de]">Seamless</span>
        <span>{` Power`}</span>
      </p>
      <div className="absolute flex inset-[30.17%_27.81%_65.56%_70.02%] items-center justify-center">
        <div className="flex-none h-[35.325px] rotate-[165deg] w-[26.493px]">
          <div className="relative size-full" data-name="Vector">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 27 36">
              <path d={svgPaths.p29d99f00} fill="var(--fill-0, #E55AC5)" id="Vector" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Thumbnail() {
  return (
    <div className="bg-gradient-to-b from-[#0e0719] relative size-full to-[#181c49] via-[#100c23] via-[59.273%]" data-name="Thumbnail">
      <div className="absolute h-[654.188px] left-[284.83px] top-[-101px] w-[1030.35px]" data-name="Flares">
        <div className="absolute inset-0 opacity-5 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[157.62%] left-0 max-w-none top-[17.28%] w-full" src={imgFlares} />
        </div>
      </div>
      <div className="absolute bg-clip-text bg-gradient-to-b font-['Poppins:Regular',_sans-serif] from-[9.799%] from-[rgba(255,255,255,0)] leading-[normal] left-[374.78px] not-italic text-[23.868px] text-justify to-[92.95%] to-[rgba(255,255,255,0.33)] top-[510.26px] w-[858.622px]" style={{ WebkitTextFillColor: "transparent" }}>
        <p className="mb-0">AI-driven search is reshaping the digital landscape, offering an ever-evolving and sophisticated approach to information retrieval. With each interaction, these systems learn and adapt, providing users with a personalized and intuitive exploration of vast data landscapes. As AI search technology continues to advance, it not only enhances efficiency but also unlocks new dimensions of user-centric experiences, ensuring that the quest for information is not just a task but a journey of discovery tailored to individual preferences. The future promises even more innovation, making AI search an indispensable tool for navigating the complexities of the digital realm</p>
        <p className="mb-0">&nbsp;</p>
        <p className="mb-0">{`Precision at Every Query: Unleash the power of AI search's accuracy and relevance, ensuring that each search query brings forth precisely what you're looking for.`}</p>
        <p className="mb-0">&nbsp;</p>
        <p>Adaptive Intelligence in Action: Experience a dynamic search journey as AI adapts to your preferences, offering a tailored exploration that evolves with every interaction.offering a tailored exploration that evolves with every interaction.</p>
      </div>
      <PromptBar />
      <Text />
    </div>
  );
}