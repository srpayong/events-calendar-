'use client';

import React, { useEffect, useState } from 'react';
import AddEvent from './addEvent/page.js';
import Calendar from './Calendar/Calendar.js';
import EventFilter from './components/EventFilter';
import NavBar from './components/NavBar';

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

  useEffect(() => {
    console.log('Filtered Events after update: ', filteredEvents);
  }, [filteredEvents]);

  const handleAddEvent = (newEvent) => {
    const updatedEvents = [...allEvents, newEvent];
    setAllEvents(updatedEvents);
    setFilteredEvents(updatedEvents);
  };

  return (
    <div>
      <NavBar />
      <h1>Sports Events Calendar</h1>
      <EventFilter
        setFilteredEvents={setFilteredEvents}
        allEvents={allEvents}
      />
      <Calendar key={filteredEvents.length} events={filteredEvents} />
      <AddEvent onAddEvent={handleAddEvent} />
    </div>
  );
}
