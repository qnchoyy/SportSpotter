import { useQuery } from "@tanstack/react-query";
import { healthService } from "./services/health";

const App = () => {
  const {
    data: health,
    isPending,
    error,
  } = useQuery({
    queryKey: ["health"],
    queryFn: healthService.checkLive,
  });

  if (isPending) {
    return <div className="p-4">Loading...</div>;
  }

  if (error) {
    return (
      <div className="p-4 text-red-500">
        Failed to connect to backend
        <div className="mt-2 text-xs text-red-400">
          {error instanceof Error ? error.message : String(error)}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-green-600">
        Backend Connected! ✅
      </h1>
      <pre className="mt-4 rounded bg-gray-100 p-4">
        {JSON.stringify(health, null, 2)}
      </pre>
    </div>
  );
};

export default App;
