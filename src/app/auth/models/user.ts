export interface User {
  id: string;
  name: Name;
}

export interface Name {
  last: string;
  first: string;
  middle: string;
  displayName: string;
}
