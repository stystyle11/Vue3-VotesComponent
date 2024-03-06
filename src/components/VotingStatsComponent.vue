<script setup lang="ts">
interface Votes {
  votes: {
    positive: number
    negative: number
  }
}
const props = defineProps<{
  votes: any

  getPercentage: Function
}>()
</script>
<template>
  <!-- Voting Stats-->
  <div class="voting-stats">
    <div
      class="voting-positive"
      :style="{
        width:
          getPercentage(votes.negative, votes.positive, votes.positive) + '%'
      }"
    >
      <div class="flex-votes">
        <div class="flex-positive">
          <img src="@/assets/img/thumbs-up.svg" alt="thumbs up" />
        </div>
        <div class="flex-positive">
          {{
            getPercentage(votes.negative, votes.positive, votes.positive) + '%'
          }}
        </div>
      </div>
    </div>

    <div
      class="voting-negative"
      :style="{
        width:
          getPercentage(votes.negative, votes.positive, votes.negative) + '%'
      }"
    >
      <div class="flex-votes">
        <div class="flex-negative">
          {{
            getPercentage(votes.negative, votes.positive, votes.negative) + '%'
          }}
        </div>

        <div class="flex-negative">
          <img src="@/assets/img/thumbs-down.svg" alt="thumbs down" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
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
</style>
