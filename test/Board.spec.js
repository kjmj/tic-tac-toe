import { shallowMount } from '@vue/test-utils'
import Board from '@/components/Board.vue'

const board = (values = {}) => {
  return shallowMount(Board, {
    data() {
      return {
        ...values
      }
    }
  })
}

// starting conditions
describe('Board', () => {
  test('starts current player as X', () => {
    const wrapper = board()
    expect(wrapper.vm.currPlayer).toEqual('X')
  })

  test('starts with 0 moves', () => {
    const wrapper = board()
    expect(wrapper.vm.numMoves).toEqual(0)
  })

  test('requires 3 moves to win', () => {
    const wrapper = board()
    expect(wrapper.vm.numToWin).toEqual(3)
  })

  test('has no winner on start', () => {
    const wrapper = board()
    expect(wrapper.vm.winner).toEqual('')
  })

  test('has a 3x3 board filled with blanks', () => {
    const wrapper = board()
    const emptyBoard = [['', '', ''], ['', '', ''], ['', '', '']]
    expect(wrapper.vm.boardState).toEqual(emptyBoard)
  })
})
