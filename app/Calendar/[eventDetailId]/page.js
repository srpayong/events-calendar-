'use client';

import { useRouter } from 'next/navigation';
import { IoArrowBackCircleOutline } from 'react-icons/io5';
import sportData from '../../../public/sportData.json';
import styles from '../../../Styles/eventDetail.module.scss';

export default function ExpandDetails({ params }) {
  const router = useRouter();

  const eventDetail = sportData.data.find(
    (event) => event.id === params.eventDetailId,
  );

  if (!eventDetail) {
    return <div>Event not found in data provided</div>;
  }

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div>
      {eventDetail ? (
        <>
          <div className={styles.teamContainer}>
            <div className={styles.teamCard}>
              <h2>{eventDetail.homeTeam?.name}</h2>
              <p>Official Name: {eventDetail.homeTeam?.officialName}</p>
              <p>Abbreviation: {eventDetail.homeTeam?.abbreviation}</p>
              <p>Country Code: {eventDetail.homeTeam?.teamCountryCode}</p>
            </div>
            <h1 className={styles.h1}>VS.</h1>
            <div className={styles.teamCard}>
              <h2>{eventDetail.awayTeam?.name}</h2>
              <p>Official Name: {eventDetail.awayTeam?.officialName}</p>
              <p>Abbreviation: {eventDetail.awayTeam?.abbreviation}</p>
              <p>Country Code: {eventDetail.awayTeam?.teamCountryCode}</p>
            </div>
          </div>
          <div className={styles.commonInfo}>
            <h2 className={styles.h2}>
              {eventDetail.homeTeam?.name} vs {eventDetail.awayTeam?.name}
            </h2>
            <p>Date: {eventDetail.dateVenue}</p>
            <p>Time: {eventDetail.timeVenueUTC}</p>
            <p>Venue: {eventDetail.stadium || 'Not specified'}</p>
            <p>
              Result: {eventDetail.result?.homeGoals} -{' '}
              {eventDetail.result?.awayGoals}
            </p>
            <p>Winner: {eventDetail.result?.winner || 'Not yet decided'}</p>
            <p>Season: {eventDetail.season}</p>
            <p>Status: {eventDetail.status}</p>
            <p>Origin Competition: {eventDetail.originCompetitionName}</p>
            <p>Stage: {eventDetail.stage?.name}</p>
            <p>Group: {eventDetail.group}</p>
          </div>

          <button className={styles.goBackButton} onClick={handleGoBack}>
            <IoArrowBackCircleOutline className={styles.backIcon} />
          </button>
        </>
      ) : (
        <div>Loading event details...</div>
      )}
    </div>
  );
}
