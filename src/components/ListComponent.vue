<script setup lang="ts">
import { defineProps } from 'vue'
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
const props = defineProps<{
  votingData: Votes[]
  compareDates: Function
  checkMostVotesSymbol: Function
  togglePositiveButtonActive: Function
  toggleNegativeButtonActive: Function
  activeNegativeButtonIndex: number | any
  activePositiveButtonIndex: number | any
  votesCasted: number[]

  allowToVote: number | any
  updateVotes: Function
  resetVotes: Function
  getPercentage: Function
  addEllipsis: Funtion
}>()
</script>

<template>
  <div class="grid-container">
    <div
      v-for="(vote, index) in votingData"
      :key="vote.name"
      class="content-wrapper"
    >
      <div class="slides-items">
        <div
          class="content-wrapper__background-top"
          :style="{
            backgroundImage: `url(${vote.picture})`,
            backgroundSize: '35%',
            backgroundRepeat: 'no-repeat'
          }"
        >
          <!-- Vote Name and Most Votes Symbol-->
          <div class="title-wrapper-top">
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
          </div>
          <div class="newContent">
            <!-- Name And Updated In one wrapp-->
            <div class="wrapper-name-update">
              <!-- Card Name -->
              <h2 class="content-wrapper__title-top">
                {{ addEllipsis(vote.name, 22) }}
              </h2>
              <!-- Card Update and Category-->
              <p v-if="!votesCasted[index]" class="middle-buttons__updated">
                {{ compareDates(vote.lastUpdated) }}{{ vote.category }}
              </p>
              <p v-else class="middle-buttons__updated">
                Thank you for your vote !
              </p>
            </div>
            <!-- Description and middle buttons In one wrapp-->
            <div class="wrapper-description-middlebutton">
              <!-- Card Description-->
              <p class="content-wrapper__description">
                {{ addEllipsis(vote.description, 50) }}
              </p>
              <!-- Card Middle Buttons-->
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
</template>

<style scoped>
.grid-container {
  display: grid;
  grid-template-columns: (1, 1fr);

  margin-top: 1.5em;
  z-index: 2;
}
.wrapper-name-update {
  display: flex;
  justify-content: space-between;
  /* align-items: center; */
  width: 90%;
  position: relative;
  z-index: 1;
  padding: 0.5em 0;
}
.newContent::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 33%;
  height: 100%;
  background: rgb(227, 220, 214);
  background: linear-gradient(
    90deg,
    rgb(227 220 214 / 0%) 0%,
    rgb(110 110 110 / 31%) 40%,
    rgba(133, 133, 133, 1) 86%
  );
}
.newContent {
  margin-left: 30%;
  width: 70%;

  height: 100%;
  background: rgb(227, 220, 214);
  background: linear-gradient(
    90deg,
    rgba(227, 220, 214, 1) 0%,
    rgba(133, 133, 133, 1) 2%,
    rgba(133, 133, 133, 1) 50%,
    rgba(133, 133, 133, 1) 85%
  );
}

.wrapper-description-middlebutton {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 94%;

  margin-bottom: 4em;
  position: relative;
  z-index: 1;
}

.slides-items {
  width: 100%;

  height: 100%;

  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.content-wrapper {
  color: white;
  margin-bottom: 1em;
}

.main-title {
  font-weight: 300;
  color: #464646;
}
.content-wrapper__background-top {
  width: 100%;
  height: 100%;
}

.content-wrapper__title-top {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 400;
  line-height: 1;

  color: var(--color-white);
}

.title-wrapper-top {
  position: absolute;
  top: 0;
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

  padding-left: 1em;
  height: fit-content;
  align-items: center;
}
.middle-buttons__updated {
  margin: 0;
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
  margin-top: 1em;
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
