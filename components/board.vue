<template>
  <div class="content">
    <div v-for="(row, rowIndex) in boardState" :key="`row-${rowIndex}`" class="flex-container">
      <div
        v-for="(col, colIndex) in row"
        :key="`row-${rowIndex}-col-${colIndex}`"
        class="flex-item"
        @click="onClick(rowIndex, colIndex)"
      >
        {{ col }}
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  name: 'Board',
  data() {
    return {
      currPlayer: 'X',
      // eslint-disable-next-line prettier/prettier
      boardState: [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
      ]
    }
  },
  methods: {
    onClick(rowIndex, colIndex) {
      const self = this
      Vue.set(self.boardState[rowIndex], colIndex, this.currPlayer)

      if (self.currPlayer === 'X') {
        self.currPlayer = '0'
      } else {
        self.currPlayer = 'X'
      }
    }
  }
}
</script>

<style scoped>
.content {
  width: 15.45em;
  margin: 0 auto;
}
.flex-container {
  padding: 0;
  margin: 0;
  list-style: none;
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-flex-flow: row;
  justify-content: space-around;
  line-height: 30px;
}
.flex-item {
  background: #41b883;
  margin: 1px;
  color: white;
  font-weight: bold;
  font-size: 1.5em;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1 0 0;
  min-width: 1.5em;
  cursor: pointer;
}
.flex-item:before {
  content: '';
  display: block;
  padding-top: 100%;
  float: left;
}
.flex-item:hover {
  background: #3b8070;
}
.flex-item:active {
  background: #35495e;
}
</style>
