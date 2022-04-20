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

import { findLowestHits } from '../utils';

export function fight() {
    let mySpawn = getObjectsByPrototype(StructureSpawn).filter(s => s.my)[0];
    let enemyCreeps = getObjectsByPrototype(Creep).filter(s => !s.my);
    let enemyStructure = getObjectsByPrototype(Structure).filter(s => !s.my);//不能准确表示为敌方建筑，因为有中立建筑
    let enemyConstructionSite = getObjectsByPrototype(ConstructionSite).filter(s => !s.my);
    let enemySpawn = getObjectsByPrototype(StructureSpawn).filter(s => !s.my)[0];
    let enemyExtension = getObjectsByPrototype(StructureExtension).filter(s => !s.my);
    let enemyTower = getObjectsByPrototype(StructureTower).filter(s => !s.my);
    let redBall = getObjectsByPrototype(Creep).filter(s => s.type == "redBall");
    let greenBall = getObjectsByPrototype(Creep).filter(s => s.type == "greenBall");
    let blueBall = getObjectsByPrototype(Creep).filter(s => s.type == "blueBall");
    let allinoner = getObjectsByPrototype(Creep).filter(s => s.type == "allinoner");
    let mySpawn_enemyCreeps_findClosest = findClosestByRange(mySpawn, enemyCreeps)
    let teamPos = {}

    // const pos1point = { x: (mySpawn.x + 3), y: (mySpawn.y + 12) }
    // const pos2point = { x: (mySpawn.x - 3), y: (mySpawn.y - 12) }
    //集结点设置
    if (mySpawn.ramPos == "左侧") {
        teamPos = { x: mySpawn.x + 4, y: mySpawn.y - 3 }
    }
    else if (mySpawn.ramPos == "右侧") {
        teamPos = { x: mySpawn.x - 4, y: mySpawn.y - 3 }
    }
    else {
        teamPos = { x: mySpawn.x + 4, y: mySpawn.y - 3 }
    }

    //红球移动逻辑
    for (let redBallmix of redBall) {
        let redBallmix_enemySpawn_findPath = findPath(redBallmix, enemySpawn);
        //开战时间未到，没有敌人接近，就集结点待机
        if (!mySpawn.warStats && !mySpawn.isCloseCreeps) {
            redBallmix.moveTo(teamPos)
        }
        //开战时间未到，有敌人提前接近，找里基地最近的敌人打（可能导致在基地附近来回跑）
        else if (!mySpawn.warStats && mySpawn.isCloseCreeps) {
            redBallmix.moveTo(mySpawn_enemyCreeps_findClosest)
        }
        //开战时间到，没有敌人接近，就开始推进
        else if (mySpawn.warStats && !mySpawn.isCloseCreeps) {
            if (enemyCreeps.length > 0) {
                let redBallmix_enemyCreeps_findClosest = findClosestByRange(redBallmix, enemyCreeps)
                let redBallmix_enemyCreepsClosest_getRange = getRange(redBallmix, redBallmix_enemyCreeps_findClosest);
                let redBallmix_enemySpawn_getRange = getRange(redBallmix, enemySpawn);
                //开始推进模式，但是?格之内有敌人就要追，如果已经接近主基地就打基地（可能被中途勾引走）
                if (redBallmix_enemyCreepsClosest_getRange <= 5 && redBallmix_enemySpawn_getRange > 7) {
                    redBallmix.moveTo(redBallmix_enemyCreeps_findClosest)
                }
                else {
                    if (redBallmix_enemySpawn_findPath.length > 0) {
                        redBallmix.moveTo(redBallmix_enemySpawn_findPath[0]);
                        redBallmix.noWaytoGo = false
                    }
                    else {
                        redBallmix.moveTo(redBallmix_enemySpawn_findPath[0]);
                        redBallmix.noWaytoGo = true
                    }
                }
            }
            //没有敌方爬的时候直接推基地
            else {
                if (redBallmix_enemySpawn_findPath.length > 0) {
                    redBallmix.moveTo(redBallmix_enemySpawn_findPath[0]);
                    redBallmix.noWaytoGo = false
                }
                else {
                    redBallmix.moveTo(redBallmix_enemySpawn_findPath[0]);
                    redBallmix.noWaytoGo = true
                }
            }
        }
        //开战时间到，有敌人接近家，就回防
        else if (mySpawn.warStats && mySpawn.isCloseCreeps) {
            let redBallmix_enemySpawn_getRange = getRange(redBallmix, enemySpawn);
            if (redBallmix_enemySpawn_getRange < 40) {
                if (redBallmix_enemySpawn_findPath.length > 0) {
                    redBallmix.moveTo(redBallmix_enemySpawn_findPath[0]);
                    redBallmix.noWaytoGo = false
                }
                else {
                    redBallmix.moveTo(redBallmix_enemySpawn_findPath[0]);
                    redBallmix.noWaytoGo = true
                }
            }
            else {
                redBallmix.moveTo(mySpawn_enemyCreeps_findClosest)
            }
        }
    }

    //红球战斗逻辑
    //1格内有敌人就打敌人，没有敌人默认打建筑
    for (let redBallmix of redBall) {
        if (enemyCreeps.length > 0) {
            let redBallmix_enemyCreeps_findClosest = findClosestByRange(redBallmix, enemyCreeps)
            let redBallmix_enemyCreepsClosest_getRange = getRange(redBallmix, redBallmix_enemyCreeps_findClosest);
            if (redBallmix_enemyCreepsClosest_getRange <= 1) {
                redBallmix.attack(redBallmix_enemyCreeps_findClosest)
            }
            else {
                redBallmix.attack(enemySpawn)
            }
        }
        else {
            redBallmix.attack(enemySpawn)
        }
    }

    //绿球移动逻辑
    //跟随离对面基地最近的红球（在拐角附近可能重选队长）
    let enemySpawn_redBall_findClosest = findClosestByRange(enemySpawn, redBall)
    let enemySpawn_blueBall_findClosest = findClosestByRange(enemySpawn, blueBall)
    if (enemySpawn_redBall_findClosest) {
        for (let greenBallmix of greenBall) {
            greenBallmix.moveTo(enemySpawn_redBall_findClosest)
        }
    }
    else if (enemySpawn_blueBall_findClosest) {
        for (let greenBallmix of greenBall) {
            greenBallmix.moveTo(enemySpawn_blueBall_findClosest)
        }
    }

    //绿球战斗逻辑
    //治疗顺序:自己有伤先治疗自己，然后范围内寻找受伤的爬，治疗其中血量最低的
    //3格内用rangedHeal，1格内用heal
    for (let greenBallmix of greenBall) {
        let myCreepsInjured = getObjectsByPrototype(Creep).filter(i => i.my && i.hits < i.hitsMax);

        //有友方爬受伤
        //1格内有爬受伤就找生命最低的Heal，3格内有爬受伤就找生命最低的rangedHeal
        if (greenBallmix.hits < greenBallmix.hitsMax) {
            greenBallmix.heal(greenBallmix)
        }
        else if (myCreepsInjured.length > 0) {
            let greenBallmix_myCreepsInjured_findIn1Range = findInRange(greenBallmix, myCreepsInjured, 1)
            let greenBallmix_myCreepsInjured_findIn3Range = findInRange(greenBallmix, myCreepsInjured, 3)
            if (greenBallmix_myCreepsInjured_findIn1Range.length > 0) {
                let greenBallmix_myCreepsInjured_findIn1Range_findLowestHits = findLowestHits(greenBallmix_myCreepsInjured_findIn1Range)
                greenBallmix.heal(greenBallmix_myCreepsInjured_findIn1Range_findLowestHits)
            }
            else if (greenBallmix_myCreepsInjured_findIn3Range.length > 0) {
                let greenBallmix_myCreepsInjured_findIn3Range_findLowestHits = findLowestHits(greenBallmix_myCreepsInjured_findIn3Range)
                greenBallmix.rangedHeal(greenBallmix_myCreepsInjured_findIn3Range_findLowestHits)
            }
        }
    }

    //蓝球移动逻辑(新版本)
    //跟随离对面基地最近的红球
    //红球没了就自己往对面基地走
    for (let blueBallmix of blueBall) {
        if (mySpawn.isCloseCreeps) {
            let blueBallmix_greenBall_findClosest = findClosestByRange(blueBallmix, greenBall)
            if (getRange(blueBallmix, mySpawn_enemyCreeps_findClosest) <= 3) {
                blueBallmix.moveTo(blueBallmix_greenBall_findClosest)
            }
            else {
                blueBallmix.moveTo(mySpawn_enemyCreeps_findClosest)
            }
        }
        else {
            let enemySpawn_redBall_findClosest = findClosestByRange(enemySpawn, redBall)
            if (enemySpawn_redBall_findClosest) {
                let enemySpawn_redBall_findClosest_enemyCreeps_findIn3Range = findInRange(enemySpawn_redBall_findClosest, enemyCreeps, 3)
                let enemySpawn_redBall_findClosest_enemyCreeps_findClosest = findClosestByRange(enemySpawn_redBall_findClosest, enemyCreeps)
                if (enemySpawn_redBall_findClosest_enemyCreeps_findIn3Range.length > 0) {
                    if (getRange(blueBallmix, enemySpawn_redBall_findClosest_enemyCreeps_findClosest) <= 3) {
                        let blueBallmix_greenBall_findClosest = findClosestByRange(blueBallmix, greenBall)
                        blueBallmix.moveTo(blueBallmix_greenBall_findClosest)
                    }
                    else {
                        blueBallmix.moveTo(enemySpawn_redBall_findClosest_enemyCreeps_findClosest)
                    }
                } else {
                    if (enemySpawn_redBall_findClosest.noWaytoGo == false || enemySpawn_redBall_findClosest.noWaytoGo == undefined) {
                        blueBallmix.moveTo(enemySpawn_redBall_findClosest)
                    }
                    else if (enemySpawn_redBall_findClosest.noWaytoGo == true) {
                        blueBallmix.moveTo(enemySpawn)
                    }
                }
            }
            else {
                blueBallmix.moveTo(enemySpawn)
            }
        }
    }

    //蓝球战斗逻辑
    for (let blueBallmix of blueBall) {
        let blueBallmix_enemyCreeps_findIn3Range = findInRange(blueBallmix, enemyCreeps, 3)
        let blueBallmix_enemyCreeps_findIn3Range_findLowestHits = findLowestHits(blueBallmix_enemyCreeps_findIn3Range);
        //能够得着基地就打基地
        if (blueBallmix.rangedAttack(enemySpawn) == 0) {
            blueBallmix.rangedAttack(enemySpawn)
        }
        else if (blueBallmix_enemyCreeps_findIn3Range.length > 0) {
            if (getRange(blueBallmix, blueBallmix_enemyCreeps_findIn3Range_findLowestHits) <= 1) {
                blueBallmix.rangedMassAttack(blueBallmix_enemyCreeps_findIn3Range_findLowestHits)
            }
            else {
                blueBallmix.rangedAttack(blueBallmix_enemyCreeps_findIn3Range_findLowestHits)
            }
        }
    }

    //突击者逻辑
    //移动逻辑找建筑打，没建筑就打基地
    for (let allinonermix of allinoner) {
        if (enemyConstructionSite.length > 0 || enemyExtension.length > 0 || enemyTower.length > 0) {
            if (enemyExtension.length > 0) {
                let allinonermix_enemyExtension_findClosest = findClosestByRange(allinonermix, enemyExtension)
                allinonermix.moveTo(allinonermix_enemyExtension_findClosest)
            } else if (enemyTower.length > 0) {
                let allinonermix_enemyTower_findClosest = findClosestByRange(allinonermix, enemyTower)
                allinonermix.moveTo(allinonermix_enemyTower_findClosest)
            } else {
                allinonermix.moveTo(enemySpawn)
            }
        }
        else if (!mySpawn.warStats && !mySpawn.isCloseCreeps) {
            allinonermix.moveTo(teamPos)
        }
        else if (mySpawn.warStats || mySpawn.isCloseCreeps) {
            if (blueBall.length > 0) {
                allinonermix.moveTo(enemySpawn_blueBall_findClosest)
            }
            else {
                //如果1格内有敌人，就远离
                let allinonermix_enemyCreeps_findClosest = findClosestByRange(allinonermix, enemyCreeps)
                if (getRange(allinonermix, allinonermix_enemyCreeps_findClosest) <= 1) {
                    allinonermix.moveTo(mySpawn)
                }
                else {
                    allinonermix.moveTo(enemySpawn)
                }
            }
        }
    }

    //攻击逻辑：在攻击时不治疗，在不攻击时先自己治疗，再治疗受伤的友军
    for (let allinonermix of allinoner) {
        let allinonermix_enemyCreeps_findClosest = findClosestByRange(allinonermix, enemyCreeps)
        let allinonermix_enemyExtension_findClosest = findClosestByRange(allinonermix, enemyExtension)
        let allinonermix_enemyTower_findClosest = findClosestByRange(allinonermix, enemyTower)
        let myCreepsInjured = getObjectsByPrototype(Creep).filter(i => i.my && i.hits < i.hitsMax);

        if (allinonermix.hits < allinonermix.hitsMax) {
            allinonermix.heal(allinonermix)
        }
        else if (myCreepsInjured.length > 0) {
            let allinonermix_myCreepsInjured_findIn1Range = findInRange(allinonermix, myCreepsInjured, 1)
            let allinonermix_myCreepsInjured_findIn3Range = findInRange(allinonermix, myCreepsInjured, 3)
            if (allinonermix_myCreepsInjured_findIn1Range.length > 0) {
                let allinonermix_myCreepsInjured_findIn1Range_findLowestHits = findLowestHits(allinonermix_myCreepsInjured_findIn1Range)
                allinonermix.heal(allinonermix_myCreepsInjured_findIn1Range_findLowestHits)
            }
            else if (allinonermix_myCreepsInjured_findIn3Range.length > 0) {
                let allinonermix_myCreepsInjured_findIn3Range_findLowestHits = findLowestHits(allinonermix_myCreepsInjured_findIn3Range)
                allinonermix.rangedHeal(allinonermix_myCreepsInjured_findIn3Range_findLowestHits)
            }
        }
        else {
            if (allinonermix_enemyCreeps_findClosest) {
                if (getRange(allinonermix, allinonermix_enemyCreeps_findClosest) <= 1) {
                    allinonermix.attack(allinonermix_enemyCreeps_findClosest)
                }
            }
            if (allinonermix_enemyExtension_findClosest) {
                if (getRange(allinonermix, allinonermix_enemyExtension_findClosest) <= 1) {
                    allinonermix.attack(allinonermix_enemyExtension_findClosest)
                }
            }
            if (allinonermix_enemyTower_findClosest) {
                if (getRange(allinonermix, allinonermix_enemyTower_findClosest) <= 1) {
                    allinonermix.attack(allinonermix_enemyTower_findClosest)
                }
            }
            if (enemySpawn) {
                if (getRange(allinonermix, enemySpawn) <= 1) {
                    allinonermix.attack(enemySpawn)
                }
            }
        }
    }
}



