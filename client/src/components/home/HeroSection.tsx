const HeroSection = () => {
  return (
    <section className="py-15 text-center">
      <h1 className="text-5xl font-bold max-w-3xl mx-auto leading-tight">
        Find players. Create matches. Play more sports.
      </h1>

      <p className="mt-6 max-w-2xl mx-auto text-gray-300">
        SportSpotter helps you organize games or join matches created by other
        players.
      </p>

      <div className="mt-8 flex justify-center gap-4">
        <button className="rounded-lg bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-500">
          Browse Matches
        </button>

        <button className="rounded-lg border border-gray-600 px-6 py-3 font-semibold hover:bg-gray-800">
          Create Match
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
