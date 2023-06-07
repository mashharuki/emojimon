import { overridableComponent } from "@latticexyz/recs";
import { SetupNetworkResult } from "./setupNetwork";

export type ClientComponents = ReturnType<typeof createClientComponents>;

/**
 * createClientComponents function
 * @param param0 
 * @returns 
 */
export function createClientComponents({ components }: SetupNetworkResult) {
  return {
    ...components,
    Player: overridableComponent(components.Player),
    Position: overridableComponent(components.Position),
  };
}
