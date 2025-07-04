import { Poll } from '../../types/poll'
import PollCard from './PollCard'

export default async function PollList() {
  const polls: Poll[] = await fetch('http://localhost:3001/api/polls').then(
    (res) => res.json(),
  )
  console.log(polls)
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
