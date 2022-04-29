export interface TagModel {
  /**
   * Declares how many distict characters there are.
   */
  distinct: number;
  /**
   * A list of pairs which connects a tag to a distinct character.
   * Exceptionally, -1 is used to denote the environment.
   * A given tag pair may not specify any character nor the environment.
   */
  structure: [string, number[]][];
}
