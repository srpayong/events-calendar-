import 'react-calendar/dist/Calendar.css';
import { isSameDay } from 'date-fns';
import { useRouter } from 'next/navigation';
import React from 'react';
import ReactCalendar from 'react-calendar';
import styles from '../../Styles/calendarPage.module.scss';

export default function Calendar({ events }) {
  const router = useRouter();

  const handleEventClick = (eventId) => {
    router.push(`/Calendar/${eventId}`);
  };

  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const dayEvents = events.filter((event) =>
        isSameDay(new Date(event.dateVenue), date),
      );

      const handleKeyPress = (event, eventId) => {
        if (event.key === 'Enter') {
          handleEventClick(eventId);
        }
      };

      return (
        <div>
          {dayEvents.map((event) => (
            <div
              key={`event-div-${event.id}`}
              className={styles.eventItem}
              onClick={() => handleEventClick(event.id)}
              onKeyDown={(e) => handleKeyPress(e, event.id)}
              role="button"
              tabIndex="0"
            >
              {event.homeTeam?.name || 'Unknown Team'} vs
              <br />
              {event.awayTeam?.name || 'Unknown Team'} - {event.timeVenueUTC}
            </div>
          ))}
        </div>
      );
    }
  };

  return (
    <div className={styles.calendarContainer}>
      <ReactCalendar
        className={styles.reactCalendar}
        tileContent={tileContent}
      />
    </div>
  );
}
