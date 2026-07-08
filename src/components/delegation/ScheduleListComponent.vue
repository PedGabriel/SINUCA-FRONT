<script setup>
import { onMounted } from "vue";
import { useScheduleStore } from "@/stores/scheduleStore";

const scheduleStore = useScheduleStore();

onMounted(() => {
  scheduleStore.getSchedules();
});

const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");

  return `${day}/${month}`;
};

</script>

<template>
  <section>
    <div class="header-section">
      <h4 style="font-weight: bolder; font-size: 1.2rem">Cronograma</h4>
    </div>
    <ul>
      <li v-for="s in scheduleStore.schedules" :key="s.id" class="schedule-item">
        <div class="header-schedule">

          <span style="color: #969696;" v-if="s.category == '1'" class="mdi mdi-instagram">
            Postagem
          </span>

          <span style="color: #969696;" v-else-if="s.category == '2'" class="mdi mdi-forum-outline">
            Debate
          </span>

          <span style="color: #969696;" v-else-if="s.category == '3'" class="mdi mdi-handshake-outline">
            Mesa de cooperação
          </span>

          <p style="font-weight: 500">
            <span class="mdi mdi-calendar-blank" style="font-size: 1.05rem"></span>
            {{ formatDate(s.endDate) }}
          </p>
        </div>
        <h3>
          {{ s.title }}
        </h3>
        <p style="font-size: 0.7rem; color: #969696">Clique para ver mais detalhes.</p>
      </li>
    </ul>
  </section>
</template>

<style scoped>
ul {
  gap: 1rem;
}

.schedule-item {
  margin-top: 1rem;
  padding: 1.2rem 1.8rem;
  background-color: #fff;
  border-radius: 0.8rem;
}

.header-schedule {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.2rem;
}

h3 {
    font-size: 1.1rem; 
    font-weight: 500;
    margin-bottom: 0.5rem;
}



</style>
