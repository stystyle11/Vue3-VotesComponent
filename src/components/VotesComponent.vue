<script setup lang="ts">
import { ref, watchEffect } from 'vue'

import { useVotingStore } from '@/stores/voting'

import { storeToRefs } from 'pinia'
import GridComponent from '@/components/GridComponent.vue'

import ListComponent from '@/components/ListComponent.vue'
//import type { Votes } from '@/types/VotesData'

// Data from Pinia
const { votingData } = storeToRefs(useVotingStore())
const votingStore = useVotingStore()

/* update votes in Pinia
 If the active button has been pressed and active positive has a value
 then store it in the positive votes, else store it in the negative votes
 making it two function in pinia, I only need to pass the data I will compute!

 button login
 Selected active and positive based on the index of the item clicked
*/
const activePositiveButtonIndex = ref(null)
const activeNegativeButtonIndex = ref(null)
const allowToVote = ref(null)

const togglePositiveButtonActive = (index: number | any) => {
  activeNegativeButtonIndex.value = null
  activePositiveButtonIndex.value = index
  allowToVote.value = index
}
const toggleNegativeButtonActive = (index: number | any) => {
  activePositiveButtonIndex.value = null
  activeNegativeButtonIndex.value = index
  allowToVote.value = index
}
// Date logic
const compareDates = (lastDate: string) => {
  const date = new Date(lastDate)

  // Get todays date
  const currentDate = new Date()

  // Calculate the difference in milliseconds
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

// Check for who has more votes, negative or positive

const checkMostVotesSymbol = (positive: number, negative: number) => {
  return positive > negative ? true : false
}

// get total number of votes
const fullVotes = (a: number, b: number) => {
  return a + b
}
// The the percentage of the votes.
const getPercentage = (a: number, b: number, actualVote: number) => {
  const allVotes = fullVotes(a, b)

  const result = (actualVote / allVotes) * 100
  return result.toFixed(1)
}
/*
To avoid looping the array to check for buttons clicked
We will create this before the component mounts and loop it only once
*/
const votesCasted = ref<Array<number>>([])

const addingValuesToVotes = () =>
  votingData.value.forEach(() => {
    votesCasted.value.push(0)
  })

addingValuesToVotes()
// Only the votes button clicked will dissapear
const updateVotes = (index: number) => {
  if (activePositiveButtonIndex.value !== null) {
    votingStore.updatePositiveVotes(index, 1)
    votesCasted.value[index] = 1
  } else {
    votingStore.updateNegativeVotes(index, 1)
    votesCasted.value[index] = 1
  }
}
// When the user clicks on the vote again button, his vote on that card will be reset to 0
const resetVotes = (index: number) => {
  votesCasted.value[index] = 0
  activePositiveButtonIndex.value = null
  activeNegativeButtonIndex.value = null
  allowToVote.value = null
}
// DropDown Logic

const isOpen = ref(false)
const selectedGrid = ref<string>('Grid')

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

// Add Ellipsis to texts title and description
const addEllipsis = (text: string, max: number) => {
  if (text.length > max) {
    return text.slice(0, max) + '...'
  } else {
    return text
  }
}
// Logic to display either mobile or Grid or List

const isMobile = ref<boolean>(false)
const windowWidth = ref(window.innerWidth)
const isGrid = ref<boolean>(false)

const desktopColumns = ref<number>(2)
// Maybe just toogle isGrid
//const isList = ref<boolean>(false)

const handleItemClick = (item: string) => {
  selectedGrid.value = item
  isOpen.value = false
  return selectedGrid.value === 'Grid'
    ? (isGrid.value = true)
    : (isGrid.value = false)
}
const checkStartWidth = () => {
  if (windowWidth.value < 768) {
    isMobile.value = true
  } else if (windowWidth.value > 768 && windowWidth.value < 1025) {
    isMobile.value = false
    isGrid.value = true
    desktopColumns.value = 2
  } else {
    desktopColumns.value = 3
    isGrid.value = true
  }
}
checkStartWidth()
// Create a watch effect to observe changes in the width of the window
watchEffect(() => {
  const watchResize = () => {
    windowWidth.value = window.innerWidth
    if (windowWidth.value < 768) {
      isMobile.value = true
      desktopColumns.value = 2
    } else if (windowWidth.value > 768 && windowWidth.value < 1025) {
      isMobile.value = false
      console.log('verificando', desktopColumns.value)
      desktopColumns.value = 2
    } else {
      isMobile.value = false
      desktopColumns.value = 3
    }
  }
  // add the listener to resize event
  window.addEventListener('resize', watchResize)
  // remove the listener
  return () => {
    window.removeEventListener('resize', watchResize)
  }
})
</script>
<template>
  <div class="main-title-wrapper">
    <h1 class="main-title">Previous Rulings</h1>
    <!-- DropDown to the right-->
    <div v-if="!isMobile" class="dropdown">
      <button @click="toggleDropdown" class="dropdown-button">
        <div class="dropdown-toggle">
          <div class="dropdown-title-toogle">
            {{ selectedGrid }}
          </div>
          <div class="dropdown-icon-toogle">
            <i class="fas fa-caret-down"></i>
          </div>
        </div>
      </button>

      <div v-if="isOpen" class="dropdown-menu">
        <p @click="handleItemClick('Grid')">Grid</p>
        <p @click="handleItemClick('List')">List</p>
      </div>
    </div>
  </div>
  <!-- Grid Logic-->
  <GridComponent
    v-if="!isMobile && isGrid"
    :votingData="votingData"
    :compareDates="compareDates"
    :checkMostVotesSymbol="checkMostVotesSymbol"
    :togglePositiveButtonActive="togglePositiveButtonActive"
    :toggleNegativeButtonActive="toggleNegativeButtonActive"
    :votesCasted="votesCasted"
    :activePositiveButtonIndex="activePositiveButtonIndex"
    :activeNegativeButtonIndex="activeNegativeButtonIndex"
    :allowToVote="allowToVote"
    :updateVotes="updateVotes"
    :resetVotes="resetVotes"
    :getPercentage="getPercentage"
    :addEllipsis="addEllipsis"
    :desktopColumns="desktopColumns"
  >
  </GridComponent>
  <!-- List Logic-->
  <ListComponent
    v-else-if="!isMobile && !isGrid"
    :votingData="votingData"
    :compareDates="compareDates"
    :checkMostVotesSymbol="checkMostVotesSymbol"
    :togglePositiveButtonActive="togglePositiveButtonActive"
    :toggleNegativeButtonActive="toggleNegativeButtonActive"
    :votesCasted="votesCasted"
    :activePositiveButtonIndex="activePositiveButtonIndex"
    :activeNegativeButtonIndex="activeNegativeButtonIndex"
    :allowToVote="allowToVote"
    :updateVotes="updateVotes"
    :resetVotes="resetVotes"
    :getPercentage="getPercentage"
    :addEllipsis="addEllipsis"
  >
  </ListComponent>
  <!-- Mobile logic-->
  <div v-if="isMobile" class="slider">
    <div class="slides">
      <div
        v-for="(vote, index) in votingData"
        :key="vote.name"
        class="content-wrapper"
      >
        <div class="slides-items">
          <div
            class="content-wrapper__background-top"
            :style="{ backgroundImage: `url(${vote.picture})` }"
          >
            <div class="title-wrapper-top">
              <!-- Vote Titles and Most Votes Symbol-->
              <div
                v-if="
                  checkMostVotesSymbol(vote.votes.positive, vote.votes.negative)
                "
                class="top-items-top"
              >
                <img src="@/assets/img/thumbs-up.svg" alt="thumbs up" />
              </div>
              <div v-else class="top-items-top">
                <img src="@/assets/img/thumbs-down.svg" alt="thumbs down" />
              </div>
              <h2 class="content-wrapper__title-top">
                {{ addEllipsis(vote.name, 22) }}
              </h2>
            </div>
            <!-- Vote Description-->
            <p class="content-wrapper__description">
              {{ addEllipsis(vote.description, 60) }}
            </p>
            <!-- Votes Update-->

            <p v-if="!votesCasted[index]" class="middle-buttons__updated">
              {{ compareDates(vote.lastUpdated) }}{{ vote.category }}
            </p>
            <p v-else class="middle-buttons__updated">
              Thank you for your vote !
            </p>
            <!-- Votes Buttons-->
            <div class="middle-buttons">
              <div v-show="!votesCasted[index]" class="middle-items">
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
              <div v-show="!votesCasted[index]" class="middle-items">
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
              <div v-if="!votesCasted[index]" class="middle-items">
                <button
                  :disabled="allowToVote !== index"
                  class="vote-button"
                  :class="{ disabled: allowToVote !== index }"
                  @click="updateVotes(index)"
                >
                  Vote Now
                </button>
              </div>
              <div
                :style="{
                  paddingLeft: '7em'
                }"
                v-else
                class="middle-items"
              >
                <button class="vote-button" @click="resetVotes(index)">
                  Vote Again
                </button>
              </div>
            </div>
            <!-- Voting Stats-->
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
    </div>
  </div>
