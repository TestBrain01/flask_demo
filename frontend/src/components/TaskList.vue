// frontend/src/components/TaskList.vue
<template>
  <div>
    <h1>任务列表</h1>
    <ul>
      <li v-for="task in tasks" :key="task.id">{{ task.title }}</li>
    </ul>
    <button @click="fetchTasks">刷新</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tasks: []
    }
  },
  methods: {
    async fetchTasks() {
      try {
        const response = await fetch('/api/tasks');  // 通过代理访问后端
        this.tasks = await response.json();
      } catch (error) {
        console.error('获取任务失败:', error);
      }
    }
  },
  mounted() {
    this.fetchTasks();
  }
}
</script>