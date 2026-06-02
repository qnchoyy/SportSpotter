import { NavLink } from "react-router-dom";
import Button from "../ui/Button";
import pitch from "../../assets/pitch.jpg";

const HeroSection = () => {
  return (
    <section className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
      <div>
        <div className="inline-flex items-center gap-2 border border-border rounded-full px-3 py-1">
          <span className="h-2 w-2 rounded-full bg-lime"></span>
          <span className="text-xs font-medium text-ink-muted">
            Your local sports community
          </span>
        </div>
        <h1 className="mt-6 text-5xl font-bold leading-tight tracking-tight text-ink">
          Find players. Create <span className="text-lime-dark">matches</span>.
          Play more sports.
        </h1>
        <p className="mt-6 max-w-md text-lg text-ink-muted">
          SportSpotter helps you organize games or join matches created by other
          players.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <NavLink to="/matches">
            <Button variant="primary" size="lg">
              Browse Matches
            </Button>
          </NavLink>

          <NavLink to="/matches/create">
            <Button variant="secondary" size="lg">
              Create Match
            </Button>
          </NavLink>
        </div>
        <div className="mt-10 flex items-center gap-6 text-sm text-ink-muted">
          <div>
            <span className="font-semibold text-ink">Football</span> & Tennis
          </div>
          <div className="h-4 w-px bg-border"></div>
          <div>
            Real <span className="font-semibold text-ink">local</span> venues
          </div>
        </div>
      </div>

      <div className="relative">
        <img
          src={pitch}
          alt="Sports courts in Sofia"
          className="h-full w-full rounded-xl object-cover"
        />
        <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-lime/10 to-transparent"></div>
      </div>
    </section>
  );
};

export default HeroSection;
