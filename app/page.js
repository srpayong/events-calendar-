'use client';

import React, { useEffect, useState } from 'react';
import Calendar from './Calendar/Calendar.js';
import AddEvent from './Components/addEvent.js';
import EventFilter from './Components/EventFilter.js';
import styles from './page.module.scss';

export default function Home() {
  const [allEvents, setAllEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);

  useEffect(() => {
    fetch('/sportData.json')
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch: ${res.status}`);
        }
        return res.json();
      })
      .then((sportsData) => {
        setAllEvents(sportsData.data);
        setFilteredEvents(sportsData.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleAddEvent = (newEvent) => {
    const updatedEvents = [...allEvents, newEvent];
    setAllEvents(updatedEvents);
    setFilteredEvents(updatedEvents);
  };

  return (
    <div>
      <div className={styles.titleContainer}>
        <h1 className={styles.h1}>MATCH SCHEDULES</h1>
      </div>
      <div className={styles.mainContainer}>
        <div>
          <EventFilter
            setFilteredEvents={setFilteredEvents}
            allEvents={allEvents}
          />
          <div className={styles.eventForm}>
            <AddEvent onAddEvent={handleAddEvent} />
          </div>
        </div>
        <div className={styles.Calendar}>
          <Calendar
            key={`filteredEvents-${filteredEvents.length}`}
            events={filteredEvents}
          />
        </div>
      </div>
    </div>
  );
}
