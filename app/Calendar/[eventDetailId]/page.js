'use client';
import { useRouter } from 'next/navigation';
import sportData from '../../../public/sportData.json';

export default function ExpandDetails({ params }) {
  const router = useRouter();
  const eventDetail = sportData.data.find(
    (event) => event.id === params.eventDetailId,
  );

  if (!eventDetail) {
    return <div>Event not found</div>;
  }
  const handleGoBack = () => {
    router.back();
  };

  return (
    <div>
      {eventDetail ? (
        <>
          <div>
            <h1>
              {eventDetail.homeTeam?.name} vs {eventDetail.awayTeam?.name}
            </h1>
            <p>Date: {eventDetail.dateVenue}</p>
            <p>Time: {eventDetail.timeVenueUTC}</p>
            <p>Venue: {eventDetail.stadium || 'Not specified'}</p>
            <p>
              Result: {eventDetail.result?.homeGoals} -{' '}
              {eventDetail.result?.awayGoals}
            </p>
            <p>Winner: {eventDetail.result?.winner || 'Not yet decided'}</p>
          </div>
          <div>
            <p>Home Team Official Name: {eventDetail.homeTeam?.officialName}</p>
            <p>Home Team Abbreviation: {eventDetail.homeTeam?.abbreviation}</p>
            <p>
              Home Team Country Code: {eventDetail.homeTeam?.teamCountryCode}
            </p>
            <p>Away Team Official Name: {eventDetail.awayTeam?.officialName}</p>
            <p>Away Team Abbreviation: {eventDetail.awayTeam?.abbreviation}</p>
            <p>
              Away Team Country Code: {eventDetail.awayTeam?.teamCountryCode}
            </p>
            <p>Winner ID: {eventDetail.result?.winnerId}</p>
          </div>
          <div>
            <p>Season: {eventDetail.season}</p>
            <p>Status: {eventDetail.status}</p>
            <p>Origin Competition: {eventDetail.originCompetitionName}</p>
            <p>Stage: {eventDetail.stage?.name}</p>
            <p>Group: {eventDetail.group}</p>
          </div>
          <button onClick={handleGoBack}>Go Back</button>
        </>
      ) : (
        <div>Loading event details...</div>
      )}
    </div>
  );
}
