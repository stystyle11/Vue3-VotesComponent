<script setup lang="ts">
import { ref, computed } from 'vue'

import { useVotingStore } from '@/stores/voting'
import { storeToRefs } from 'pinia'
//import type { Votes } from '@/types/VotesData'

interface Votes {
  name: string
  description: string
  category: string
  picture: string
  lastUpdated: string
  votes: {
    positive: number
    negative: number
  }
}
const { votingData } = storeToRefs(useVotingStore())

const fullVotes = (a: number, b: number) => {
  return a + b
}

const getPercentage = (a: number, b: number, actualVote: number) => {
  const allVotes = fullVotes(a, b)

  console.log((actualVote / allVotes) * 100)
  const result = (actualVote / allVotes) * 100
  return result.toFixed(1)
}
</script>
<template>
  <div v-for="vote in votingData" :key="vote.name" class="voting-wrapper">
    <h2 class="featured-card__title">{{ vote.name }}</h2>

    <p class="featured-card__desc">
      {{ vote.description }}
    </p>
    <img :src="`${vote.picture}`" alt="thumbs up" />

    <div class="featured-card__buttons">
      <button class="icon-button" aria-label="thumbs up">
        <img src="@/assets/img/thumbs-up.svg" alt="thumbs up" />
      </button>
      <button class="icon-button" aria-label="thumbs down">
        <img src="@/assets/img/thumbs-down.svg" alt="thumbs down" />
      </button>
      <button class="vote-button">Vote Now</button>
    </div>
    <div class="voting-stats">
      <div
        class="voting-positive"
        :style="{
          width:
            getPercentage(
              vote.votes.negative,
              vote.votes.positive,
              vote.votes.positive
            ) + '%'
        }"
      >
        {{
          getPercentage(
            vote.votes.negative,
            vote.votes.positive,
            vote.votes.positive
          ) + '%'
        }}
      </div>
      <div
        class="voting-negative"
        :style="{
          width:
            getPercentage(
              vote.votes.negative,
              vote.votes.positive,
              vote.votes.negative
            ) + '%'
        }"
      >
        {{
          getPercentage(
            vote.votes.negative,
            vote.votes.positive,
            vote.votes.negative
          ) + '%'
        }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.voting-wrapper {
  width: 100%;
  background-color: aqua;
}
.vote-button {
  background-color: #525252b6;
  color: white;
  border: 5px solid white;
  width: 30%;
  font-size: 1rem;
}
.voting-stats {
  display: flex;
  width: 100%;
  height: 3rem;
}
.voting-positive {
  height: 3rem;
  background-color: rgba(0, 128, 128, 0.758);
}
.voting-negative {
  height: 3rem;
  background-color: #c1923bbb;
}
</style>
