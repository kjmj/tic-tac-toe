import { mount } from '@vue/test-utils'
import Index from '@/pages/index.vue'

describe('Index', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(Index)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  test('has the correct title', () => {
    const wrapper = mount(Index)
    expect(wrapper.html()).toContain('<h1 class="title">tic tac toe</h1>')
  })

  test('renders the board component', () => {
    const wrapper = mount(Index)
    expect(wrapper.find({ name: 'Board' }).exists()).toBe(true)
  })
})
