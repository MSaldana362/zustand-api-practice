export type Character = {
  name: string;
  birth_year: string;
  films: string[];
};

export type APIData = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Character[];
};
