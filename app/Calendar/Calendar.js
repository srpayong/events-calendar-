import 'react-calendar/dist/Calendar.css';
import { useRouter } from 'next/navigation';
import React from 'react';
import ReactCalendar from 'react-calendar';
import styles from './page.module.css';

export default function Calendar({ events }) {
  const router = useRouter();

  const handleEventClick = (eventId) => {
    router.push(`/Calendar/${eventId}`);
  };

  // Function to determine what is shown on each calendar tile
  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const dayEvents = events.filter(
        (event) =>
          new Date(event.dateVenue).toDateString() === date.toDateString(),
      );
      return (
        <div>
          {dayEvents.map((event) => (
            <div key={`event-div-${event.id}`}>
              <button
                className={styles.eventItem}
                onClick={() => handleEventClick(event.id)}
              >
                <div>
                  {event.homeTeam?.name || 'Unknown Team'} vs
                  {event.awayTeam?.name || 'Unknown Team'} -{event.timeVenueUTC}
                </div>
              </button>
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
