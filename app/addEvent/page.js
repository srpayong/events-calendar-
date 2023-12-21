'use client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

export default function AddEvent(props) {
  const initialFormState = {
    homeTeam: '',
    awayTeam: '',
    dateVenue: '',
    timeVenueUTC: '',
  };

  const [formData, setFormData] = useState(initialFormState);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    if (props.onAddEvent) {
      props.onAddEvent(formData);
    }

    setFormData(initialFormState);

    router.push('/');
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div>
      <h1>Add Event</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="homeTeam">Home Team:</label>
          <input
            type="text"
            id="homeTeam"
            name="homeTeam"
            value={formData.homeTeam}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="awayTeam">Away Team:</label>
          <input
            type="text"
            id="awayTeam"
            name="awayTeam"
            value={formData.awayTeam}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="dateVenue">Date:</label>
          <input
            type="date"
            id="dateVenue"
            name="dateVenue"
            value={formData.dateVenue}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="timeVenueUTC">Time (UTC):</label>
          <input
            type="time"
            id="timeVenueUTC"
            name="timeVenueUTC"
            value={formData.timeVenueUTC}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Add Event</button>
      </form>
      <button onClick={handleGoBack}> Go Back </button>
    </div>
  );
}
