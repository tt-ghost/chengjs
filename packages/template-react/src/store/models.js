import { get } from '../helper'

export const user = {
  state: {
    user: {}
  }, // initial state
  reducers: {
    updateUser (state, payload) {
      return {
        user: payload.user
      }
    }
  },
  effects: {
    async getUser(payload, rootState) {
      try {
        const user = await get('/api/user').catch(e => {
          console.log('ee', e)
        })
      } catch (e) {
        console.log('error: ', e)
      }

      this.updateUser({ user })
    }
  }
}