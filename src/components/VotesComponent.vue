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
    <div
      class="picture-img"
      :style="{ backgroundImage: `url(${vote.picture})` }"
    >
      <h2 class="featured-card__title">{{ vote.name }}</h2>

      <p class="featured-card__desc">
        {{ vote.description }}
      </p>
      <!--
      <div
        class="picture-img"
        :style="{ backgroundImage: 'url( ${vote.picture} )' }"
      >
        <img :src="`${vote.picture}`" alt="thumbs up" />
      </div>
      -->
      <div class="middle-buttons">
        <div class="middle-items">
          <img src="@/assets/img/thumbs-up.svg" alt="thumbs up" />
        </div>
        <div class="middle-items">
          <img src="@/assets/img/thumbs-down.svg" alt="thumbs down" />
        </div>
        <div class="middle-items">
          <button class="vote-button">Vote Now</button>
        </div>
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
          <div class="flex-votes">
            <div class="flex-positive">
              <img src="@/assets/img/thumbs-up.svg" alt="thumbs up" />
            </div>
            <div class="flex-positive">
              {{
                getPercentage(
                  vote.votes.negative,
                  vote.votes.positive,
                  vote.votes.positive
                ) + '%'
              }}
            </div>
          </div>
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
          <div class="flex-votes">
            <div class="flex-negative">
              {{
                getPercentage(
                  vote.votes.negative,
                  vote.votes.positive,
                  vote.votes.negative
                ) + '%'
              }}
            </div>

            <div class="flex-negative">
              <img src="@/assets/img/thumbs-down.svg" alt="thumbs up" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.voting-wrapper {
  width: 100%;

  margin: 1em 0;
}
.middle-buttons {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90%;
  font-size: 1rem;
  height: 20%;
  margin-bottom: 1em;
}
.middle-items {
  height: 100%;
  padding-left: 0.5em;
  width: auto;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding-left: 1.5em;
}
.middle-items img[alt='thumbs up'] {
  padding: 1em;

  background-color: rgba(var(--color-green-positive), 1);
}
.middle-items img[alt='thumbs down'] {
  padding: 1em;
  background-color: rgba(var(--color-yellow-negative), 0.8);
}
.picture-img {
  width: 100%;
  height: 200px;

  background-size: cover;
  background-position: center;
}
.flex-votes {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-size: 1.5rem;
  color: white;
}
.flex-positive {
  padding-left: 0.8em;
}
.flex-negative {
  padding-right: 0.8em;
}
.vote-button {
  background-color: #525252b6;
  color: white;
  border: 5px solid white;
  width: 100%;
  font-size: 1rem;
}
.voting-stats {
  display: flex;
  width: 100%;
  height: 3rem;
}
.voting-positive {
  height: 3rem;
  background-color: rgba(var(--color-green-positive), 1);
}
.voting-negative {
  height: 3rem;
  background-color: rgba(var(--color-yellow-negative), 0.8);
}
</style>
