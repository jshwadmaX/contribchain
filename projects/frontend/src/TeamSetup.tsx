// src/TeamSetup.tsx
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

type Mode = 'choose' | 'form' | 'join'

// ─── Utility: generate random 6-char team code ───────────────────────────────
const generateCode = () =>
  Math.random().toString(36).substring(2, 8).toUpperCase()

// ─── Component ───────────────────────────────────────────────────────────────
const TeamSetup: React.FC = () => {
  const navigate = useNavigate()
  const userEmail = localStorage.getItem('userEmail') || 'Student'

  const [mode, setMode] = useState<Mode>('choose')

  // FORM A TEAM state
  const [teamName, setTeamName] = useState('')
  const [members, setMembers] = useState<string[]>([''])
  const [createdCode, setCreatedCode] = useState('')
  const [formDone, setFormDone] = useState(false)

  // JOIN A TEAM state
  const [joinCode, setJoinCode] = useState('')
  const [joinError, setJoinError] = useState('')
  const [joining, setJoining] = useState(false)

  // ── FORM: add / remove member fields ──────────────────────────────────────
  const addMember = () => setMembers([...members, ''])
  const removeMember = (i: number) => setMembers(members.filter((_, idx) => idx !== i))
  const updateMember = (i: number, val: string) => {
    const updated = [...members]
    updated[i] = val
    setMembers(updated)
  }

  // ── FORM: submit ──────────────────────────────────────────────────────────
  const handleFormTeam = (e: React.FormEvent) => {
    e.preventDefault()
    if (!teamName.trim()) return
    const code = generateCode()
    setCreatedCode(code)

    // Persist to localStorage
    localStorage.setItem('teamName', teamName)
    localStorage.setItem('teamCode', code)
    localStorage.setItem('teamRole', 'leader')
    localStorage.setItem(
      'teamMembers',
      JSON.stringify([userEmail, ...members.filter(Boolean)])
    )
    localStorage.setItem('teamSetupDone', 'true')
    setFormDone(true)
  }

  // ── JOIN: submit ───────────────────────────────────────────────────────────
  const handleJoinTeam = (e: React.FormEvent) => {
    e.preventDefault()
    setJoinError('')
    if (joinCode.trim().length < 4) {
      setJoinError('Please enter a valid team code.')
      return
    }
    setJoining(true)

    // Simulate lookup — replace with real API call
    setTimeout(() => {
      // For demo: any 6-char code is "valid"
      if (joinCode.trim().length === 6) {
        localStorage.setItem('teamCode', joinCode.trim().toUpperCase())
        localStorage.setItem('teamRole', 'member')
        localStorage.setItem('teamSetupDone', 'true')
        setJoining(false)
        navigate('/')
      } else {
        setJoinError('Team not found. Check the code and try again.')
        setJoining(false)
      }
    }, 900)
  }

  // ── After team formed: go to home ─────────────────────────────────────────
  const proceedToApp = () => navigate('/')

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 flex flex-col items-center justify-center p-4 relative overflow-hidden">

      {/* BG decorations */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* ── LOGO ─────────────────────────────────────────────────────────── */}
      <div className="mb-10 text-center relative z-10">
        <div className="inline-flex items-center gap-3 mb-1">
          <div className="w-9 h-9 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-white font-black text-base">C</span>
          </div>
          <span className="text-2xl font-extrabold text-white tracking-tight">ContribChain</span>
        </div>
        <p className="text-blue-300/60 text-xs tracking-widest uppercase">Team Onboarding</p>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          MODE: CHOOSE
      ══════════════════════════════════════════════════════════════════ */}
      {mode === 'choose' && (
        <div className="w-full max-w-xl relative z-10">
          <h1 className="text-3xl font-black text-white text-center mb-2">
            Welcome, {userEmail.split('@')[0]}!
          </h1>
          <p className="text-blue-300/70 text-center mb-10 text-sm">
            To get started, join an existing team or form a new one.
          </p>

          <div className="grid sm:grid-cols-2 gap-5">

            {/* Form a team card */}
            <button
              onClick={() => setMode('form')}
              className="group relative bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-400/50 rounded-3xl p-8 text-left transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/10"
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Form a Team</h3>
              <p className="text-blue-200/60 text-sm leading-relaxed">
                Create a new team, invite members, and become the team leader.
              </p>
              <div className="mt-5 flex items-center gap-1.5 text-cyan-400 text-sm font-semibold">
                <span>Get started</span>
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
              {/* Leader badge */}
              <span className="absolute top-4 right-4 px-2.5 py-1 bg-yellow-400/20 border border-yellow-400/30 text-yellow-300 text-xs font-bold rounded-full">
                LEADER
              </span>
            </button>

            {/* Join a team card */}
            <button
              onClick={() => setMode('join')}
              className="group relative bg-white/5 hover:bg-white/10 border border-white/10 hover:border-indigo-400/50 rounded-3xl p-8 text-left transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-indigo-500/10"
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-400 flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Join a Team</h3>
              <p className="text-blue-200/60 text-sm leading-relaxed">
                Enter the invite code shared by your team leader to join their group.
              </p>
              <div className="mt-5 flex items-center gap-1.5 text-purple-400 text-sm font-semibold">
                <span>Enter code</span>
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
              {/* Member badge */}
              <span className="absolute top-4 right-4 px-2.5 py-1 bg-indigo-400/20 border border-indigo-400/30 text-indigo-300 text-xs font-bold rounded-full">
                MEMBER
              </span>
            </button>

          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          MODE: FORM A TEAM
      ══════════════════════════════════════════════════════════════════ */}
      {mode === 'form' && !formDone && (
        <div className="w-full max-w-md relative z-10">
          <button
            onClick={() => setMode('choose')}
            className="flex items-center gap-1.5 text-blue-300/60 hover:text-blue-200 text-sm mb-6 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Form a Team</h2>
                <p className="text-blue-300/60 text-xs">You'll be the team leader</p>
              </div>
              <span className="ml-auto px-2.5 py-1 bg-yellow-400/20 border border-yellow-400/30 text-yellow-300 text-xs font-bold rounded-full">
                LEADER
              </span>
            </div>

            <form onSubmit={handleFormTeam} className="space-y-5">

              {/* Team name */}
              <div>
                <label className="block text-blue-200 text-sm font-semibold mb-2">
                  Team Name
                </label>
                <input
                  type="text"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  placeholder="e.g. Team Alpha"
                  className="w-full px-4 py-3 bg-white/10 border border-white/15 rounded-xl text-white placeholder-blue-300/30 focus:outline-none focus:border-blue-400 transition-all text-sm"
                  required
                />
              </div>

              {/* Member emails */}
              <div>
                <label className="block text-blue-200 text-sm font-semibold mb-2">
                  Add Team Members <span className="text-blue-300/40 font-normal">(email)</span>
                </label>
                <div className="space-y-2.5">
                  {members.map((m, i) => (
                    <div key={i} className="flex gap-2">
                      <input
                        type="email"
                        value={m}
                        onChange={(e) => updateMember(i, e.target.value)}
                        placeholder={`member${i + 1}@university.edu`}
                        className="flex-1 px-4 py-2.5 bg-white/10 border border-white/15 rounded-xl text-white placeholder-blue-300/30 focus:outline-none focus:border-blue-400 transition-all text-sm"
                      />
                      {members.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeMember(i)}
                          className="px-3 py-2.5 bg-red-500/20 border border-red-400/20 text-red-400 rounded-xl hover:bg-red-500/30 transition-all text-sm"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={addMember}
                  className="mt-2.5 flex items-center gap-1.5 text-cyan-400 text-sm hover:text-cyan-300 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add another member
                </button>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold rounded-xl shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all text-sm tracking-wide"
              >
                Create Team &amp; Get Invite Code
              </button>

            </form>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          MODE: FORM — SUCCESS (show generated code)
      ══════════════════════════════════════════════════════════════════ */}
      {mode === 'form' && formDone && (
        <div className="w-full max-w-md relative z-10">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl text-center">

            {/* Success icon */}
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-400 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h2 className="text-2xl font-black text-white mb-1">Team Created!</h2>
            <p className="text-blue-200/60 text-sm mb-7">
              Share this code with your teammates so they can join.
            </p>

            {/* Code box */}
            <div className="bg-black/30 border border-white/10 rounded-2xl p-5 mb-6">
              <p className="text-blue-300/60 text-xs uppercase tracking-widest mb-2">Your Team Invite Code</p>
              <p className="text-4xl font-black text-white tracking-[0.3em] font-mono">{createdCode}</p>
            </div>

            <div className="text-left bg-white/5 border border-white/10 rounded-xl p-4 mb-6 space-y-1.5 text-sm">
              <div className="flex justify-between">
                <span className="text-blue-300/60">Team Name</span>
                <span className="text-white font-semibold">{teamName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-300/60">Your Role</span>
                <span className="text-yellow-300 font-semibold">Leader</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-300/60">Members Added</span>
                <span className="text-white font-semibold">{members.filter(Boolean).length}</span>
              </div>
            </div>

            <button
              onClick={proceedToApp}
              className="w-full py-3.5 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold rounded-xl shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all text-sm tracking-wide"
            >
              Continue to ContribChain →
            </button>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          MODE: JOIN A TEAM
      ══════════════════════════════════════════════════════════════════ */}
      {mode === 'join' && (
        <div className="w-full max-w-md relative z-10">
          <button
            onClick={() => setMode('choose')}
            className="flex items-center gap-1.5 text-blue-300/60 hover:text-blue-200 text-sm mb-6 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-400 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Join a Team</h2>
                <p className="text-blue-300/60 text-xs">Enter the invite code from your leader</p>
              </div>
            </div>

            <form onSubmit={handleJoinTeam} className="space-y-5">

              <div>
                <label className="block text-blue-200 text-sm font-semibold mb-2">
                  Team Invite Code
                </label>
                <input
                  type="text"
                  value={joinCode}
                  onChange={(e) => {
                    setJoinCode(e.target.value.toUpperCase())
                    setJoinError('')
                  }}
                  placeholder="e.g. A1B2C3"
                  maxLength={6}
                  className="w-full px-4 py-4 bg-white/10 border border-white/15 rounded-xl text-white placeholder-blue-300/30 focus:outline-none focus:border-indigo-400 transition-all text-xl font-mono text-center tracking-[0.3em] uppercase"
                />
                {joinError && (
                  <p className="mt-2 text-red-400 text-sm">{joinError}</p>
                )}
              </div>

              <div className="bg-indigo-500/10 border border-indigo-400/20 rounded-xl p-3.5 text-sm text-indigo-200/70 flex gap-2.5">
                <svg className="w-4 h-4 shrink-0 mt-0.5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20A10 10 0 0012 2z" />
                </svg>
                Ask your team leader for the 6-character invite code they received when creating the team.
              </div>

              <button
                type="submit"
                disabled={joining}
                className="w-full py-3.5 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-bold rounded-xl shadow-lg hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all text-sm tracking-wide"
              >
                {joining ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Joining...
                  </span>
                ) : (
                  'Join Team'
                )}
              </button>

            </form>
          </div>
        </div>
      )}

    </div>
  )
}

export default TeamSetup
