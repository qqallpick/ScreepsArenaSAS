//以下是万能头部 
import {
    ConstructionSite,
    Creep,
    GameObject,
    OwnedStructure,
    Resource,
    RoomObject,
    Source,
    Structure,
    StructureContainer,
    StructureExtension,
    StructureRampart,
    StructureRoad,
    StructureSpawn,
    StructureTower,
    StructureWall,
} from '/game/prototypes';
import {
    ATTACK,
    ATTACK_POWER,
    BODYPART_COST,
    BODYPART_HITS,
    BOTTOM,
    BOTTOM_LEFT,
    BOTTOM_RIGHT,
    BUILD_POWER,
    CARRY,
    CARRY_CAPACITY,
    CONSTRUCTION_COST,
    CONSTRUCTION_COST_ROAD_SWAMP_RATIO,
    CONSTRUCTION_COST_ROAD_WALL_RATIO,
    CONTAINER_CAPACITY,
    CONTAINER_HITS,
    CREEP_SPAWN_TIME,
    DISMANTLE_COST,
    DISMANTLE_POWER,
    ERR_BUSY,
    ERR_FULL,
    ERR_INVALID_ARGS,
    ERR_INVALID_TARGET,
    ERR_NAME_EXISTS,
    ERR_NOT_ENOUGH_ENERGY,
    ERR_NOT_ENOUGH_EXTENSIONS,
    ERR_NOT_ENOUGH_RESOURCES,
    ERR_NOT_FOUND,
    ERR_NOT_IN_RANGE,
    ERR_NOT_OWNER,
    ERR_NO_BODYPART,
    ERR_NO_PATH,
    ERR_TIRED,
    EXTENSION_ENERGY_CAPACITY,
    EXTENSION_HITS,
    HARVEST_POWER,
    HEAL,
    HEAL_POWER,
    LEFT,
    MAX_CONSTRUCTION_SITES,
    MAX_CREEP_SIZE,
    MOVE,
    OBSTACLE_OBJECT_TYPES,
    OK,
    RAMPART_HITS,
    RAMPART_HITS_MAX,
    RANGED_ATTACK,
    RANGED_ATTACK_DISTANCE_RATE,
    RANGED_ATTACK_POWER,
    RANGED_HEAL_POWER,
    REPAIR_COST,
    REPAIR_POWER,
    RESOURCES_ALL,
    RESOURCE_DECAY,
    RESOURCE_ENERGY,
    RIGHT,
    ROAD_HITS,
    ROAD_WEAROUT,
    SOURCE_ENERGY_REGEN,
    SPAWN_ENERGY_CAPACITY,
    SPAWN_HITS,
    STRUCTURE_PROTOTYPES,
    TERRAIN_SWAMP,
    TERRAIN_WALL,
    TOP,
    TOP_LEFT,
    TOP_RIGHT,
    TOUGH,
    TOWER_CAPACITY,
    TOWER_COOLDOWN,
    TOWER_ENERGY_COST,
    TOWER_FALLOFF,
    TOWER_FALLOFF_RANGE,
    TOWER_HITS,
    TOWER_OPTIMAL_RANGE,
    TOWER_POWER_ATTACK,
    TOWER_POWER_HEAL,
    TOWER_POWER_REPAIR,
    TOWER_RANGE,
    WALL_HITS,
    WALL_HITS_MAX,
    WORK,
} from '/game/constants';

import {
    createConstructionSite,
    findClosestByPath,
    findClosestByRange,
    findInRange,
    findPath,
    getCpuTime,
    getDirection,
    getDistance,
    getHeapStatistics,
    getObjectById,
    getObjects,
    getObjectsByPrototype,
    getRange,
    getTerrainAt,
    getTicks,
    getTime,
} from '/game/utils';


import { searchPath, CostMatrix } from '/game/path-finder';
import { arenaInfo } from '/game';


Object.assign(global, {
    arenaInfo,
    searchPath,
    CostMatrix,
})

Object.assign(global, {
    ConstructionSite,
    Creep,
    GameObject,
    OwnedStructure,
    Resource,
    RoomObject,
    Source,
    Structure,
    StructureContainer,
    StructureExtension,
    StructureRampart,
    StructureRoad,
    StructureSpawn,
    StructureTower,
    StructureWall,
})

