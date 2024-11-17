import { create } from "zustand";
import { APIData, Character } from "./api/types";

// TYPES FOR STORE

export type LocalCharacter = Character & {
  isForceUser: boolean;
};

export type LocalCharacters = LocalCharacter[];

// STORE

type CharacterStore = {
  localCharacters: LocalCharacters;
  initCharacters: (data: APIData) => void;
  updateForceUser: (character: LocalCharacter, status: boolean) => void;
};

export const useCharacterStore = create<CharacterStore>()((set) => ({
  localCharacters: [],
  initCharacters: (data) =>
    set(() => ({
      localCharacters: data.results.map((character) => ({
        ...character,
        isForceUser: false,
      })),
    })),
  updateForceUser: (character, status) =>
    set((state) => ({
      localCharacters: state.localCharacters.map((local) =>
        local.name === character.name
          ? {
              ...local,
              isForceUser: status,
            }
          : local
      ),
    })),
}));
