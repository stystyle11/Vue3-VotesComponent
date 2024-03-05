<script setup lang="ts">
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
  desktopColumns: number
}>()
</script>

<template>
  <div
    class="grid-container"
    :style="{
      gridTemplateColumns: `repeat(${desktopColumns}, 1fr)`,
      maxWidth: desktopColumns > 2 ? '1100px' : 'initial',
      gridColumnGap: desktopColumns > 2 ? '10px' : '.9em'
    }"
  >
    <div
      v-for="(vote, index) in votingData"
      :key="vote.name"
      class="content-wrapper"
      :style="{
        maxWidth: desktopColumns > 2 ? '360px' : 'inherit'
      }"
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
              {{ addEllipsis(vote.name, 18) }}
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
                paddingLeft: '7.5em'
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
</template>

<style scoped>
.grid-container {
  display: grid;

  gap: 0.9em;
  margin-top: 1.5em;
}
.main-title-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.slides-items {
  width: 98%;

  height: 100%;

  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.content-wrapper {
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
  font-size: 1.5rem;
  font-weight: 400;
  padding-left: 0.3em;
  line-height: 1;

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
  margin: 0;
  font-size: 1rem;
  font-weight: 400;
  width: 80%;
  padding: 1em;
}

.middle-buttons {
  display: flex;
  width: fit-content;
  font-size: 1rem;

  padding-left: 3em;
  height: fit-content;
  align-items: center;

  margin-bottom: 4em;
}
.middle-buttons__updated {
  padding: 0.5em 0 0.5em 4em;
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
  padding: 1em;
}
.top-items-top img[alt='thumbs up'] {
  padding: 1em;
  background-color: rgba(var(--color-green-positive), 0.8);
}

.middle-items img[alt='thumbs down'] {
  padding: 1em;
}
.top-items-top img[alt='thumbs down'] {
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
  bottom: 0;
  position: absolute;
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
