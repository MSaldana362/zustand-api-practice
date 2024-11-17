import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DemoQuery } from "./DemoQuery";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="p-10">
        <DemoQuery />
      </div>
    </QueryClientProvider>
  );
}

export default App;
