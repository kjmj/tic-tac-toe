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
      winner: '',
      numToWin: 3,
      // eslint-disable-next-line prettier/prettier
      boardState: [
        [this.$EMPTY, this.$EMPTY, this.$EMPTY],
        [this.$EMPTY, this.$EMPTY, this.$EMPTY],
        [this.$EMPTY, this.$EMPTY, this.$EMPTY]
      ]
    }
  },
  computed: {
    numRows() {
      return this.boardState.length
    },
    numCols() {
      return this.boardState[0].length
    }
  },
  methods: {
    playerMove(rowIndex, colIndex) {
      const self = this

      // mark the move
      Vue.set(self.boardState[rowIndex], colIndex, self.currPlayer)

      // check for winner
      if (self.checkWinner(rowIndex, colIndex)) {
        self.winner = self.currPlayer
        alert(self.winner + ' got 3 in a row')
      }

      // switch player
      if (self.currPlayer === self.$X) {
        self.currPlayer = self.$0
      } else {
        self.currPlayer = self.$X
      }
    },
    // true if there is a winner on this turn, false otherwise
    checkWinner(rowIndex, colIndex) {
      const self = this
      const numToWin = self.numToWin
      const currPlayer = self.currPlayer
      const count = { col: 1, row: 1, diag: 1, rdiag: 1 }
      // check if there is a win in all directions
      for (let i = 1; i < numToWin; i++) {
        const currRow = self.boardState[rowIndex]
        const rowAbove = self.boardState[rowIndex - i]
        const rowBelow = self.boardState[rowIndex + i]

        // check right, left
        if (currRow[colIndex + i] === currPlayer || currRow[colIndex - i] === currPlayer) {
          count.row++
        }
        // check top, top left, top right
        if (rowAbove !== undefined) {
          if (rowAbove[colIndex] === currPlayer) count.col++
          if (rowAbove[colIndex - i] === currPlayer) count.diag++
          if (rowAbove[colIndex + i] === currPlayer) count.rdiag++
        }
        // check bottom, bottom left, bottom right
        if (rowBelow !== undefined) {
          if (rowBelow[colIndex] === currPlayer) count.col++
          if (rowBelow[colIndex - i] === currPlayer) count.rdiag++
          if (rowBelow[colIndex + i] === currPlayer) count.diag++
        }

        // there was a winner
        if (count.col === numToWin || count.row === numToWin || count.diag === numToWin || count.rdiag === numToWin) {
          return true
        }
      }
      return false
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
