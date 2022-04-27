//main未使用万能头部，仅作保存用 
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

//功能性函数

//安装建筑
//如果pos位置上没有建筑或工地，就安装指定建筑工地
export function createSite(pos, prototype) {
    let mysite = getObjectsByPrototype(ConstructionSite).find(s => s.my && s.x == pos.x && s.y == pos.y);
    let mystructure = getObjectsByPrototype(prototype).find(s => s.X == pos.x && s.y == pos.y);
    if (!mysite && !mystructure) {
        createConstructionSite(pos, prototype);
    }
}

//最低血量
//选择对象数列中血量最低的那个
export function findLowestHits(creeps) {
    let bar = creeps[0];
    for (let i of creeps) {
        if (i.hits < bar.hits) {
            bar = i
        }
    }
    return bar
}

/**
*增加障碍物cost
*@param {*} costmatrix
*@returns
*/
export function setobstacle(costmatrix) {
    let obstaclePrototypes = [
        StructureSpawn,
        StructureExtension,
        StructureTower,
        StructureWall,
    ];
    let obstacleEnemyPrototypes = [StructureRampart];
    let obstacleEnemyPrototypesCreep = [Creep]
    for (const prototype of obstaclePrototypes) {
        let obstacles = getObjectsByPrototype(prototype).filter(
            (p) => p.exists
        );
        for (const obstacle of obstacles) {
            costmatrix.set(obstacle.x, obstacle.y, 255);
        }
    }
    for (const prototype of obstacleEnemyPrototypes) {
        let obstacles = getObjectsByPrototype(prototype).filter(
            (p) => p.exists & !p.my  
        );
        for (const obstacle of obstacles) {
            costmatrix.set(obstacle.x, obstacle.y, 255);
        }

    }
    for (const prototype of obstacleEnemyPrototypesCreep) {
        let obstacles = getObjectsByPrototype(prototype).filter(
            (p) => p.exists & !p.my  //我方单位不算255
        );
        for (const obstacle of obstacles) {
            costmatrix.set(obstacle.x, obstacle.y, 255);
            costmatrix.set(obstacle.x + 1, obstacle.y, 255);
            // costmatrix.set(obstacle.x + 2, obstacle.y, 255);
            costmatrix.set(obstacle.x - 1, obstacle.y, 255);
            // costmatrix.set(obstacle.x - 2, obstacle.y, 255);
            costmatrix.set(obstacle.x + 1, obstacle.y + 1, 255);
            // costmatrix.set(obstacle.x + 2, obstacle.y + 1, 255);
            costmatrix.set(obstacle.x - 1, obstacle.y + 1, 255);
            // costmatrix.set(obstacle.x - 2, obstacle.y + 1, 255);
            // costmatrix.set(obstacle.x + 1, obstacle.y + 2, 255);
            // costmatrix.set(obstacle.x + 2, obstacle.y + 2, 255);
            // costmatrix.set(obstacle.x - 1, obstacle.y + 2, 255);
            // costmatrix.set(obstacle.x - 2, obstacle.y + 2, 255);
            costmatrix.set(obstacle.x + 1, obstacle.y - 1, 255);
            // costmatrix.set(obstacle.x + 2, obstacle.y - 1, 255);
            costmatrix.set(obstacle.x - 1, obstacle.y - 1, 255);
            // costmatrix.set(obstacle.x - 2, obstacle.y - 1, 255);
            // costmatrix.set(obstacle.x + 1, obstacle.y - 2, 255);
            // costmatrix.set(obstacle.x + 2, obstacle.y - 2, 255);
            // costmatrix.set(obstacle.x - 1, obstacle.y - 2, 255);
            // costmatrix.set(obstacle.x - 2, obstacle.y - 2, 255);
            costmatrix.set(obstacle.x, obstacle.y + 1, 255);
            costmatrix.set(obstacle.x, obstacle.y - 1, 255);
            // costmatrix.set(obstacle.x, obstacle.y + 2, 255);
            // costmatrix.set(obstacle.x, obstacle.y - 2, 255);
        }
    }
    return costmatrix;
}

//对象A是否和对象集合B中的对象紧靠
export function isNearto(A, B) {
    let A_B_findClosest = findClosestByRange(A, B)
    if (getRange(A, A_B_findClosest) == 1) {
        return true
    }
    else {
        return false
    }
}

//该函数接收一个数组，返回数组所有元素重复次数最少的
export const getLeastDuplicateItems = (arr = []) => {
    const hash = Object.create(null);
    let keys, min; arr.forEach(el => {
        hash[el] = hash[el] || {
            value: el, count: 0
        };
        hash[el].count++;
    });
    keys = Object.keys(hash);
    keys.sort(function (el, b) {
        return hash[el].count - hash[b].count;
    });
    min = hash[keys[0]].count;
    return keys.filter(el => {
        return hash[el].count === min;
    }).
        map(el => {
            return hash[el].value;
        });
}
