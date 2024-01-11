'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Calendar from './Calendar';

export default function CalendarPage() {
  const [eventsData, setEventsData] = useState([]);

  useEffect(() => {
    fetch('/sportData.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((responseData) => setEventsData(responseData.data))
      .catch((error) => {
        console.error('There was a problem fetching the events data:', error);
      });
  }, []);

  return (
    <div>
      <Calendar events={eventsData} />
      {eventsData.map((eventData) => {
        return (
          <div key={`eventData-div-${eventData.id}`}>
            <Link href={`/Calendar/${eventData.id}`}>
              {eventData.homeTeam?.name} vs {eventData.awayTeam?.name}
            </Link>
          </div>
        );
      })}
    </div>
  );
}
