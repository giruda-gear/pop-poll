import { PollStatus } from '../../types/poll'
import PollCard from './PollCard'

const polls = [
  {
    id: 1,
    title: '치킨 vs 피자',
    options: [
      { id: 1, text: '치킨', voteCount: 54 },
      { id: 2, text: '피자', voteCount: 35 },
    ],
    status: 'active' as PollStatus,
    endAt: '2025-07-06T00:00:00Z',
    creator: { id: 1, name: 'user1' },
    startAt: '2025-07-01T00:00:00Z',
    createdAt: '2025-07-01T00:00:00Z',
    updatedAt: '2025-07-01T00:00:00Z',
  },
]

export default function PollList() {
  return (
    <div className="mt-4 p-4">
      <h2 className="mb-4 text-xl font-semibold">전체 투표</h2>
      <div className="flex flex-col">
        {polls.map((poll) => (
          <PollCard key={poll.id} poll={poll} />
        ))}
      </div>
    </div>
  )
}
