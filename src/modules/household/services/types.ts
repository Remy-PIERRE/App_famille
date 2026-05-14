import type { Household } from "../types/Household";

export interface CreateHouseholdInput {
  name: string;
}

export interface JoinHouseholdInput {
  inviteCode: string;
}

export interface HouseholdService {
  create(userId: string, input: CreateHouseholdInput): Promise<Household>;

  join(userId: string, input: JoinHouseholdInput): Promise<Household>;

  getById(householdId: string): Promise<Household | null>;
}
