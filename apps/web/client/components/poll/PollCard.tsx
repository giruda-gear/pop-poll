import { Poll } from '../../types/poll'

export default function PollCard({ poll }: { poll: Poll }) {
  const isEnded = poll.status === 'ended'
  const totalVotes = poll.options.reduce(
    (sum, option) => sum + option.voteCount,
    0,
  )

  const option1 = poll.options[0]
  const option2 = poll.options[1]

  const option1Percentage =
    totalVotes > 0 ? (option1.voteCount / totalVotes) * 100 : 50
  const option2Percentage =
    totalVotes > 0 ? (option2.voteCount / totalVotes) * 100 : 50

  return (
    <div className="rounded-xl bg-white p-4 shadow transition hover:shadow-md">
      <div className="mb-2 flex items-start justify-between">
        <h3 className="text-lg font-bold text-gray-800">{poll.title}</h3>
        {isEnded ? (
          <span className="text-sm text-gray-400">✅ 종료됨</span>
        ) : (
          <button className="rounded-full bg-purple-600 px-4 py-1 text-sm text-white hover:bg-purple-700">
            참여하기
          </button>
        )}
      </div>

      <div className="mb-2 text-sm text-gray-500">
        🗳 총 {totalVotes}명 참여 | ⏰{' '}
        {new Date(poll.endAt).toLocaleDateString('ko-KR')} 마감
      </div>

      <div className="flex h-32 w-full overflow-hidden rounded-lg shadow-sm">
        <div
          className="flex flex-shrink-0 flex-col items-start justify-center bg-purple-600 p-6 text-white transition-all duration-500 ease-out"
          style={{ width: `${option1Percentage}%` }}
        >
          <span className="text-3xl font-bold">
            {Math.round(option1Percentage)}%
          </span>
          <span className="text-sm">{option1.voteCount}명</span>
          <span className="mt-auto text-lg">{option1.text}</span>
        </div>

        <div
          className="flex flex-shrink-0 flex-col items-end justify-center bg-[#3D8689] p-6 text-white transition-all duration-500 ease-out"
          style={{ width: `${option2Percentage}%` }}
        >
          <span className="text-3xl font-bold">
            {Math.round(option2Percentage)}%
          </span>
          <span className="text-sm">{option2.voteCount}명</span>
          <span className="mt-auto text-lg">{option2.text}</span>
        </div>
      </div>
    </div>
  )
}
