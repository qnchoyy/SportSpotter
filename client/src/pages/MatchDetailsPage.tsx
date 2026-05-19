import { useParams } from "react-router-dom";
import { useMatch } from "../hooks/useMatch";
import Spinner from "../components/ui/Spinner";
import { useAuth } from "../contexts/AuthContext";
import FootballField from "../components/fields/FootballField";
import TennisCourt from "../components/fields/TennisCourt";
import MatchHeader from "../components/matches/MatchHeader";
import MatchInfoPanel from "../components/matches/MatchInfoPanel";
import { useMatchParticipants } from "../hooks/useMatchParticipants";
import { useJoinMatch } from "../hooks/useJoinMatch";
import { useLeaveMatch } from "../hooks/useLeaveMatch";
import { useCancelMatch } from "../hooks/useCancelMatch";
import { useState } from "react";
import toast from "react-hot-toast";
import ConfirmDialog from "../components/ui/ConfirmDialog";

const MatchDetailsPage = () => {
  const { id } = useParams();
  const { match, loading, error } = useMatch(id);
  const { user } = useAuth();
  const { participants, loading: participantsLoading } =
    useMatchParticipants(id);
  const { mutate: joinMatch, isPending: isJoining } = useJoinMatch();
  const { mutate: leaveMatch, isPending: isLeaving } = useLeaveMatch();
  const { mutate: cancelMatch, isPending: isCancelling } = useCancelMatch();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  if (loading || participantsLoading) {
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
  const isOrganizer = match.organizer.id === user?.id;

  const handleJoin = (team: number) => {
    if (isNotLoggedIn || isJoined || isFull || isJoining || isLeaving) return;

    joinMatch({ matchId: id!, team });
  };

  const handleLeave = () => {
    if (isNotLoggedIn || !isJoined || isLeaving) return;

    leaveMatch(id!);
  };

  const handleCancelClick = () => {
    setIsConfirmOpen(true);
  };

  const handleConfirmCancel = () => {
    if (!id || !isOrganizer || isCancelling) return;

    cancelMatch(id, {
      onSuccess: () => {
        toast.success("Match cancelled successfully");
        setIsConfirmOpen(false);
      },
      onError: () => {
        toast.error("Failed to cancel match");
        setIsConfirmOpen(false);
      },
    });
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
            isOrganizer={isOrganizer}
            onCancel={handleCancelClick}
            isCancelling={isCancelling}
            minSkillLevel={match.minSkillLevel}
            maxSkillLevel={match.maxSkillLevel}
            organizerUsername={match.organizer.username}
            status={match.status}
            venueAddress={match.venue.address}
            venueCity={match.venue.city}
            onLeave={handleLeave}
            isLeaving={isLeaving}
          />
        </div>
      </div>
      <ConfirmDialog
        open={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleConfirmCancel}
        title="Cancel match?"
        description="This action cannot be undone. The match will be cancelled and the venue slot will be released."
        confirmLabel="Cancel match"
        cancelLabel="Keep match"
        isLoading={isCancelling}
        variant="danger"
      />
    </div>
  );
};

export default MatchDetailsPage;
