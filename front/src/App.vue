<template>
<v-app>
  <div id="app">
    <router-view />
    <tool-bar/>
  </div>
</v-app>
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
#dataTable > tbody > tr:hover{
  background-color:silver;
}
#dataTable > thead > tr:hover {
  background-color: sienna;
}
</style>
