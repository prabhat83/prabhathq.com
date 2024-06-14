import moment from 'moment';
import { v4 as UUID } from 'uuid';
import axios, { AxiosError, isCancel } from 'axios';
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { Event } from '../calendar/types';

export interface MoonPhase {
  Date: string;
  Phase: string;
}

export interface EventState {
  events: Event[];
}

const initialState: EventState = {
  events: [],
};

const moonPhaseSlice = createSlice({
  name: "moonPhase",
  initialState,
  reducers: {
    add: (state, action) => {
      state.events.push(action.payload as Event);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMoonPhasesEventsByYear.fulfilled, (state, action) => {
      state.events = [...state.events, ...action.payload || []];
    });
  }
});

export const fetchMoonPhasesEventsByYear = createAsyncThunk(
  'fetchMoonPhasesEvents',
  async (year: number) => {
    try {
      const response = await axios.get<MoonPhase[]>(`https://craigchamberlain.github.io/moon-data/api/moon-phase-data/${year}`);
      const moonPhases = response.data.map(phase => {
        const moonPhase: Event = {
          id: UUID(),
          startDate: moment.utc(phase.Date).unix(),
          endDate: moment.utc(phase.Date).add(1, 'day').unix(), // TODO: Fix end date
          title: 'Moon phase',
          description: `Moon phase: ${phase.Phase}`,
          thirdParty: true,
          type: 'moonPhase',
        }
        return moonPhase;
      });
      return moonPhases;
    } catch (error) {
      if (isCancel(error)) {
        console.log('Request canceled', error.message);
      } else {
        const axiosError = error as AxiosError;
        console.log('Error:', axiosError.response?.data);
      }
    }
  }
);

export const { add } = moonPhaseSlice.actions;
export default moonPhaseSlice.reducer;