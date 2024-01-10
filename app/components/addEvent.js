'use client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import styles from '../../Styles/addEvent.module.scss';

export default function AddEvent({ onAddEvent }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    homeTeam: '',
    awayTeam: '',
    dateVenue: '',
    timeVenueUTC: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEvent = {
      ...formData,
      id: `event-${Date.now()}`,
      homeTeam: { name: formData.homeTeam },
      awayTeam: { name: formData.awayTeam },
    };

    onAddEvent(newEvent);

    router.push('/');
  };

  return (
    <div>
      <h1 className={styles.h1}>Create An Event</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label htmlFor="homeTeam" className={styles.label}>
            Home Team:
          </label>
          <input
            id="homeTeam"
            name="homeTeam"
            value={formData.homeTeam}
            onChange={handleChange}
            className={styles.input}
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="awayTeam" className={styles.label}>
            Away Team:
          </label>
          <input
            id="awayTeam"
            name="awayTeam"
            value={formData.awayTeam}
            onChange={handleChange}
            className={styles.input}
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="dateVenue" className={styles.label}>
            Date:
          </label>
          <input
            type="date"
            id="dateVenue"
            name="dateVenue"
            value={formData.dateVenue}
            onChange={handleChange}
            className={styles.input}
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="timeVenueUTC" className={styles.label}>
            Time (UTC):
          </label>
          <input
            type="time"
            id="timeVenueUTC"
            name="timeVenueUTC"
            value={formData.timeVenueUTC}
            onChange={handleChange}
            className={styles.input}
          />
        </div>
        <button className={styles.button}>Add Event</button>
      </form>
    </div>
  );
}
