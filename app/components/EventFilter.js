import React from 'react';
import styles from '../../Styles/eventFilter.module.scss';

export default function EventFilter({ setFilteredEvents, allEvents }) {
  const teamNames = [];

  allEvents.forEach((event) => {
    if (event.homeTeam && event.homeTeam.name) {
      teamNames.push(event.homeTeam.name);
    }
    if (event.awayTeam && event.awayTeam.name) {
      teamNames.push(event.awayTeam.name);
    }
  });

  const uniqueTeamNames = [];
  teamNames.forEach((name) => {
    if (!uniqueTeamNames.includes(name)) {
      uniqueTeamNames.push(name);
    }
  });

  const handleFilterChange = (e) => {
    const filterValue = e.target.value;
    const filtered = allEvents.filter(
      (event) =>
        (event.homeTeam && event.homeTeam.name === filterValue) ||
        (event.awayTeam && event.awayTeam.name === filterValue),
    );
    setFilteredEvents(filtered);
  };

  return (
    <select onChange={handleFilterChange} className={styles.select}>
      <option value="">Select Team</option>
      {uniqueTeamNames.map((teamName) => (
        <option key={`teamName-${teamName}`} value={teamName}>
          {teamName}
        </option>
      ))}
    </select>
  );
}
