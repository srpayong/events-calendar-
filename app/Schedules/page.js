'use client';
import React, { useEffect, useState } from 'react';
import styles from './schedules.module.scss';

export default function SchedulesPage() {
  const [allEvents, setAllEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [checkedTeams, setCheckedTeams] = useState({});

  useEffect(() => {
    fetch('/sportData.json')
      .then((response) => response.json())
      .then((data) => {
        setAllEvents(data.data);
        setFilteredEvents(data.data); // Initialize with all events

        // Initialize checkbox state
        const teamNames = new Set(
          data.data.flatMap((event) =>
            [event.homeTeam?.name, event.awayTeam?.name].filter((name) => name),
          ),
        );
        const initialCheckState = {};
        teamNames.forEach((name) => (initialCheckState[name] = false));
        setCheckedTeams(initialCheckState);
      });
  }, []);

  const handleCheckboxChange = (teamName) => {
    setCheckedTeams((prevState) => ({
      ...prevState,
      [teamName]: !prevState[teamName],
    }));

    const activeTeams = {
      ...checkedTeams,
      [teamName]: !checkedTeams[teamName],
    };
    const activeTeamNames = Object.keys(activeTeams).filter(
      (name) => activeTeams[name],
    );

    const filtered = allEvents.filter(
      (event) =>
        activeTeamNames.includes(event.homeTeam?.name) ||
        activeTeamNames.includes(event.awayTeam?.name),
    );

    setFilteredEvents(activeTeamNames.length > 0 ? filtered : allEvents);
  };

  return (
    <div className={styles.schedulesPage}>
      <div className={styles.checkboxContainer}>
        {Object.keys(checkedTeams).map((teamName) => (
          <label key={teamName}>
            <input
              type="checkbox"
              checked={checkedTeams[teamName]}
              onChange={() => handleCheckboxChange(teamName)}
            />
            {teamName}
          </label>
        ))}
      </div>
      <div>
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <div key={event.id} className={styles.card}>
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
              {/* You can add more details as needed */}
            </div>
          ))
        ) : (
          <p>No events to display.</p>
        )}
      </div>
    </div>
  );
}
