<template>
  <div id="app">
    <router-view />
    <tool-bar/>
  </div>
</template>
<script>
import ToolBar from './components/ToolBar.vue'
export default {
  name: 'app',
  components: {ToolBar}
}
</script>
<style>
</style>
