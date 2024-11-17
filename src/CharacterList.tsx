import { Label } from "./components/ui/label";
import { Checkbox } from "./components/ui/checkbox";

import { useCharacterStore, LocalCharacter } from "./store";
import { useMemo } from "react";

export function CharacterList() {
  const { localCharacters } = useCharacterStore();

  const charactersInAllFilms = useMemo(() => {
    console.log("Calculating Characters in Multiple Films...");
    return localCharacters.filter((character) => character.films.length === 6);
  }, [localCharacters.length]);

  const forceUsers = useMemo(() => {
    console.log("Calculating Force Users...");
    return localCharacters.filter((character) => character.isForceUser);
  }, [localCharacters]);

  return (
    <div className="space-y-2 my-10">
      <h1 className="text-lg">Local Characters ({localCharacters.length})</h1>
      <p className="text-xs">Use the checkboxes to select Force users.</p>
      {localCharacters.map((character, index) => (
        <CharacterDisplay key={index} character={character} />
      ))}

      <h1 className="text-lg">
        Characters in All 6 Films ({charactersInAllFilms.length})
      </h1>
      {charactersInAllFilms.map((character, index) => (
        <p className="text-xs" key={index}>
          {character.name}
        </p>
      ))}

      <h1 className="text-lg">Force Users ({forceUsers.length})</h1>
      {forceUsers.map((character, index) => (
        <p className="text-xs" key={index}>
          {character.name}
        </p>
      ))}
    </div>
  );
}

function CharacterDisplay({ character }: { character: LocalCharacter }) {
  const { updateForceUser } = useCharacterStore();
  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        id={character.name}
        onCheckedChange={(checked) => {
          updateForceUser(character, Boolean(checked));
        }}
      />
      <Label htmlFor={character.name}>
        {character.name} ({character.birth_year}) {character.films.length}
      </Label>
    </div>
  );
}
