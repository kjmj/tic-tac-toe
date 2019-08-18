<template>
  <div class="content">
    <div v-for="(row, rowIndex) in boardState" :key="`row-${rowIndex}`" class="flex-container">
      <div
        v-for="(col, colIndex) in row"
        :key="`row-${rowIndex}-col-${colIndex}`"
        :class="{ disabled: boardState[rowIndex][colIndex] !== $EMPTY }"
        class="flex-item"
        @click="playerMove(rowIndex, colIndex)"
      >
        {{ col }}
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
Vue.prototype.$EMPTY = ''
Vue.prototype.$X = 'X'
Vue.prototype.$0 = '0'

export default {
  name: 'Board',
  data() {
    return {
      currPlayer: this.$X,
      // eslint-disable-next-line prettier/prettier
      boardState: [
        [this.$EMPTY, this.$EMPTY, this.$EMPTY],
        [this.$EMPTY, this.$EMPTY, this.$EMPTY],
        [this.$EMPTY, this.$EMPTY, this.$EMPTY]
      ]
    }
  },
  methods: {
    playerMove(rowIndex, colIndex) {
      const self = this
      if (self.boardState[rowIndex][colIndex] !== self.$EMPTY) {
        return
      }
      Vue.set(self.boardState[rowIndex], colIndex, self.currPlayer)
      if (self.currPlayer === self.$X) {
        self.currPlayer = self.$0
      } else {
        self.currPlayer = self.$X
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
  flex-flow: row;
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
.disabled {
  pointer-events: none;
}
.flex-item:before {
  content: '';
  display: block;
  padding-top: 100%;
  float: left;
}
@media (hover: hover) {
  .flex-item:hover {
    background: #3b8070;
  }
}
.flex-item:active {
  background: #35495e;
}
</style>
