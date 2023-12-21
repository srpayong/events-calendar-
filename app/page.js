'use client';
import Link from 'next/link';
// app/page.js// app/page.js or pages/index.js (depending on where your Home component is located)
import React, { useEffect, useState } from 'react';
import AddEvent from './addEvent/page.js'; // Import AddEvent component
import Calendar from './Calendar/page.js';
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
      <Calendar events={filteredEvents} />
      <AddEvent onAddEvent={handleAddEvent} />
    </div>
  );
}
