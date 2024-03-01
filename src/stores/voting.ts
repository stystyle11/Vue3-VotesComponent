import { defineStore } from 'pinia'
import votingData from '@/data/data.json'
//import type { Votes } from '@/types/VotesData'

export const useVotingStore = defineStore('voting', {
  state: () => ({
    votingData
  }),
  actions: {
    addVotes(index, value) {
      this.votingData[index].push({ ...value })
    }
  }
})
