import React, { useState } from 'react'
import { useWallet } from '@txnlab/use-wallet-react'

// Import new components
import ContributionForm from './contrib/ContributionForm'
import StatsCards from './contrib/StatsCards'
import HistoryTable from './contrib/HistoryTable'
import TeamMembers from './contrib/TeamMembers'

interface ContribChainProps {
  openModal: boolean
  closeModal: () => void
}

const ContribChain: React.FC<ContribChainProps> = ({ openModal, closeModal }) => {
  const { activeAddress } = useWallet()
  const [loading, setLoading] = useState(false)

  // Mock data (replace with real blockchain data later)
  const mockContributions = [
    {
      id: '1',
      member: activeAddress || 'ADDR1...',
      task: 'Built prototype circuit',
      hours: 8,
      timestamp: 'Feb 10, 2026',
    },
    {
      id: '2',
      member: 'ADDR2...',
      task: 'Completed literature review',
      hours: 5,
      timestamp: 'Feb 9, 2026',
    },
  ]

  const mockTeamMembers = [
    {
      address: activeAddress || 'ADDR1...',
      totalHours: 13,
      percentage: 52,
      contributions: 3,
    },
    {
      address: 'ADDR2...',
      totalHours: 8,
      percentage: 32,
      contributions: 2,
    },
    {
      address: 'ADDR3...',
      totalHours: 4,
      percentage: 16,
      contributions: 1,
    },
  ]

  const handleLogContribution = async (task: string, hours: number) => {
    setLoading(true)
    // TODO: Add blockchain logic here
    console.log('Logging:', { task, hours })
    
    // Simulate blockchain delay
    setTimeout(() => {
      setLoading(false)
      alert('Contribution logged! ✅')
    }, 2000)
  }

  if (!openModal) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={closeModal}
      />

      {/* Modal Content */}
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-gradient-to-br from-blue-50 via-white to-indigo-50 rounded-2xl shadow-2xl max-w-7xl w-full p-8">
          
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                ContribChain Dashboard
              </h2>
              <p className="text-gray-600 mt-1">
                Track group project contributions on Algorand blockchain
              </p>
            </div>
            <button
              onClick={closeModal}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Stats Cards */}
          <StatsCards
            totalContributions={6}
            totalHours={25}
            yourPercentage={52}
            teamSize={3}
          />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left Column: Form + Team */}
            <div className="lg:col-span-1 space-y-6">
              <ContributionForm
                onSubmit={handleLogContribution}
                loading={loading}
              />
              <TeamMembers members={mockTeamMembers} />
            </div>

            {/* Right Column: History */}
            <div className="lg:col-span-2">
              <HistoryTable contributions={mockContributions} />
            </div>

          </div>

        </div>
      </div>
    </div>
  )
}

export default ContribChain
