export const user = {
  state: {
    name: ''
  }, // initial state
  reducers: {
    showName(state, payload) {
      console.log(11, state, payload)
      return {
        name: payload.name
      }
    }
  },
  effects: {
    async showNameAsync(payload, rootState) {
      console.log(22, payload, rootState)
      await new Promise(resolve => setTimeout(resolve, 1000))
      this.showName(payload)
    }
  }
}