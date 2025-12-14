export class PetNotFoundError extends Error {
  constructor() {
    super("Pet not found");
    this.name = "PetNotFoundError";
  }
}

export class PetAlreadyExistsError extends Error {
  constructor() {
    super("User already has a pet");
    this.name = "PetAlreadyExistsError";
  }
}