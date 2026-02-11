import React, { useState } from 'react'

interface ContributionFormProps {
  onSubmit: (task: string, hours: number) => void
  loading?: boolean
}

const ContributionForm: React.FC<ContributionFormProps> = ({ onSubmit, loading }) => {
  const [task, setTask] = useState('')
  const [hours, setHours] = useState('')

  const handleSubmit = () => {
    if (task && hours) {
      onSubmit(task, Number(hours))
      setTask('')
      setHours('')
    }
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 shadow-lg border border-blue-200">
      <h3 className="text-2xl font-bold text-blue-900 mb-4 flex items-center gap-2">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        Log Your Contribution
      </h3>

      <div className="space-y-4">
        {/* Task Description */}
        <div>
          <label className="block text-sm font-semibold text-blue-800 mb-2">
            Task Description
          </label>
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="e.g., Built prototype circuit"
            className="w-full px-4 py-3 rounded-lg border-2 border-blue-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all outline-none"
          />
        </div>

        {/* Hours Worked */}
        <div>
          <label className="block text-sm font-semibold text-blue-800 mb-2">
            Hours Worked
          </label>
          <input
            type="number"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            placeholder="e.g., 5"
            min="0"
            step="0.5"
            className="w-full px-4 py-3 rounded-lg border-2 border-blue-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all outline-none"
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={!task || !hours || loading}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-xl transform hover:-translate-y-0.5"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Logging to Blockchain...
            </span>
          ) : (
            '📝 Log Contribution'
          )}
        </button>
      </div>

      {/* Help Text */}
      <p className="text-xs text-blue-600 mt-4 text-center">
        💡 Your contribution will be permanently recorded on Algorand blockchain
      </p>
    </div>
  )
}

export default ContributionForm
