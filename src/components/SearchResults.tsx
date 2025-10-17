import { useState, useRef, useEffect } from 'react'
import svgPaths from '../imports/svg-qxfoti4d98'
import imgFlares from 'figma:asset/99d9597f0f7819bf1ea492a390459a0a767e0e63.png'
import { projectId, publicAnonKey } from '../utils/supabase/info'
import { ArrowLeft, User, Bot, Loader2 } from 'lucide-react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

interface SearchResultsProps {
  initialQuery: string
  onBack: () => void
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

export default function SearchResults({ initialQuery, onBack }: SearchResultsProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [query, setQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    // Process initial query
    if (initialQuery) {
      handleSearch(initialQuery)
    }
  }, [initialQuery])

  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) return

    // Add user message
    const userMessage: Message = { role: 'user', content: searchQuery }
    setMessages(prev => [...prev, userMessage])
    setQuery('')
    setIsLoading(true)

    try {
      // Prepare conversation history
      const conversationHistory = messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }))

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-f8eac8da/search`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            query: searchQuery,
            conversationHistory
          })
        }
      )

      if (!response.ok) {
        const errorData = await response.json()
        console.error('Search API error:', errorData)
        throw new Error(errorData.error || 'Failed to get response')
      }

      const data = await response.json()
      
      // Add AI response
      const aiMessage: Message = {
        role: 'assistant',
        content: data.response
      }
      setMessages(prev => [...prev, aiMessage])

    } catch (error) {
      console.error('Error during search:', error)
      const errorMessage: Message = {
        role: 'assistant',
        content: `I apologize, but I encountered an error: ${error instanceof Error ? error.message : 'Unknown error'}. Please try again.`
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSearch(query)
  }

  return (
    <div className="bg-gradient-to-b from-[#0e0719] relative size-full to-[#181c49] via-[#100c23] via-[59.273%] flex flex-col" data-name="SearchResults">
      {/* Flares Background */}
      <div className="absolute h-[654.188px] left-1/2 -translate-x-1/2 top-[-101px] w-[1030.35px] pointer-events-none" data-name="Flares">
        <div className="absolute inset-0 opacity-5 overflow-hidden">
          <img alt="" className="absolute h-[157.62%] left-0 max-w-none top-[17.28%] w-full" src={imgFlares} />
        </div>
      </div>

      {/* Header */}
      <div className="relative z-10 border-b border-white/10 bg-[#0e0719]/50 backdrop-blur-sm">
        <div className="max-w-[1200px] mx-auto px-8 py-6 flex items-center gap-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
          >
            <ArrowLeft size={24} />
            <span className="font-['Poppins',sans-serif] text-[18px]">Back</span>
          </button>
          <h1 className="font-['Poppins',sans-serif] text-[32px] text-white">
            <span className="text-[#de55de]">Cyber Shield</span> AI
          </h1>
        </div>
      </div>

      {/* Messages Area */}
      <div className="relative z-10 flex-1 overflow-y-auto px-8 py-8">
        <div className="max-w-[900px] mx-auto space-y-6">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex gap-4 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.role === 'assistant' && (
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-[#de55de] to-[#ec83bb] flex items-center justify-center">
                  <Bot size={20} className="text-white" />
                </div>
              )}
              
              <div
                className={`max-w-[70%] rounded-2xl px-6 py-4 ${
                  message.role === 'user'
                    ? 'bg-gradient-to-br from-[#de55de] to-[#ec83bb] text-white'
                    : 'bg-[#1c1f28] text-white border border-[#ec83bb]/20'
                }`}
              >
                <p className="font-['Poppins',sans-serif] text-[16px] leading-relaxed whitespace-pre-wrap">
                  {message.content}
                </p>
              </div>

              {message.role === 'user' && (
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-[#3e2487] to-[#1c1f28] flex items-center justify-center border border-[#de55de]/30">
                  <User size={20} className="text-white" />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-4 justify-start">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-[#de55de] to-[#ec83bb] flex items-center justify-center">
                <Bot size={20} className="text-white" />
              </div>
              <div className="bg-[#1c1f28] rounded-2xl px-6 py-4 border border-[#ec83bb]/20">
                <Loader2 size={24} className="text-[#de55de] animate-spin" />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="relative z-10 border-t border-white/10 bg-[#0e0719]/50 backdrop-blur-sm">
        <div className="max-w-[900px] mx-auto px-8 py-6">
          <form onSubmit={handleSubmit}>
            <div className="relative">
              <div className="absolute bg-[#1c1f28] bottom-0 left-0 right-0 rounded-[29.643px] shadow-[0px_0px_100px_10px_rgba(236,131,187,0.4)] top-0" />
              <div className="relative bg-[#1c1f28] content-stretch flex items-center gap-4 px-8 py-4 rounded-[29.905px]">
                <div aria-hidden="true" className="absolute border-[#ec83bb] border-[3px] border-solid inset-0 pointer-events-none rounded-[29.905px] shadow-[0px_0px_80px_12px_#3e2487]" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Ask a follow-up question..."
                  disabled={isLoading}
                  className="font-['Poppins',sans-serif] leading-[normal] not-italic flex-1 text-[24px] text-white bg-transparent border-none outline-none placeholder:text-white/40 disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={isLoading || !query.trim()}
                  className="cursor-pointer transition-opacity hover:opacity-80 disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
                >
                  <Send />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