</template>

<style scoped>
.main-title-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.dropdown {
  position: relative;
}
.dropdown-toggle {
  background-color: #fff;
  border: 3px solid #000;
  padding: 0.5em;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.dropdown-button {
  margin: 0;
  padding: 0;
  border: 0;
  background: white;
  min-width: 12.5em;
}

.dropdown-title-toogle {
  padding: 0 4em;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  border-left: 3px solid black;
  border-right: 2px solid black;
  border-top: none;
  width: 97%;
  z-index: 10;
}

.dropdown-menu p {
  margin: 0;
  padding: 0;

  padding: 0.5em 1em;
  background-color: white;
  border-bottom: 3px solid black;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  display: flex;
}

.dropdown-menu button:hover {
  background-color: #f8f9fa;
}
.slider {
  height: 32em;
  overflow: hidden;
  width: 100%;
  padding-left: 1em;
}

.slides {
  display: flex;
  width: 100%;
  height: auto;

  overflow-x: auto;
  scroll-snap-type: x mandatory;

  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
}
.slides::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}
.slides::-webkit-scrollbar-thumb {
}
.slides::-webkit-scrollbar-track {
  background: transparent;
}
.slides-items {
  scroll-snap-align: start;
  flex-shrink: 0;
  width: 100%;
  min-width: 25em;
  height: 100%;

  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.content-wrapper {
  padding-left: 1em;
  color: white;
}

.main-title {
  font-weight: 300;
  color: #464646;
}
.content-wrapper__background-top {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
}
.content-wrapper__title-top {
  margin: 0;
  font-size: 2rem;
  font-weight: 400;
  line-height: 1;
  padding-left: 0.4em;

  color: var(--color-white);
}
.title-wrapper-top {
  display: flex;
  padding-top: 8em;
  align-items: baseline;
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

  margin: 1rem 0;
  font-size: 1.25rem;
  font-weight: 400;
  width: 19em;

  padding: 1em;
}

.middle-buttons {
  display: flex;
  width: 85%;
  font-size: 1rem;

  padding-left: 4em;
  height: fit-content;
  align-items: center;
  margin-bottom: 4em;
}

.middle-buttons__updated {
  padding: 0.5em 0 0.5em 9em;
  font-size: 1em;
  color: white;
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
  padding-left: 1em;
  height: 100%;
}

.middle-items img[alt='thumbs up'] {
  padding: 0.6em;
}
.top-items-top img[alt='thumbs up'] {
  padding: 0.6em;
  background-color: rgba(var(--color-green-positive), 0.8);
}

.middle-items img[alt='thumbs down'] {
  padding: 0.6em;
}
.top-items-top img[alt='thumbs down'] {
  padding: 0.6em;
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
  background-color: #1e1e1eaf;
  color: white;
  border: 2px solid white;
  width: 100%;

  font-size: 1.2rem;
  padding: 1em 2em;
  font-weight: 400;
  font: caption;
}

.voting-stats {
  display: flex;
  width: 100%;
  height: 3rem;
  position: absolute;
  bottom: 0;
}

.voting-positive {
  display: flex;
  justify-content: flex-start;
  background-color: rgba(var(--color-green-positive), 0.7);
}

.voting-negative {
  display: flex;
  justify-content: flex-end;

  background-color: rgba(var(--color-yellow-negative), 0.7);
}
</style>
