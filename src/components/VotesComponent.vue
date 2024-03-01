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
// Data from Pinia
const { votingData } = storeToRefs(useVotingStore())

// button login

const activePositiveButtonIndex = ref(null)
const activeNegativeButtonIndex = ref(null)
const allowToVote = ref(false)

const togglePositiveButtonActive = (index: number | any) => {
  activeNegativeButtonIndex.value = null
  activePositiveButtonIndex.value = index
  allowToVote.value = true
}
const toggleNegativeButtonActive = (index: number | any) => {
  activePositiveButtonIndex.value = null
  activeNegativeButtonIndex.value = index
  allowToVote.value = true
}
// Date logic
const compareDates = (lastDate: string) => {
  const date = new Date(lastDate)
  console.log('date', date)
  // Get todays date
  const currentDate = new Date()

  // Calculate the difference in milliseconds between the dates
  const differenceBetweenDates = currentDate - date

  // Convert milliseconds to days
  const differenceInDays = differenceBetweenDates / (1000 * 60 * 60 * 24)

  // Create a function / if statement or switch to return if it is days / months / year
  if (differenceInDays / 30 < 1) {
    return differenceInDays + ' days ago in '
  } else if (differenceInDays / 30 > 1 && differenceInDays / 30 < 12) {
    return differenceInDays + ' months ago in '
  } else {
    let years = differenceInDays / 365

    return Math.floor(years) + ' years ago in '
  }
}

const checkMostVotesSymbol = (positive: number, negative: number) => {
  return positive > negative ? true : false
}

const fullVotes = (a: number, b: number) => {
  return a + b
}

const getPercentage = (a: number, b: number, actualVote: number) => {
  const allVotes = fullVotes(a, b)

  const result = (actualVote / allVotes) * 100
  return result.toFixed(1)
}
</script>
<template>
  <h1 class="main-title">Previous Rulings</h1>
  <div
    v-for="(vote, index) in votingData"
    :key="vote.name"
    class="content-wrapper"
  >
    <div
      class="content-wrapper__background"
      :style="{ backgroundImage: `url(${vote.picture})` }"
    >
      <div class="content-wrapper__design">
        <div class="title-wrapper">
          <div
            v-if="
              checkMostVotesSymbol(vote.votes.positive, vote.votes.negative)
            "
            class="top-items"
          >
            <img src="@/assets/img/thumbs-up.svg" alt="thumbs up" />
          </div>
          <div v-else class="top-items">
            <img src="@/assets/img/thumbs-down.svg" alt="thumbs down" />
          </div>
          <h2 class="content-wrapper__title">
            {{ vote.name }}
          </h2>
        </div>

        <p class="content-wrapper__description">
          {{ vote.description }}
        </p>
        <!--
        < div
        class="picture-img"
        :style="{ backgroundImage: 'url( ${vote.picture} )' }"
        >
        <img :src="`${vote.picture}`" alt="thumbs up" />
        </>
        -->
        <p class="content-wrapper__updated">
          {{ compareDates(vote.lastUpdated) }}{{ vote.category }}
        </p>
        <div class="middle-buttons">
          <div class="middle-items">
            <button
              class="button-middle"
              :style="{
                backgroundColor: 'rgba(var(--color-green-positive), 1)'
              }"
              :class="{ active: activePositiveButtonIndex === index }"
              @click="togglePositiveButtonActive(index)"
            >
              <img src="@/assets/img/thumbs-up.svg" alt="thumbs up" />
            </button>
          </div>
          <div class="middle-items">
            <button
              class="button-middle"
              :style="{
                backgroundColor: 'rgba(var(--color-yellow-negative), 0.8)'
              }"
              :class="{ active: activeNegativeButtonIndex === index }"
              @click="toggleNegativeButtonActive(index)"
            >
              <img src="@/assets/img/thumbs-down.svg" alt="thumbs down" />
            </button>
          </div>
          <div class="middle-items">
            <button class="vote-button" :class="{ disabled: !allowToVote }">
              Vote Now
            </button>
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
                <img src="@/assets/img/thumbs-down.svg" alt="thumbs down" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.content-wrapper {
  width: auto;
  margin: 2em 0;
  height: 100%;
}

.main-title {
  font-weight: 300;
  color: #464646;
}

.content-wrapper__background {
  width: 100%;
  height: fit-content;

  background-size: cover;
  background-position: center;
}

.content-wrapper__design {
  padding: 2em 0 0 0;
  color: var(--color-white);
}

.title-wrapper {
  display: flex;
  justify-content: flex-start;

  height: fit-content;
  padding: 3em 0 0 0;
}

.content-wrapper__title {
  margin: 0;
  font-size: 3rem;
  font-weight: 400;
  line-height: 1;

  color: var(--color-white);
}

.content-wrapper__updated {
  padding-left: 30%;
}

.top-items {
  width: auto;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.content-wrapper__description {
  display: block;
  white-space: nowrap;
  overflow: hidden;
  max-height: 10.5rem;
  margin: 1rem 0;
  -webkit-box-orient: vertical;
  font-size: 1.25rem;
  font-weight: 400;
  -webkit-line-clamp: 6;
  padding: 1em;
  text-overflow: ellipsis;
}

.middle-buttons {
  display: flex;
  justify-content: space-between;
  width: 65%;
  font-size: 1rem;
  height: 25%;
  min-height: 6em;
  margin-bottom: 1em;
  margin-left: 4em;
}

.button-middle {
  padding: 0;
  margin: 0;
  border: none;
  background: none;
}

.active {
  outline: 3px solid white;
}
.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.middle-items {
  width: auto;
  align-self: center;

  height: 100%;
}

.middle-items img[alt='thumbs up'] {
  padding: 1em;
}
.top-items img[alt='thumbs up'] {
  padding: 1em;
  background-color: rgba(var(--color-green-positive), 0.8);
}

.middle-items img[alt='thumbs down'] {
  padding: 1em;
}
.top-items img[alt='thumbs down'] {
  padding: 1em;
  background-color: rgba(var(--color-yellow-negative), 0.8);
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
  border: 2px solid white;
  width: 100%;
  font-size: 1rem;
  padding: 1em;
}

.voting-stats {
  display: flex;
  width: 100%;
  height: 3rem;
}

.voting-positive {
  height: 3rem;
  background-color: rgba(var(--color-green-positive), 0.7);
}

.voting-negative {
  height: 3rem;
  background-color: rgba(var(--color-yellow-negative), 0.7);
}
</style>
