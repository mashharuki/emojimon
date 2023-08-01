import { mudConfig } from "@latticexyz/world/register";
 
/**
 * MUDの設定
 */
export default mudConfig({
  enums: {
    // マップ上の情報
    TerrainType: [
      "None",
      "TallGrass",
      "Boulder"
    ],
    // モンスターの種類
    MonsterType: [
      "None",
      "Eagle",
      "Rat",
      "Caterpillar",
    ],
    // 捕獲ステータスの定義
    MonsterCatchResult: [
      "Missed", 
      "Caught", 
      "Fled"
    ],
  },
  // 各種管理する情報の定義
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
