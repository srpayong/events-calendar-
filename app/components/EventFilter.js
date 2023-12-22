import React from 'react';

export default function EventFilter({ setFilteredEvents, allEvents }) {
  const teamNames = [
    ...new Set(
      allEvents
        .flatMap((event) => [
          event.homeTeam ? event.homeTeam.name : null,
          event.awayTeam ? event.awayTeam.name : null,
        ])
        .filter((name) => name !== null),
    ),
  ];

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
    <select onChange={handleFilterChange}>
      <option value="">Select a team</option>
      {teamNames.map((name) => (
        <option key={`team-${name}`} value={name}>
          {name}
        </option>
      ))}
    </select>
  );
}
