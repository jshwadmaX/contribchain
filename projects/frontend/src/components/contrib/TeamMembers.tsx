import React from 'react'

interface TeamMember {
  address: string
  totalHours: number
  percentage: number
  contributions: number
}

interface TeamMembersProps {
  members: TeamMember[]
}

const TeamMembers: React.FC<TeamMembersProps> = ({ members }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-blue-100 overflow-hidden">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
          </svg>
          Team Contribution Breakdown
        </h3>
      </div>

      <div className="p-6 space-y-4">
        {members.length === 0 ? (
          <p className="text-center text-gray-500 py-8">
            No team members yet. Connect your wallet to get started! 👥
          </p>
        ) : (
          members
            .sort((a, b) => b.percentage - a.percentage)
            .map((member, index) => (
              <div key={member.address} className="relative">
                {/* Member Card */}
                <div className="flex items-center justify-between p-4 rounded-lg border-2 border-blue-100 hover:border-blue-300 transition-all bg-gradient-to-r from-blue-50 to-indigo-50">
                  
                  {/* Left: Rank + Member Info */}
                  <div className="flex items-center gap-4">
                    {/* Rank Badge */}
                    <div className={`
                      w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg
                      ${index === 0 ? 'bg-gradient-to-br from-yellow-400 to-orange-500 text-white' :
                        index === 1 ? 'bg-gradient-to-br from-gray-300 to-gray-400 text-gray-700' :
                        index === 2 ? 'bg-gradient-to-br from-orange-400 to-orange-600 text-white' :
                        'bg-blue-200 text-blue-800'}
                    `}>
                      {index + 1}
                    </div>

                    {/* Member Details */}
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">
                        {member.address.slice(0, 10)}...{member.address.slice(-6)}
                      </p>
                      <p className="text-xs text-gray-600">
                        {member.contributions} contributions • {member.totalHours}h total
                      </p>
                    </div>
                  </div>

                  {/* Right: Percentage */}
                  <div className="text-right">
                    <p className="text-2xl font-bold text-blue-600">
                      {member.percentage}%
                    </p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-2 bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-500"
                    style={{ width: `${member.percentage}%` }}
                  />
                </div>
              </div>
            ))
        )}
      </div>
    </div>
  )
}

export default TeamMembers