Object.assign(global, {
    createConstructionSite,
    findClosestByPath,
    findClosestByRange,
    findInRange,
    findPath,
    getCpuTime,
    getDirection,
    getDistance,
    getHeapStatistics,
    getObjectById,
    getObjects,
    getObjectsByPrototype,
    getRange,
    getTerrainAt,
    getTicks,
    getTime,
})


Object.assign(global, {
    ATTACK,
    ATTACK_POWER,
    BODYPART_COST,
    BODYPART_HITS,
    BOTTOM,
    BOTTOM_LEFT,
    BOTTOM_RIGHT,
    BUILD_POWER,
    CARRY,
    CARRY_CAPACITY,
    CONSTRUCTION_COST,
    CONSTRUCTION_COST_ROAD_SWAMP_RATIO,
    CONSTRUCTION_COST_ROAD_WALL_RATIO,
    CONTAINER_CAPACITY,
    CONTAINER_HITS,
    CREEP_SPAWN_TIME,
    DISMANTLE_COST,
    DISMANTLE_POWER,
    ERR_BUSY,
    ERR_FULL,
    ERR_INVALID_ARGS,
    ERR_INVALID_TARGET,
    ERR_NAME_EXISTS,
    ERR_NOT_ENOUGH_ENERGY,
    ERR_NOT_ENOUGH_EXTENSIONS,
    ERR_NOT_ENOUGH_RESOURCES,
    ERR_NOT_FOUND,
    ERR_NOT_IN_RANGE,
    ERR_NOT_OWNER,
    ERR_NO_BODYPART,
    ERR_NO_PATH,
    ERR_TIRED,
    EXTENSION_ENERGY_CAPACITY,
    EXTENSION_HITS,
    HARVEST_POWER,
    HEAL,
    HEAL_POWER,
    LEFT,
    MAX_CONSTRUCTION_SITES,
    MAX_CREEP_SIZE,
    MOVE,
    OBSTACLE_OBJECT_TYPES,
    OK,
    RAMPART_HITS,
    RAMPART_HITS_MAX,
    RANGED_ATTACK,
    RANGED_ATTACK_DISTANCE_RATE,
    RANGED_ATTACK_POWER,
    RANGED_HEAL_POWER,
    REPAIR_COST,
    REPAIR_POWER,
    RESOURCES_ALL,
    RESOURCE_DECAY,
    RESOURCE_ENERGY,
    RIGHT,
    ROAD_HITS,
    ROAD_WEAROUT,
    SOURCE_ENERGY_REGEN,
    SPAWN_ENERGY_CAPACITY,
    SPAWN_HITS,
    STRUCTURE_PROTOTYPES,
    TERRAIN_SWAMP,
    TERRAIN_WALL,
    TOP,
    TOP_LEFT,
    TOP_RIGHT,
    TOUGH,
    TOWER_CAPACITY,
    TOWER_COOLDOWN,
    TOWER_ENERGY_COST,
    TOWER_FALLOFF,
    TOWER_FALLOFF_RANGE,
    TOWER_HITS,
    TOWER_OPTIMAL_RANGE,
    TOWER_POWER_ATTACK,
    TOWER_POWER_HEAL,
    TOWER_POWER_REPAIR,
    TOWER_RANGE,
    WALL_HITS,
    WALL_HITS_MAX,
    WORK,
})
//以上是万能头部

import { createSite } from '../utils';

