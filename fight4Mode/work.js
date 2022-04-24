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

export function work() {
    let mySpawn = getObjectsByPrototype(StructureSpawn).filter(s => s.my)[0];
    let carrier = getObjectsByPrototype(Creep).filter(s => s.type == "carrier");
    let worker = getObjectsByPrototype(Creep).filter(s => s.type == "worker");
    let container = getObjectsByPrototype(StructureContainer).filter(s => s.store[RESOURCE_ENERGY] > 0);
    let mySpawn_Container_findClosest = findClosestByRange(mySpawn, container);
    let myConstructionSite = getObjectsByPrototype(ConstructionSite).filter(s => s.my)
    //let 掉在地上的能量
    //还需补全逻辑，5格内的container空了之后，掉在地上的energy一并检索，找距离近的搬运
    if (worker.length > 0) {
        for (let workermix of worker) {
            if (getTicks() <= 300) {
                if (myConstructionSite.length > 0) {
                    //建造逻辑
                    if (!workermix.store[RESOURCE_ENERGY] > 0) {
                        let containerinHome = getObjectsByPrototype(StructureContainer).filter(s => s.store[RESOURCE_ENERGY] > 0 && getRange(mySpawn, s) <= 8);
                        let resource = getObjectsByPrototype(Resource).filter(i => i.resourceType == RESOURCE_ENERGY)
                        let workermix_resource_findClosest = findClosestByRange(workermix, resource);
                        let mySpawn_Container_findClosest = findClosestByRange(mySpawn, container);
                        let workermix_Container_findClosest = findClosestByRange(workermix, container);
                        let workermix_containerinHome_findClosest = findClosestByRange(workermix, containerinHome);
                        if (workermix.withdraw(workermix_containerinHome_findClosest, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            workermix.moveTo(workermix_containerinHome_findClosest);
                        }
                    } else {
                        //const constructionSite = utils.getObjectsByPrototype(prototypes.ConstructionSite).find(i => i.my);
                        let workermix_myConstructionSite_findClosest = findClosestByRange(workermix, myConstructionSite);
                        if (workermix.build(workermix_myConstructionSite_findClosest) == ERR_NOT_IN_RANGE) {
                            workermix.moveTo(workermix_myConstructionSite_findClosest);
                        }
                    }
                }
                else if (myConstructionSite.length == 0) {
                    if (workermix.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
                        if (workermix.withdraw(mySpawn_Container_findClosest, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            workermix.moveTo(mySpawn_Container_findClosest);
                        }
                    } else {
                        if (workermix.transfer(mySpawn, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            workermix.moveTo(mySpawn);
                        }
                    }

                }
            }
            if (getTicks() > 300) {
                if (myConstructionSite.length > 0) {
                    //建造逻辑
                    if (!workermix.store[RESOURCE_ENERGY] > 0) {
                        let resource = getObjectsByPrototype(Resource).filter(i => i.resourceType == RESOURCE_ENERGY)
                        let workermix_resource_findClosest = findClosestByRange(workermix, resource);
                        let mySpawn_Container_findClosest = findClosestByRange(mySpawn, container);
                        let workermix_Container_findClosest = findClosestByRange(workermix, container);
                        if (workermix.pickup(workermix_resource_findClosest, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            workermix.moveTo(workermix_resource_findClosest);
                        }
                        else if (workermix.withdraw(workermix_Container_findClosest, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            workermix.moveTo(workermix_Container_findClosest);
                        }
                    } else {
                        //const constructionSite = utils.getObjectsByPrototype(prototypes.ConstructionSite).find(i => i.my);
                        let workermix_myConstructionSite_findClosest = findClosestByRange(workermix, myConstructionSite);
                        if (workermix.build(workermix_myConstructionSite_findClosest) == ERR_NOT_IN_RANGE) {
                            workermix.moveTo(workermix_myConstructionSite_findClosest);
                        }
                    }
                }
                else if (myConstructionSite.length == 0) {
                    if (workermix.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
                        if (workermix.withdraw(mySpawn_Container_findClosest, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            workermix.moveTo(mySpawn_Container_findClosest);
                        }
                    } else {
                        if (workermix.transfer(mySpawn, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            workermix.moveTo(mySpawn);
                        }
                    }

                }
            }
        }
    }
}

