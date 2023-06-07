import { mudConfig } from "@latticexyz/world/register";
 
/**
 * MUDの設定
 */
export default mudConfig({
  enums: {
    TerrainType: [
      "None",
      "TallGrass",
      "Boulder"
    ],
    MonsterType: [
      "None",
      "Eagle",
      "Rat",
      "Caterpillar",
    ],
    MonsterCatchResult: [
      "Missed", 
      "Caught", 
      "Fled"
    ],
  },
  tables: {
    Encounter: {
      keySchema: {
        player: "bytes32",
      },
      schema: {
        exists: "bool",
        monster: "bytes32",
        catchAttempts: "uint256",
      },
    },
    EncounterTrigger: "bool",
    Encounterable: "bool",
    MapConfig: {
      keySchema: {},
      dataStruct: false,
      schema: {
        width: "uint32",
        height: "uint32",
        terrain: "bytes",
      },
    },
    MonsterCatchAttempt: {
      ephemeral: true,
      dataStruct: false,
      keySchema: {
        encounter: "bytes32",
      },
      schema: {
        result: "MonsterCatchResult",
      },
    },
    Monster: "MonsterType",
    Movable: "bool",
    Obstruction: "bool",
    OwnedBy: "bytes32",
    Player: "bool",
    Position: {
      dataStruct: false,
      schema: {
        x: "uint32",
        y: "uint32",
      },
    },
  },
});
