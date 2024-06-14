import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Event } from '../calendar/types';

export interface Action {
  type: string;
  data: Event | Event[] | Date | string;
}

export interface CalenderState {
  events: Event[];
  filterDate: Date;
  selectedEvent?: string;
}

const initialState: CalenderState = {
  events: [],
  filterDate: new Date(),
};

const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    add: (state, action) => {
      state.events.push(action.payload as Event);
    },
    remove: (state, action) => {
      state.events = state.events.filter((event) => event.id !== action.payload);
    },
    edit: (state, action) => {
      const index = state.events.findIndex((event) => event.id === action.payload.id);
      state.events[index] = action.payload;
    },
    select: (state, action) => {
      state.filterDate = action.payload;
    }
  },
});

export const { add, remove, edit, select } = calendarSlice.actions;
export default calendarSlice.reducer;
