'use client';
import Link from 'next/link';
import sportData from '../../public/sportData.json';
import Calendar from './Calendar';

export default function CalendarPage() {
  const eventsData = sportData.data;
  return (
    <div>
      <Calendar events={eventsData} />

      {eventsData.map((eventDetail) => {
        return (
          <div key={`eventDetail-div-${eventDetail.id}`}>
            <Link href={`/Calendar/${eventDetail.id}`}>
              {eventDetail.homeTeam?.name} vs {eventDetail.awayTeam?.name}
            </Link>
          </div>
        );
      })}
    </div>
  );
}
