import moment from 'moment';
import DatePicker from 'react-datepicker';

import { Event as EventType } from './types';
import { CalenderState, remove, select } from '../slices/calendar';
import { EventState, fetchMoonPhasesEventsByYear } from '../slices/moonphases';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { useEffect } from 'react';

interface EventProps {
  event: EventType;
  onDelete: (id: string) => void;
  onSelect: (id: string) => void;
}

export default function EventList() {

  const dispatch = useAppDispatch();
  const { events: moonphases } = useAppSelector<any,EventState>((state: any) => state.moonphases);
  const { filterDate, events } = useAppSelector<any,CalenderState>((state: any) => state.calendar);

  function onDeleteEvent(id: string) {
    dispatch(remove(id));
  }

  function onSelectEvent(id: string) {
    dispatch(select(id));
  }

  const year = moment(filterDate).year();
  useEffect(() => {
    dispatch(fetchMoonPhasesEventsByYear(year));
  }, [year]);

  const allEvents = [...events, ...moonphases];

  const filteredEvents = allEvents?.filter(event => {
    // TODO: fix date filter
    // filterDate is complete date so 
    // filterDateMoment.isSame(startDateMoment, 'day') and
    // filterDateMoment.isSame(endDateMoment, 'day') are required below
    const filterDateMoment = moment(filterDate);
    const startDateMoment = moment.unix(event.startDate);
    const endDateMoment = moment.unix(event.endDate);
    return filterDateMoment.isSame(startDateMoment, 'day')
      || filterDateMoment.isBetween(startDateMoment, endDateMoment)
      || filterDateMoment.isSame(endDateMoment, 'day');
  }) || [];

  const sortedEvents = filteredEvents.sort((a, b) => a.startDate - b.startDate);

  return (
    <div className='events'>
      <h2>Events</h2>
      <div className='events__filter'>
        <DatePicker
          placeholderText='Filter by date'
          selected={filterDate}
          onChange={(date) => {
            date && dispatch(select(date));
          }}
          dateFormat={'MMMM d, yyyy'}
        />
      </div>
      <div className='events__count'>
        {sortedEvents.length} events
      </div>
      <ul className='events__list'>
        {sortedEvents.map(event => (
          <li key={event.id}>
            <Event
              event={event}
              onDelete={onDeleteEvent}
              onSelect={onSelectEvent}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

function Event({ event, onDelete, onSelect }: EventProps) {
  const eventContent = <div className='event'>
    {`${moment.unix(event.startDate).format('LT')}-${moment.unix(event.endDate).format('LT')}`}
    <div className='event__title'>{event.title}</div>
    <div className='event__desc'>{event.description}</div>
  </div>;

  return (
    <div>
      {eventContent}

      {!event.thirdParty && <>
        <button onClick={() => onSelect(event.id)} className='events__btn-edit'>
          Edit
        </button>
        <button onClick={() => onDelete(event.id)} className='events__btn-del'>
          Delete
        </button>
      </>}
    </div>
  );
}
