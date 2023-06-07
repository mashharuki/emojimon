import { Has, HasValue, getComponentValue, runQuery } from "@latticexyz/recs";
import { uuid, awaitStreamValue } from "@latticexyz/utils";
import { MonsterCatchResult } from "../monsterCatchResult";
import { ClientComponents } from "./createClientComponents";
import { SetupNetworkResult } from "./setupNetwork";

export type SystemCalls = ReturnType<typeof createSystemCalls>;

export function createSystemCalls(
  { 
    singletonEntity,
    playerEntity, 
    worldSend, 
    txReduced$ 
  }: SetupNetworkResult,
  {
    Player,
    Position,
    Obstruction,
    MapConfig,
    Encounter,
    MonsterCatchAttempt,
  }: ClientComponents
) {

  /**
   * isObstructed function
   * @param x 
   * @param y 
   */
  const isObstructed = (x: number, y: number) => {
    return runQuery([Has(Obstruction), HasValue(Position, { x ,y })]).size > 0;
  };

  /**
   * wrapPosition function
   * @param x 
   * @param y 
   */
  const wrapPosition = (x: number, y: number) => {
    const mapConfig = getComponentValue(MapConfig, singletonEntity);

    if(!mapConfig) {
      throw new Error("mapConfig no yet loaded or initialized");
    }

    // check isEncounter
    const inEncounter = !!getComponentValue(Encounter, playerEntity);
    if(inEncounter) {
      console.warn("cannot move while in encounter");
      return;
    }

    return [(x + mapConfig.width) % mapConfig.width, (y + mapConfig.height) % mapConfig.height];
  };

  const moveTo = async (inputX: number, inputY: number) => {
    if(!playerEntity) {
      throw new Error("no player");
    }

    const [x, y] = wrapPosition(inputX, inputY);
    // check isObstructed
    if(isObstructed(x, y)) {
      console.warn("cannot move to obstructed space");
      return;
    }

    // get Position ID
    const potsitionId = uuid();
    Position.addOverride(potsitionId, {
      entity: playerEntity,
      value: { x, y },
    });

    try {
      const tx = await worldSend("move", [x, y]);
      await awaitStreamValue(txReduced$, (txHash) => txHash === tx.hash);
    } finally {
      Position.removeOverride(potsitionId);
    }
  };

  const moveBy = async (deltaX: number, deltaY: number) => {
    if(!playerEntity) {
      throw new Error("no player");
    }

    const playerPosition = getComponentValue(Position, playerEntity);

    if(!playerEntity) {
      console.warn("cannot moveBy without a player position, not yet spawned?");
      return;
    }

    await moveTo(playerPosition.x + deltaX, playerPosition.y + deltaY);
  };

  const spawn = async (inputX: number, inputY: number) => {
    if(!playerEntity) {
      throw new Error("no player");
    }

    const [x, y] = wrapPosition(inputX, inputY);

    const canSpawn = getComponentValue(Position, playerEntity)?.value !== true;
    if(!canSpawn) {
      throw new Error("already spawned");
    }

    // check isObstructed
    if(isObstructed(x, y)) {
      console.warn("cannot move to obstructed space");
      return;
    }

    // get Position ID
    const potsitionId = uuid();
    Position.addOverride(potsitionId, {
      entity: playerEntity,
      value: { x, y },
    });
    // get PlayerID
    const playerId = uuid();
    Player.addOverride(playerId, {
      entity: playerEntity,
      value: { value: true },
    })

    try {
      const tx = await worldSend("spawn", [x, y]);
      await awaitStreamValue(txReduced$, (txHash) => txHash === tx.hash);
    } finally {
      Position.removeOverride(potsitionId);
      Player.removeOverride(playerId);
    }
  };

  const throwBall = async () => {
    const player = playerEntity;
    if (!player) {
      throw new Error("no player");
    }
 
    const encounter = getComponentValue(Encounter, player);
    if (!encounter) {
      throw new Error("no encounter");
    }
 
    const tx = await worldSend("throwBall", []);
    await awaitStreamValue(txReduced$, (txHash) => txHash === tx.hash);
 
    const catchAttempt = getComponentValue(MonsterCatchAttempt, player);
    if (!catchAttempt) {
      throw new Error("no catch attempt found");
    }
 
    return catchAttempt.result as MonsterCatchResult;
  };

  const fleeEncounter = async () => {
    const tx = await worldSend("flee", []);
    await awaitStreamValue(txReduced$, (txHash) => txHash === tx.hash);
  };

  return {
    moveTo,
    moveBy,
    spawn,
    throwBall,
    fleeEncounter,
  };
}
