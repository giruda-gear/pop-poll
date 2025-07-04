export enum PollStatus {
  ACTIVE = 'active',
  ENDED = 'ended',
  SCHEDULED = 'scheduled',
}

export interface PollOption {
  id: number
  optionText: string
  voteCount: number
}

export interface Poll {
  id: number
  title: string
  description?: string
  creator: {
    id: number
    name: string
  }
  startAt: string
  endAt: string
  status: PollStatus
  options: PollOption[]
  createdAt: string
  updatedAt: string
}
