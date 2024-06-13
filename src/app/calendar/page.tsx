"use client"
import AddEvent from './AddEvent';
import EventList from './EventList';
import { QueryClient, QueryClientProvider } from 'react-query'

import './Calendar.css';

const queryClient = new QueryClient()

export default function CalendarApp() {
  return (
    <QueryClientProvider client={queryClient}>
      <AddEvent />
      <EventList />
    </QueryClientProvider>
  );
}
