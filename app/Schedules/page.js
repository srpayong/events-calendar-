'use client';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { IoArrowBackCircleOutline } from 'react-icons/io5';
import styles from '../../Styles/schedules.module.scss';

export default function SchedulesPage() {
  const router = useRouter();
  const [allEvents, setAllEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [checkedTeams, setCheckedTeams] = useState({});
  const [checkedStatuses, setCheckedStatuses] = useState({
    Played: false,
    Scheduled: false,
  });

  useEffect(() => {
    fetch('/sportData.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setAllEvents(data.data);
        setFilteredEvents(data.data);

        const teamNames = new Set(
          data.data.flatMap((event) =>
            [event.homeTeam?.name, event.awayTeam?.name].filter(Boolean),
          ),
        );
        setCheckedTeams(
          Object.fromEntries([...teamNames].map((team) => [team, false])),
        );

        const statuses = new Set(data.data.map((event) => event.status));
        setCheckedStatuses(
          Object.fromEntries([...statuses].map((status) => [status, false])),
        );
      })
      .catch((error) => {
        console.error('Failed to fetch events:', error);
      });
  }, []);

  const handleCheckboxChange = (type, name) => {
    if (type === 'team') {
      setCheckedTeams((prev) => ({ ...prev, [name]: !prev[name] }));
    } else if (type === 'status') {
      setCheckedStatuses((prev) => ({ ...prev, [name]: !prev[name] }));
    }
  };

  useEffect(() => {
    const filteredByTeam = checkedTeams
      ? allEvents.filter((event) =>
          Object.entries(checkedTeams).every(
            ([team, checked]) =>
              !checked ||
              event.homeTeam?.name === team ||
              event.awayTeam?.name === team,
          ),
        )
      : allEvents;

    const filteredByStatus = checkedStatuses
      ? filteredByTeam.filter((event) =>
          Object.entries(checkedStatuses).every(
            ([status, checked]) => !checked || event.status === status,
          ),
        )
      : filteredByTeam;

    setFilteredEvents(filteredByStatus);
  }, [checkedTeams, checkedStatuses, allEvents]);

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className={styles.schedulesPage}>
      <div className={styles.checkboxContainer}>
        <div>
          <h5> Filter by Team: </h5>
          {Object.keys(checkedTeams).map((teamName) => (
            <label key={`teamName-${teamName.id}`}>
              <input
                type="checkbox"
                checked={checkedTeams[teamName]}
                onChange={() => handleCheckboxChange('team', teamName)}
              />
              {teamName}
            </label>
          ))}
        </div>

        <div>
          <h5> Filter by Status: </h5>
          {Object.keys(checkedStatuses).map((status) => (
            <label key={`status-${status.id}`}>
              <input
                type="checkbox"
                checked={checkedStatuses[status]}
                onChange={() => handleCheckboxChange('status', status)}
              />
              {status}
            </label>
          ))}
        </div>
      </div>

      <div className={styles.cardsContainer}>
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <div key={`event-${event.id}`} className={styles.card}>
              <h3>
                {event.homeTeam?.name} vs {event.awayTeam?.name}
              </h3>
              <p>Date: {event.dateVenue}</p>
              <p>Time: {event.timeVenueUTC}</p>
              <p>Season: {event.season}</p>
              <p>Status: {event.status}</p>
              <p>Stage: {event.stage?.name}</p>
              <p>Stadium: {event.stadium || 'Not Available'}</p>
              <p>Home Team Official Name: {event.homeTeam?.officialName}</p>
              <p>Away Team Official Name: {event.awayTeam?.officialName}</p>
              <p>Home Goals: {event.result?.homeGoals}</p>
              <p>Away Goals: {event.result?.awayGoals}</p>
              <p>Winner: {event.result?.winner || 'TBD'}</p>
            </div>
          ))
        ) : (
          <p>No events to display.</p>
        )}
      </div>

      <button className={styles.goBackButton} onClick={handleGoBack}>
        <IoArrowBackCircleOutline className={styles.backIcon} />
      </button>
    </div>
  );
}
