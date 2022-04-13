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

export function Fight() {
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
    let teampos = {}
    //集结点设置
    if (mySpawn.rampos == "左侧") {
        teampos = { x: mySpawn.x + 3, y: mySpawn.y + 3 }
    }
    else if (mySpawn.rampos == "右侧") {
        teampos = { x: mySpawn.x - 3, y: mySpawn.y + 3 }
    }
    else {
        teampos = { x: mySpawn.x + 3, y: mySpawn.y + 3 }
    }

    //红球逻辑:移动
    if (!mySpawn.warstats && !mySpawn.isclosecreeps) {
        for (let redmix of Redball) {
            redmix.moveTo(teampos)
        }
    }
    else if (!mySpawn.warstats && mySpawn.isclosecreeps) {
        //找接近的敌爬打
        for (let redmix of Redball) {
            let closeenemyCreep = findClosestByRange(redmix, enemyCreeps)
            redmix.moveTo(closeenemyCreep)
        }
    }
    else if (mySpawn.warstats) {
        //开始推进模式
        for (let redmix of Redball) {
            redmix.moveTo(enemySpawn)
        }
    }
    //红球逻辑:战斗
    for (let redmix of Redball) {
        let rangeSpawm = getRange(redmix, enemySpawn);
        let redballfindenemyspawn1inrange = findInRange(redmix, enemySpawn, 1)
        let redballfindenemycreeps1inrange = findInRange(redmix, enemyCreeps, 1)
        let closeenemycreep = findClosestByRange(redmix, enemyCreeps)
        let rangecloseenemycreep = getRange(redmix, closeenemycreep);
        if (rangeSpawm <= 1) {
            redmix.attack(enemySpawn)
        }
        else if (rangecloseenemycreep <= 1) { redmix.attack(closeenemycreep) }
    }


    //绿球移动逻辑
    let greenballOdd = getObjectsByPrototype(Greenball).filter(s => s.num % 2 == 1);
    let greenballEven = getObjectsByPrototype(Greenball).filter(s => s.num % 2 == 0);
    let redballOdd = getObjectsByPrototype(Redball).filter(s => s.num % 2 == 1)[0];
    let redballEven = getObjectsByPrototype(Redball).filter(s => s.num % 2 == 0)[0];
    //奇数绿跟奇数红
    for (let greenodd of greenballOdd) {
        greenodd.moveTo(redballOdd)
    }
    //偶数绿跟偶数红
    for (let greeneven of greenballEven) {
        greeneven.moveTo(redballEven)
    }

    //绿球战斗逻辑
    //治疗顺序1范围内有红球就不停治疗 2范围内血量百分比最低 3自己有伤先治疗自己 
    //三格内用range，一格内用heal
    for (let greenball of Greenball) {
        let lowhitsRedball = getObjectsByPrototype(Redball).filter(i.hits < i.hitsMax);
        let greenballFindRedballin1range = findInRange(greenball, lowhitsRedball, 1)
        let greenballFindRedballin3range = findInRange(greenball, lowhitsRedball, 3)
        let lowhitsCreeps = getObjectsByPrototype(Creep).filter(i => i.my && i.hits < i.hitsMax);
        let lowhitsCreepsin1range = findInRange(greenball, lowhitsCreeps, 1)
        let lowhitsCreepsin3range = findInRange(greenball, lowhitsCreeps, 3)
        //1格内有红球受伤就Heal，3格内有红球受伤就RangedHeal
        if (greenballFindRedballin1range.length > 0) {
            greenball.heal(greenballFindRedballin1range[0])
        }
        else if (greenballFindRedballin3range.length > 0) {
            greenball.rangedHeal(greenballFindRedballin3range[0])
        }
        //1格内有我爬受伤就Heal，3格内有我爬受伤就RangedHeal
        else if (lowhitsCreepsin1range.length > 0) {
            greenball.heal(lowhitsCreepsin1range[0])
        }
        else if (lowhitsCreepsin3range.length > 0) {
            greenball.rangedHeal(lowhitsCreepsin3range[0])
        }
        //以上没有就治疗自己
        else {
            greenball.heal(greenball)
        }
    }

    //蓝球移动逻辑

    //蓝球战斗逻辑












}