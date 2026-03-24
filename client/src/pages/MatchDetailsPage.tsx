import { useParams } from "react-router-dom";
import { useMatch } from "../hooks/useMatch";
import Spinner from "../components/ui/Spinner";
import { matchesService } from "../services/matches";
import { useEffect, useState } from "react";
import type { Participant } from "../types/participant";
import { useAuth } from "../contexts/AuthContext";
import FootballField from "../components/fields/FootballField";
import TennisCourt from "../components/fields/TennisCourt";
import MatchHeader from "../components/matches/MatchHeader";
import MatchInfoPanel from "../components/matches/MatchInfoPanel";

const MatchDetailsPage = () => {
  const [isJoining, setIsJoining] = useState(false);
  const [participants, setParticipants] = useState<Participant[]>([]);

  const { id } = useParams();
  const { match, loading, error } = useMatch(id!);
  const { user } = useAuth();

  const fetchParticipants = async () => {
    try {
      if (!id) return;

      const data = await matchesService.getParticipants(id);
      setParticipants(data);
    } catch (error) {
      console.error("Failed to fetch participants", error);
    }
  };

  useEffect(() => {
    fetchParticipants();
  }, [id]);

  if (loading) {
    return (
      <div className="py-16">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error || !match) {
    return (
      <div className="py-16 text-center">
        <p className="text-red-400">Failed to load match.</p>
      </div>
    );
  }

  const isJoined = participants.some((p) => p.user.id === user?.id);
  const maxPlayers = match.playersPerTeam * match.numberOfTeams;
  const isFull = participants.length >= maxPlayers;
  const isNotLoggedIn = !user;

  const handleJoin = async (team: number) => {
    if (isNotLoggedIn || isJoined || isFull) return;

    try {
      setIsJoining(true);
      await matchesService.joinMatch(id!, team);
      await fetchParticipants();
    } catch (error) {
      console.error("failed to join", error);
    } finally {
      setIsJoining(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-1">
      <div className="space-y-8">
        <MatchHeader match={match} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          <div className="md:col-span-2 h-full">
            {match.sport === "football" && (
              <FootballField
                playersPerTeam={match.playersPerTeam}
                participants={participants}
                onJoin={handleJoin}
                currentUserId={user?.id}
                isJoining={isJoining}
              />
            )}

            {match.sport === "tennis" && (
              <TennisCourt
                playersPerTeam={match.playersPerTeam}
                participants={participants}
                onJoin={handleJoin}
                currentUserId={user?.id}
                isJoining={isJoining}
              />
            )}
          </div>

          <MatchInfoPanel
            totalPlayers={participants.length}
            maxPlayers={maxPlayers}
            isJoined={isJoined}
            isFull={isFull}
            isNotLoggedIn={isNotLoggedIn}
            minSkillLevel={match.minSkillLevel}
            maxSkillLevel={match.maxSkillLevel}
            organizerUsername={match.organizer.username}
            status={match.status}
            venueAddress={match.venue.address}
            venueCity={match.venue.city}
          />
        </div>
      </div>
    </div>
  );
};

export default MatchDetailsPage;
