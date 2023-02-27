import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
      applyThisFilter(state, action) {
        return action.payload
      }
    }
})

export const { applyThisFilter } = filterSlice.actions
export default filterSlice.reducer