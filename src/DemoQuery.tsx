import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import { APIData } from "./api/types";
import { useCharacterStore } from "./store";
import { CharacterList } from "./CharacterList";

import { ScrollArea } from "./components/ui/scroll-area";

const fetchCharacters = async (): Promise<APIData> => {
  const response = await fetch("https://swapi.dev/api/people/");
  if (!response.ok) {
    throw new Error("Failed to fetch data!");
  }
  return response.json();
};

export function DemoQuery() {
  const { data, isLoading } = useQuery({
    queryFn: fetchCharacters,
    queryKey: ["characters"],
    staleTime: Infinity,
  });

  const { initCharacters } = useCharacterStore();

  useEffect(() => {
    if (data) {
      initCharacters(data);
    }
  }, [data]);

  if (isLoading) {
    return (
      <div>
        <>Loading...</>
      </div>
    );
  }

  return (
    <div>
      <CharacterList />

      <ScrollArea className="h-[400px] w-full rounded-md border">
        <pre>{JSON.stringify(data, null, 4)}</pre>
      </ScrollArea>
    </div>
  );
}
