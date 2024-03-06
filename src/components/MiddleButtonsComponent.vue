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

  togglePositiveButtonActive: Function
  toggleNegativeButtonActive: Function
  activeNegativeButtonIndex: number | any
  activePositiveButtonIndex: number | any
  votesCasted: number[]
  allowToVote: number | any
  updateVotes: Function
  resetVotes: Function
}>()
</script>
<template>
  <div
    v-for="(vote, index) in votingData"
    :key="vote.name"
    class="middle-buttons"
  >
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
      <button class="vote-button" @click="resetVotes(index)">Vote Again</button>
    </div>
  </div>
</template>

<style scoped></style>
