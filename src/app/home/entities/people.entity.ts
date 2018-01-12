import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

export interface Person {
  id: string;
  name: string;
  note: string;
}

export interface State extends EntityState<Person> {
  selectedPersonId: number;
}

export function sortByName(a: Person, b: Person): number {
  return a.name.localeCompare(b.name);
}

export const peopleAdapter: EntityAdapter<Person> = createEntityAdapter<Person>({
  sortComparer: sortByName
});

