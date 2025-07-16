import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    tasks: []
  },
  mutations: {
    SET_TASKS(state, tasks) {
      state.tasks = tasks
    },
    ADD_TASK(state, task) {
      state.tasks.push(task)
    },
    UPDATE_TASK(state, updatedTask) {
      const index = state.tasks.findIndex(task => task.id === updatedTask.id)
      if (index !== -1) {
        state.tasks.splice(index, 1, updatedTask)
      }
    },
    DELETE_TASK(state, taskId) {
      state.tasks = state.tasks.filter(task => task.id !== taskId)
    }
  },
  actions: {
    async fetchTasks({ commit }) {
      try {
        const response = await axios.get('http://localhost:5000/api/tasks')
        commit('SET_TASKS', response.data)
      } catch (error) {
        console.error('Error fetching tasks:', error)
      }
    },
    async addTask({ commit }, task) {
      try {
        const response = await axios.post('http://localhost:5000/api/tasks', task)
        commit('ADD_TASK', response.data)
        return response.data
      } catch (error) {
        console.error('Error adding task:', error)
        throw error
      }
    },
    async updateTask({ commit }, task) {
      try {
        const response = await axios.put(`http://localhost:5000/api/tasks/${task.id}`, task)
        commit('UPDATE_TASK', response.data)
        return response.data
      } catch (error) {
        console.error('Error updating task:', error)
        throw error
      }
    },
    async deleteTask({ commit }, taskId) {
      try {
        await axios.delete(`http://localhost:5000/api/tasks/${taskId}`)
        commit('DELETE_TASK', taskId)
      } catch (error) {
        console.error('Error deleting task:', error)
        throw error
      }
    }
  },
  modules: {
  }
})