import { defineStore } from 'pinia'
import votingData from '@/data/data.json'
//import type { Votes } from '@/types/VotesData'

export const useVotingStore = defineStore('voting', {
  state: () => ({
    votingData
  }),
  actions: {
    /* Create two actions follows the thought about active and negative index of the buttons
     and separate the logic, although it could be 1 function here and in the front.
    */
    updatePositiveVotes(cardIndex: number, positiveVote: number) {
      const cardData = this.votingData[cardIndex]
      if (cardData) {
        cardData.votes.positive += positiveVote
      }
    },
    updateNegativeVotes(cardIndex: number, negativeVote: number) {
      const cardData = this.votingData[cardIndex]
      if (cardData) {
        cardData.votes.negative += negativeVote
      }
    }
  }
})
