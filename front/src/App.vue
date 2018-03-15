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
* {
  font-family: 'Open Sans', sans-serif;
}
/* signup - sexRadio group - margin-right setting */
.custom-control-label{
  margin-right:15px
}
</style>