export function spawm() {
    let mySpawn = getObjectsByPrototype(StructureSpawn).filter(s => s.my)[0];
    let enemyCreeps = getObjectsByPrototype(Creep).filter(s => !s.my);
    let enemySpawn = getObjectsByPrototype(StructureSpawn).filter(s => !s.my)[0];
    let carrier = getObjectsByPrototype(Creep).filter(s => s.type == "carrier");
    let allinoner = getObjectsByPrototype(Creep).filter(s => s.type == "allinoner");
    let mySpawm_enemyCreeps_findClosest = findClosestByRange(mySpawn, enemyCreeps)

    //体型数据
    const body_carriers = [MOVE, CARRY, MOVE, CARRY];
    const body_allinoners = [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, HEAL];

    //主动作战开始时间
    const fightTime = 270

    //基地位置判断
    mySpawn.ramPos = mySpawn.x > 50 ? "右侧" : "左侧"

    //建筑相关
    //在敌人基地下面写个“死”字
    let markPos1 = [{ x: enemySpawn.x - 3, y: enemySpawn.y + 2 },
    { x: enemySpawn.x - 2, y: enemySpawn.y + 2 },
    { x: enemySpawn.x - 1, y: enemySpawn.y + 2 },
    { x: enemySpawn.x, y: enemySpawn.y + 2 },
    { x: enemySpawn.x + 1, y: enemySpawn.y + 2 },
    { x: enemySpawn.x + 2, y: enemySpawn.y + 2 },
    { x: enemySpawn.x + 3, y: enemySpawn.y + 2 },
    { x: enemySpawn.x - 2, y: enemySpawn.y + 3 },
    { x: enemySpawn.x + 1, y: enemySpawn.y + 3 },
    { x: enemySpawn.x - 3, y: enemySpawn.y + 4 },
    { x: enemySpawn.x - 1, y: enemySpawn.y + 4 },
    { x: enemySpawn.x + 1, y: enemySpawn.y + 4 },
    { x: enemySpawn.x + 3, y: enemySpawn.y + 4 },
    { x: enemySpawn.x - 4, y: enemySpawn.y + 5 },
    { x: enemySpawn.x - 2, y: enemySpawn.y + 5 },
    { x: enemySpawn.x - 1, y: enemySpawn.y + 5 },
    { x: enemySpawn.x + 1, y: enemySpawn.y + 5 },
    { x: enemySpawn.x + 2, y: enemySpawn.y + 5 },
    { x: enemySpawn.x - 1, y: enemySpawn.y + 6 },
    { x: enemySpawn.x + 1, y: enemySpawn.y + 6 },
    { x: enemySpawn.x - 2, y: enemySpawn.y + 7 },
    { x: enemySpawn.x + 1, y: enemySpawn.y + 7 },
    { x: enemySpawn.x + 4, y: enemySpawn.y + 7 },
    { x: enemySpawn.x - 3, y: enemySpawn.y + 8 },
    { x: enemySpawn.x + 2, y: enemySpawn.y + 8 },
    { x: enemySpawn.x + 3, y: enemySpawn.y + 8 },
    ]
    for (let i of markPos1) {
        createSite(i, StructureRampart)
    }

    //出生顺序管理
    if (getTicks() <= 500) {
        if (carrier.length < 1) {
            let carriermix = mySpawn.spawnCreep(body_carriers).object;
            if (carriermix) {
                carriermix.type = "carrier"
                carriermix.num = carrier.length
            }
        }
        else if (allinoner.length < 8) {
            let allinonermix = mySpawn.spawnCreep(body_allinoners).object;
            if (allinonermix) {
                allinonermix.type = "allinoner"
                allinonermix.num = allinonermix.length
                allinonermix.flagNum = 1
            }
        }
    }
    if (getTicks() > 500) {
        if (carrier.length < 1) {
            let carriermix = mySpawn.spawnCreep(body_carriers).object;
            if (carriermix) {
                carriermix.type = "carrier"
                carriermix.num = carrier.length
            }
        }
        else if (allinoner.length < 8) {
            let allinonermix = mySpawn.spawnCreep(body_allinoners).object;
            if (allinonermix) {
                allinonermix.type = "allinoner"
                allinonermix.num = allinonermix.length
                allinonermix.flagNum = 1
            }
        }
    }

    //战争状态管理
    //时间相关
    if (getTicks() < fightTime) { mySpawn.warStats = false }
    else { mySpawn.warStats = true }
    //敌人相关
    if (mySpawm_enemyCreeps_findClosest) {
        if (mySpawm_enemyCreeps_findClosest.x > mySpawn.x - 10 && mySpawm_enemyCreeps_findClosest.x < mySpawn.x + 10 &&
            mySpawm_enemyCreeps_findClosest.y > mySpawn.y - 40 && mySpawm_enemyCreeps_findClosest.y < mySpawn.y + 40) {
            mySpawn.isCloseCreeps = true
        }
        else { mySpawn.isCloseCreeps = false }
    }
}

