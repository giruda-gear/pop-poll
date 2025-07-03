import { UsersIcon } from '@heroicons/react/24/solid'

export default function TodayPoll() {
  const totalVotes = 65
  const option1Votes = 51
  const option2Votes = 14

  const option1Percentage = (option1Votes / totalVotes) * 100
  const option2Percentage = (option2Votes / totalVotes) * 100

  const optionText1 = '찬성!!'
  const optionText2 = '반대올시다!!'

  return (
    <section className="bg-gray-50 py-4 shadow-sm">
      <div className="flex justify-center bg-gray-50 p-4 first-letter:items-center">
        <div className="w-full rounded-lg bg-white p-4 shadow-xl">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-800">오늘의 투표</h2>
          </div>

          <div className="relative flex h-28 overflow-hidden rounded-lg border border-gray-200">
            <div
              className="flex flex-shrink-0 flex-col items-start justify-center bg-purple-600 p-6 text-white transition-all duration-500 ease-out"
              style={{ width: `${option1Percentage}%` }}
            >
              <span className="text-3xl font-bold">
                {Math.round(option1Percentage)}%
              </span>
              <span className="text-sm">{option1Votes}명</span>
              <span className="mt-auto text-lg">{optionText1}</span>
            </div>

            <div
              className="flex flex-shrink-0 flex-col items-end justify-center bg-[#3D8689] p-6 text-white transition-all duration-500 ease-out"
              style={{ width: `${option2Percentage}%` }}
            >
              <span className="text-3xl font-bold">
                {Math.round(option2Percentage)}%
              </span>
              <span className="text-sm">{option2Votes}명</span>
              <span className="mt-auto text-lg">{optionText2}</span>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center space-x-1 text-gray-600">
              <UsersIcon className="h-5 w-5 text-gray-600" />
              <span className="text-base font-semibold">{totalVotes}</span>
            </div>

            <div className="text-sm text-gray-600">
              <span className="font-mono text-lg text-gray-800">06</span>일{' '}
              <span className="font-mono text-lg text-gray-800">12</span>:
              <span className="font-mono text-lg text-gray-800">26</span> 남음
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
