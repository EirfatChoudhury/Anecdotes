import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        changeNotification(state, action) {
            return action.payload
        },
        hideNotification(state, action) {
            return ''
        }
    }
})

export const setNotification = content => {
    return async dispatch => {
      dispatch(changeNotification(content))
      setTimeout(() => {dispatch(hideNotification())}, 5000)
    }
}

export const { changeNotification, hideNotification } = notificationSlice.actions
export default notificationSlice.reducer