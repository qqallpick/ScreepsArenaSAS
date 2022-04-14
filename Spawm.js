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



export function Spawm() {
    let mySpawn = getObjectsByPrototype(StructureSpawn).filter(s => s.my)[0];
    switch (mySpawn.fightmode) {
        case 1: run1mode();
    }
}

function run1mode() {
    let mySpawn = getObjectsByPrototype(StructureSpawn).filter(s => s.my)[0];
    let myContainer = getObjectsByPrototype(StructureContainer).filter(s => s.my);
    let Container = getObjectsByPrototype(StructureContainer).filter(s => s.store[RESOURCE_ENERGY] > 0);
    let source = getObjectsByPrototype(Source).filter(s => s.energy > 0);
    let enemyCreeps = getObjectsByPrototype(Creep).filter(s => !s.my);
    let myCreeps = getObjectsByPrototype(Creep).filter(s => s.my);
    let enemySpawn = getObjectsByPrototype(StructureSpawn).filter(s => !s.my)[0];
    let Har = getObjectsByPrototype(Creep).filter(s => s.type == "Harvester");
    let Attacker = getObjectsByPrototype(Creep).filter(s => s.type == "Attacker");
    let Carrier = getObjectsByPrototype(Creep).filter(s => s.type == "Carrier");
    let Redball = getObjectsByPrototype(Creep).filter(s => s.type == "Redball");
    let Greenball = getObjectsByPrototype(Creep).filter(s => s.type == "Greenball");
    let Blueball = getObjectsByPrototype(Creep).filter(s => s.type == "Blueball");
    let Allinoner = getObjectsByPrototype(Creep).filter(s => s.type == "Allinoner");
    let Allinonerbefore = getObjectsByPrototype(Creep).filter(s => s.type == "Allinoner" && s.birthtime == "before");
    let Allinonerafter = getObjectsByPrototype(Creep).filter(s => s.type == "Allinoner" && s.birthtime == "after");
    let aio_team_false = getObjectsByPrototype(Creep).filter(s => s.type == "Allinoner" && s.team == "false");
    let aio_team_true = getObjectsByPrototype(Creep).filter(s => s.type == "Allinoner" && s.team == "true");
    let SpawmtoEnemycreepsClose = findClosestByRange(mySpawn, enemyCreeps)


    const body_carriers = [MOVE, CARRY, MOVE, CARRY];
    const body_redball = [TOUGH, TOUGH, TOUGH, TOUGH, MOVE, MOVE, MOVE, MOVE, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, MOVE, MOVE, MOVE];
    const body_greenball = [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, HEAL, HEAL];
    const body_blueball = [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK];
    const body_allinoners = [MOVE, MOVE, MOVE, MOVE, RANGED_ATTACK, RANGED_ATTACK, HEAL, HEAL];

    const fighttime = 500 //主动作战开始时间

    //基地位置侧
    mySpawn.rampos = mySpawn.x > 50 ? "右侧" : "左侧"

    //出生顺序管理
    if (Carrier.length < 1) {
        let Carriermix = mySpawn.spawnCreep(body_carriers).object;
        if (Carriermix) {
            Carriermix.type = "Carrier"
            Carriermix.num = Carrier.length
        }
    }
    else if (Redball.length < 2) {
        let Redballmix = mySpawn.spawnCreep(body_redball).object;
        if (Redballmix) {
            Redballmix.type = "Redball"
            Redballmix.num = Redball.length
        }
    }
    else if (Greenball.length < 2) {
        let Greenballmix = mySpawn.spawnCreep(body_greenball).object;
        if (Greenballmix) {
            Greenballmix.type = "Greenball"
            Greenballmix.num = Greenball.length
        }
    }
    else if (Blueball.length < 4) {
        let Blueballmix = mySpawn.spawnCreep(body_blueball).object;
        if (Blueballmix) {
            Blueballmix.type = "Blueball"
            Blueballmix.num = Blueball.length
        }
    }
    else if (Allinoner.length < 6) {
        let Allinonermix = mySpawn.spawnCreep(body_allinoners).object;
        if (Allinonermix) {
            Allinonermix.type = "Allinoner"
            Allinonermix.num = Allinonermix.length
            Allinonermix.flagnum = 1
        }
    }
    else {
        if (Carrier.length < 2) {
            let Carriermix = mySpawn.spawnCreep(body_carriers).object;
            if (Carriermix) {
                Carriermix.type = "Carrier"
                Carriermix.num = Carrier.length
            }
        }
        else if (Blueball.length < 8) {
            let Blueballmix = mySpawn.spawnCreep(body_blueball).object;
            if (Blueballmix) {
                Blueballmix.type = "Blueball"
                Blueballmix.num = Blueball.length
            }
        }
    }

    //战争状态管理
    //时间相关
    if (getTicks() < fighttime) { mySpawn.warstats = false }
    else { mySpawn.warstats = true }
    //敌人相关
    if (SpawmtoEnemycreepsClose) {
        if (SpawmtoEnemycreepsClose.x > mySpawn.x - 10 && SpawmtoEnemycreepsClose.x < mySpawn.x + 10 &&
            SpawmtoEnemycreepsClose.y > mySpawn.y - 10 && SpawmtoEnemycreepsClose.y < mySpawn.y + 10) {
            mySpawn.isclosecreeps = true
        }
        else { mySpawn.isclosecreeps = false }
    }






}