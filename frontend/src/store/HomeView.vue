<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">任务管理</h1>

    <div class="mb-4">
      <input
        v-model="newTask.title"
        type="text"
        placeholder="添加新任务"
        class="px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-auto"
      >
      <button
        @click="addTask"
        class="px-4 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 transition-colors"
      >
        添加
      </button>
    </div>

    <ul class="space-y-2">
      <li v-for="task in tasks" :key="task.id" class="p-3 border border-gray-200 rounded-lg flex items-center justify-between">
        <div class="flex items-center">
          <input
            type="checkbox"
            :checked="task.completed"
            @change="toggleTask(task)"
            class="mr-3 h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-300 rounded"
          >
          <span :class="{ 'line-through text-gray-500': task.completed }">{{ task.title }}</span>
        </div>
        <button
          @click="deleteTask(task.id)"
          class="text-red-500 hover:text-red-700 transition-colors"
        >
          <i class="fa fa-trash"></i>
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  data() {
    return {
      tasks: [],
      newTask: {
        id: null,
        title: '',
        completed: false
      }
    }
  },
  methods: {
    async fetchTasks() {
      await this.$store.dispatch('fetchTasks')
      this.tasks = this.$store.state.tasks
    },
    async addTask() {
      if (!this.newTask.title.trim()) return

      // 生成唯一ID
      const maxId = this.tasks.length > 0 ? Math.max(...this.tasks.map(t => t.id)) : 0
      const newTask = {
        ...this.newTask,
        id: maxId + 1
      }

      try {
        await this.$store.dispatch('addTask', newTask)
        this.newTask.title = ''
      } catch (error) {
        alert('添加任务失败')
      }
    },
    async toggleTask(task) {
      const updatedTask = {
        ...task,
        completed: !task.completed
      }
      await this.$store.dispatch('updateTask', updatedTask)
    },
    async deleteTask(taskId) {
      if (confirm('确定要删除这个任务吗？')) {
        await this.$store.dispatch('deleteTask', taskId)
      }
    }
  },
  mounted() {
    this.fetchTasks()
  }
}
</script>