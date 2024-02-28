<script setup lang="ts">
import { ref } from 'vue'

import { useVotingStore } from '@/stores/voting'
import { storeToRefs } from 'pinia'

const { votingData } = storeToRefs(useVotingStore())
</script>
<template>
  <div v-for="vote in votingData" :key="vote.name">
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

    <div class="hero__closing-gauge">
      <div class="closing-gauge__left">
        <span class="closing-gauge__title">closing in</span>
      </div>
      <div class="closing-gauge__right">
        <span class="closing-gauge__number">22</span>
        <span class="closing-gauge__desc">days</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.vote-button {
  background-color: #525252b6;
  color: white;
  border: 5px solid white;
  width: 30%;
  font-size: 1rem;
}
</style>
