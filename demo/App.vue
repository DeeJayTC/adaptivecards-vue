<template>
  <div>
    <div class="demo">
      <div class="container">
        <h1>
          Adaptive Cards in Vue.js
          <a
            style="color: #000;text-transform: uppercase;font-size: 14px;font-weight: 400;"
            href="https://github.com/deejaytc/adaptivecards-vue"
          >
            Github
          </a>
        </h1>
        <p>Adaptive Cards in Vue.js</p>
        <button @click="update">
          Add 1
        </button>
        <hr style="margin: 50px 0px;border: 1px solid #e3e3e3;">
      </div>
      {{ data.title }}
      <adaptive-cards
        :card="card"
        :data="data"
        :use-templating="true"
        :host-config="config"
        @onActionClicked="onItemClick"
      />
    </div>
  </div>
</template>

<script>
import SampleCard from '../src/assets/exampleCard.json'
import SampleData from '../src/assets/exampleData.json'
import HostConfig from '../src/assets/exampleHostConfig2.json'
export default {
  name: 'App',
  data () {
    return {
      data: SampleData,
      card: SampleCard,
      config: HostConfig,
      cardUrl: 'https://templates.adaptivecards.io/teamwork.com/projects/task.json'
    }
  },
  methods: {
    onItemClick (event, item) {
      alert(event)
      alert(item)
    },
    update () {
      console.log('triggered!')
      this.data.title = 'Data Was changed!'
    }
  }
}
</script>

<style lang="css">

body,
html {
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Source Sans Pro', sans-serif;
  font-size: 18px;
  background-color: #f2f4f7;
  color: #262626;
}

#demo {
  padding-left: 350px;
}
#demo.collapsed {
  padding-left: 50px;
}

.demo {
  padding: 50px;
}

.container {
  max-width: 900px;
}

pre {
  font-family: Consolas, monospace;
  color: #000;
  background: #fff;
  border-radius: 2px;
  padding: 15px;
  line-height: 1.5;
  overflow: auto;
}
</style>
