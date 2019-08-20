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
    // eslint-disable-next-line prettier/prettier
    const emptyBoard = [
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ]
    expect(wrapper.vm.boardState).toEqual(emptyBoard)
  })
})

// checkWinner()
describe('Board', () => {
  test('says there is no winner on empty board', () => {
    // eslint-disable-next-line prettier/prettier
    const b = [
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ]
    const wrapper = board({ boardState: b, numToWin: 3 })
    expect(wrapper.vm.checkWinner(0, 0)).toBeFalsy()
  })

  test('says X wins', () => {
    // eslint-disable-next-line prettier/prettier
    const b = [
      ['X', 'X', 'X'],
      ['', '0', '0'],
      ['', '', '']
    ]    
    const wrapper = board({ boardState: b, numToWin: 3 })
    expect(wrapper.vm.checkWinner(0, 0)).toBeTruthy()
  })

  test('says there is no winner when board is full', () => {
    // eslint-disable-next-line prettier/prettier
    const b = [
      ['X', '0', 'X'],
      ['0', 'X', 'X'],
      ['0', 'X', '0']
    ]    
    const wrapper = board({ boardState: b, numToWin: 3 })
    expect(wrapper.vm.checkWinner(0, 0)).toBeFalsy()
  })

  test('winner on 1x1 edge case board', () => {
    const b = [['X']]
    const wrapper = board({ boardState: b, numToWin: 1 })
    expect(wrapper.vm.checkWinner(0, 0)).toBeTruthy()
  })

  test('no winner on empty 1x1 edge case board', () => {
    const b = [['']]
    const wrapper = board({ boardState: b, numToWin: 1 })
    expect(wrapper.vm.checkWinner(0, 0)).toBeFalsy()
  })
})
