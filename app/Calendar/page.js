'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Calendar from './Calendar';

export default function CalendarPage() {
  const [eventsData, setEventsData] = useState([]);

  useEffect(() => {
    fetch('/sportData.json')
      .then((response) => response.json())
      .then((data) => setEventsData(data.data));
  }, []);

  return (
    <div>
      <Calendar events={eventsData} />
      {eventsData.map((eventDetail) => {
        return (
          <div key={`eventDetail-div-${eventDetail.id}`}>
            <Link href={`/Calendar/${eventDetail.id}`}>
              {eventDetail.homeTeam?.name} vs {eventDetail.awayTeam?.name}
            </Link>
            /{' '}
          </div>
        );
      })}
    </div>
  );
}
