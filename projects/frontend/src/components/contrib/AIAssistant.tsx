import React, { useState, useRef, useEffect } from 'react'

interface Message {
  id: string
  type: 'user' | 'ai'
  content: string
  timestamp: Date
}

interface AIAssistantProps {
  teamData: {
    members: any[]
    contributions: any[]
    conflicts?: string[]
  }
}

const AIAssistant: React.FC<AIAssistantProps> = ({ teamData }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: "👋 Hi! I'm your AI team coordinator. I help reduce conflicts and improve team dynamics. Ask me anything about your team's workload, or let me suggest improvements!",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // AI Response Logic
  const generateAIResponse = (userMessage: string): string => {
    const lowerMsg = userMessage.toLowerCase()

    // Conflict Detection Responses
    if (lowerMsg.includes('conflict') || lowerMsg.includes('fight') || lowerMsg.includes('disagree')) {
      return `🤝 I understand there's tension. Here's what I suggest:

1. **Acknowledge contributions**: Each member has logged work. Review the blockchain records together to see who's done what.
2. **Fair discussion**: Use the transparent contribution % as a starting point for conversation.
3. **Rebalance tasks**: I can help redistribute remaining work based on current contributions.

Would you like me to analyze your team's workload distribution?`
    }

    // Stress Management
    if (lowerMsg.includes('stress') || lowerMsg.includes('overwhelm') || lowerMsg.includes('tired')) {
      return `😌 Team stress is real. Here are evidence-based strategies:

**For the overworked members:**
- Take a 10-minute break every hour (Pomodoro technique)
- Delegate smaller tasks to less-loaded teammates
- Current data shows uneven distribution - let's fix that

**For the team:**
- Schedule a 15-min sync today to redistribute tasks
- Use blockchain logs to show who has capacity
- Set realistic milestones together

Shall I suggest specific task reassignments based on current workload?`
    }

    // Workload Analysis
    if (lowerMsg.includes('workload') || lowerMsg.includes('distribution') || lowerMsg.includes('fair')) {
      const analysis = analyzeWorkload(teamData)
      return `📊 **Workload Analysis:**

${analysis}

**Recommendation:** The member(s) with <20% contribution should pick up at least 2 more tasks this week. Would you like me to suggest which tasks?`
    }

    // Inactive Member
    if (lowerMsg.includes('inactive') || lowerMsg.includes('not working') || lowerMsg.includes('freeload')) {
      return `⚠️ **Handling Inactive Members:**

I've detected members with low contribution. Here's a diplomatic approach:

1. **Private message first**: "Hey [name], noticed you haven't logged work recently. Everything okay? Need help with your tasks?"
2. **Show data**: Share the blockchain dashboard - facts, not accusations.
3. **Offer support**: Maybe they're stuck? Offer pair programming or task clarification.
4. **Set deadline**: "Let's sync by [date] to redistribute if needed."

The blockchain record is permanent - they can't deny inactivity later. Use it as leverage for fair grading.`
    }

    // Task Suggestions
    if (lowerMsg.includes('task') || lowerMsg.includes('what should') || lowerMsg.includes('next')) {
      return `✅ **Task Distribution Suggestions:**

Based on current contributions:

**High contributors (40%+ done):** Focus on review, testing, documentation
**Medium contributors (20-40%):** Take on 1-2 implementation tasks
**Low contributors (<20%):** Assign clear, defined tasks with deadlines

**Specific suggestions:**
- Member with 0 hours → Assign: "Write test cases" (clear deliverable)
- Member with high hours → Assign: "Review pull requests" (lighter load)

Want me to generate specific task assignments?`
    }

    // Motivation
    if (lowerMsg.includes('motivate') || lowerMsg.includes('encourage') || lowerMsg.includes('boost morale')) {
      return `🚀 **Team Motivation Strategies:**

**Celebrate wins:**
- "Great job [top contributor]! 45% contribution - you're crushing it!"
- Post milestone updates in group chat

**Make progress visible:**
- Share the dashboard daily - seeing progress motivates
- Blockchain proof = tangible achievement

**Gamify it:**
- "Who can log the most quality hours this week?"
- Competition drives engagement (but keep it friendly!)

**Recognize effort:**
Even small contributions matter. Thank people publicly when they log work.`
    }

    // Default Response
    return `🤔 I can help with:
- **Conflict resolution** - Say "conflict" or "disagreement"
- **Stress management** - Say "stress" or "overwhelmed"  
- **Workload analysis** - Say "workload" or "distribution"
- **Task suggestions** - Say "what tasks" or "next steps"
- **Motivation tips** - Say "motivate" or "encourage team"

What would you like help with?`
  }

  const analyzeWorkload = (data: any) => {
    const { members } = data
    if (!members || members.length === 0) {
      return 'No data available yet. Start logging contributions!'
    }

    const high = members.filter((m: any) => m.percentage >= 40)
    const medium = members.filter((m: any) => m.percentage >= 20 && m.percentage < 40)
    const low = members.filter((m: any) => m.percentage < 20)

    return `
**High contributors (≥40%):** ${high.length} member(s) - Risk of burnout ⚠️
**Medium contributors (20-39%):** ${medium.length} member(s) - Good balance ✅
**Low contributors (<20%):** ${low.length} member(s) - Need more tasks 🎯

${low.length > 0 ? '⚠️ **Alert:** Workload is unbalanced. Low contributors should increase effort.' : '✅ **Great!** Workload is fairly distributed.'}
`
  }

  const handleSend = async () => {
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    // Simulate AI thinking delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: generateAIResponse(input),
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiResponse])
      setIsTyping(false)
    }, 1500)
  }

  return (
    <div className="bg-white rounded-xl shadow-lg border border-blue-100 overflow-hidden flex flex-col h-[600px]">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">AI Team Coordinator</h3>
            <p className="text-purple-200 text-xs">Conflict resolution • Stress management • Task optimization</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                msg.type === 'user'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                  : 'bg-white border border-gray-200 text-gray-800'
              }`}
            >
              {msg.type === 'ai' && (
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">AI</span>
                  </div>
                  <span className="text-xs text-gray-500">Team Coordinator</span>
                </div>
              )}
              <p className="text-sm whitespace-pre-line">{msg.content}</p>
              <p className={`text-xs mt-2 ${msg.type === 'user' ? 'text-blue-200' : 'text-gray-400'}`}>
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Actions */}
      <div className="px-6 py-3 bg-gray-100 border-t border-gray-200">
        <p className="text-xs text-gray-600 mb-2">Quick questions:</p>
        <div className="flex gap-2 flex-wrap">
          {['Conflict help', 'Stress tips', 'Workload analysis', 'Motivate team'].map((q) => (
            <button
              key={q}
              onClick={() => setInput(q)}
              className="text-xs px-3 py-1 bg-white border border-gray-300 rounded-full hover:bg-blue-50 hover:border-blue-300 transition-all"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t border-gray-200">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about conflicts, stress, or team coordination..."
            className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:ring focus:ring-purple-200 outline-none"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  )
}

export default AIAssistant
