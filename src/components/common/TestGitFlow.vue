<template>
  <div class="test-gitflow">
    <h2>GitFlow 测试组件</h2>
    <p>这是一个用于测试 GitFlow 工作流程的组件</p>
    <div class="info">
      <p>当前环境: {{ environment }}</p>
      <p>版本: {{ version }}</p>
      <p>创建时间: {{ createdAt }}</p>
    </div>
    <button @click="handleTest" class="test-button">
      测试按钮
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// Props 定义
interface Props {
  version?: string
}

const props = withDefaults(defineProps<Props>(), {
  version: '1.0.0'
})

// Emits 定义
const emit = defineEmits<{
  test: [value: string]
}>()

// 响应式数据
const createdAt = ref(new Date().toLocaleString())

// 计算属性
const environment = computed(() => {
  return import.meta.env.MODE || 'development'
})

// 方法
const handleTest = () => {
  const testValue = `GitFlow test at ${new Date().toISOString()}`
  emit('test', testValue)
  console.log('GitFlow 测试执行:', testValue)
}
</script>

<style scoped>
.test-gitflow {
  padding: 20px;
  border: 2px solid #42b883;
  border-radius: 8px;
  background-color: #f9f9f9;
  margin: 16px 0;
}

.test-gitflow h2 {
  color: #42b883;
  margin-bottom: 16px;
}

.info {
  background-color: #e8f5e8;
  padding: 12px;
  border-radius: 4px;
  margin: 16px 0;
}

.info p {
  margin: 4px 0;
  font-family: monospace;
}

.test-button {
  background-color: #42b883;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

.test-button:hover {
  background-color: #369870;
}

.test-button:active {
  background-color: #2d7a5f;
}
</style>
