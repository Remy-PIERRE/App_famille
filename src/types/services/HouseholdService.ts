import type { Household } from "../Household";

export interface CreateHouseholdInput {
  name: string;
}

export interface JoinHouseholdInput {
  inviteCode: string;
}

export interface HouseholdService {
  create(userId: string, input: CreateHouseholdInput): Promise<Household>;

  join(userId: string, input: JoinHouseholdInput): Promise<Household>;

  getCurrent(householdId: string): Promise<Household | null>;
}
