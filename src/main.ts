import './assets/css/main.css'
import '@fortawesome/fontawesome-free/css/all.css'
import { createApp, watch } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { useVotingStore } from './stores/voting'
const app = createApp(App)

app.use(createPinia())
app.use(router)
const votingStore = useVotingStore()

// start the store from local storage
const votesData = localStorage.getItem('votingStore')
if (votesData) {
  votingStore.$state = JSON.parse(votesData)
}
// This will always save to localStorage the changes
watch(
  () => votingStore.$state,
  (newState) => {
    localStorage.setItem('votingStore', JSON.stringify(newState))
  },
  { deep: true }
)
app.mount('#app')
