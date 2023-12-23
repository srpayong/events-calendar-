'use client';

import React, { useEffect, useState } from 'react';
import AddEvent from './addEvent/page.js';
import Calendar from './Calendar/Calendar.js';
import EventFilter from './components/EventFilter';
import NavBar from './components/NavBar';
import styles from './page.module.scss';

export default function Home() {
  const [allEvents, setAllEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);

  useEffect(() => {
    fetch('/sportData.json')
      .then((res) => res.json())
      .then((data) => {
        setAllEvents(data.data);
        setFilteredEvents(data.data);
      });
  }, []);

  const handleAddEvent = (newEvent) => {
    const updatedEvents = [...allEvents, newEvent];
    setAllEvents(updatedEvents);
    setFilteredEvents(updatedEvents);
  };

  return (
    <div>
      <div className={styles.navBar}>
        <NavBar />
      </div>
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
          <Calendar key={filteredEvents.length} events={filteredEvents} />
        </div>
      </div>
    </div>
  );
}
