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

import { findLowestHits, setobstacle, isNearto } from '../utils';

export function fight() {
    let mySpawn = getObjectsByPrototype(StructureSpawn).filter(s => s.my)[0];
    let enemyCreeps = getObjectsByPrototype(Creep).filter(s => !s.my);
    let enemyConstructionSite = getObjectsByPrototype(ConstructionSite).filter(s => !s.my);
    let enemySpawn = getObjectsByPrototype(StructureSpawn).filter(s => !s.my)[0];
    let enemyExtension = getObjectsByPrototype(StructureExtension).filter(s => !s.my);
    let enemyTower = getObjectsByPrototype(StructureTower).filter(s => !s.my);
    let allinoner = getObjectsByPrototype(Creep).filter(s => s.type == "allinoner");
    let mySpawn_enemyCreeps_findClosest = findClosestByRange(mySpawn, enemyCreeps)
    let myCreepsInjured = getObjectsByPrototype(Creep).filter(i => i.my && i.hits < i.hitsMax)
    let allinoner_teamLeader = getObjectsByPrototype(Creep).filter(s => s.type == "allinoner" && s.teamNow == true && s.teamLeader == true);

    let teamPos = {}
    let costs = new CostMatrix;
    let enemyRampart = getObjectsByPrototype(StructureRampart).filter(
        (p) => p.exists
    );
    let enemyWall = getObjectsByPrototype(StructureWall).filter(
        (p) => p.exists
    );
    let teamLeaderGoDirection;

    //设置costmatrix
    costs = setobstacle(costs);

    // const pos1point = { x: (mySpawn.x + 3), y: (mySpawn.y + 12) }
    // const pos2point = { x: (mySpawn.x - 3), y: (mySpawn.y - 12) }
    //集结点设置
    if (mySpawn.ramPos == "左侧") {
        if (mySpawn.buildGreatWallLine > mySpawn.y) {
            teamPos = { x: mySpawn.x + 2, y: mySpawn.y - 13 }

        }
        else {
            teamPos = { x: mySpawn.x + 2, y: mySpawn.y + 13 }
        }
    }
    else if (mySpawn.ramPos == "右侧") {
        if (mySpawn.buildGreatWallLine > mySpawn.y) {
            teamPos = { x: mySpawn.x - 2, y: mySpawn.y - 13 }
        }
        else {
            teamPos = { x: mySpawn.x - 2, y: mySpawn.y + 13 }
        }
    }

    //组队系统
    //组队条件：1、处于可以攻击的状态，即能打到人
    //2、是否贴近队友，isNearto
    if (allinoner.length >= 2 && enemyCreeps.length > 0) {
        for (let allinonermix of allinoner) {
            let allinonermix_enemyCreeps_findIn3Range = findInRange(allinonermix, enemyCreeps, 3)
            if (allinonermix_enemyCreeps_findIn3Range.length > 0 && isNearto(allinonermix, allinoner.filter(s => s.id != allinonermix.id))) {
                allinonermix.teamNow = true
            }
            else {
                allinonermix.teamNow = false
            }
        }
        //动态队长挑选,如果组队成功了，就需新挑选队长
        //清除其他人的队长标记，从组队状态中的一体机中选择
        //清除队长标记
        let allinoner_inTeam = getObjectsByPrototype(Creep).filter(s => s.type == "allinoner" && s.teamNow == true);
        for (let allinonermix of allinoner) { allinonermix.teamLeader = false }
        if (allinoner_inTeam.length >= 2 && enemyCreeps.length > 0) {
            let zuijindediren = findClosestByRange(allinoner_inTeam[0], enemyCreeps)
            let teamLeader_newLeadr = findClosestByRange(zuijindediren, allinoner_inTeam)
            teamLeader_newLeadr.teamLeader = true
        }
    }
    //移动逻辑,队长走位
    //出门直奔对面离我基地最近的敌人，杀光了再推对面基地
    let allinoner_teamLeader_all = getObjectsByPrototype(Creep).filter(s => s.type == "allinoner" && s.teamLeader == true);
    for (let allinonermix of allinoner_teamLeader_all) {
        if (!mySpawn.warStats) {
            allinonermix.moveTo(teamPos)
        }
        else if (mySpawn.warStats) {
            if (enemyCreeps.length > 0) {
                let allinonermix_enemyCreeps_findClosest = findClosestByRange(allinonermix, enemyCreeps)
                if (getRange(allinonermix, allinonermix_enemyCreeps_findClosest) >= 4 &&
                    getRange(allinonermix, enemySpawn) > 7) {
                    //let allinonermix_mySpawn_enemyCreeps_findClosest_findPath = findPath(allinonermix, mySpawn_enemyCreeps_findClosest);
                    let allinonermix_allinonermix_enemyCreeps_findClosest_findPath = findPath(allinonermix, allinonermix_enemyCreeps_findClosest);
                    allinonermix.moveTo(allinonermix_allinonermix_enemyCreeps_findClosest_findPath[0])
                    teamLeaderGoDirection = getDirection(allinonermix_allinonermix_enemyCreeps_findClosest_findPath[0].x - allinonermix.x, allinonermix_allinonermix_enemyCreeps_findClosest_findPath[0].y - allinonermix.y)
                }
                else if (getRange(allinonermix, allinonermix_enemyCreeps_findClosest) == 3 &&
                    getRange(allinonermix, enemySpawn) > 7) {
                    //不动
                    teamLeaderGoDirection = false
                }
                else if (getRange(allinonermix, allinonermix_enemyCreeps_findClosest) < 3 &&
                    getRange(allinonermix, enemySpawn) > 7) {
                    let allinonermix_allinonermix_enemyCreeps_findClosest_findPath = findPath(allinonermix, allinonermix_enemyCreeps_findClosest, { flee: true, range: 7, costMatrix: costs });
                    //console.log(allinonermix_allinonermix_enemyCreeps_findClosest_findPath)
                    allinonermix.moveTo(allinonermix_allinonermix_enemyCreeps_findClosest_findPath[0])
                    teamLeaderGoDirection = getDirection(allinonermix_allinonermix_enemyCreeps_findClosest_findPath[0].x - allinonermix.x, allinonermix_allinonermix_enemyCreeps_findClosest_findPath[0].y - allinonermix.y)
                    //console.log(allinonermix.moveTo(allinonermix_allinonermix_enemyCreeps_findClosest_findPath[0]))
                }
                else {
                    allinonermix.moveTo(enemySpawn)
                }
            }
            else {
                allinonermix.moveTo(enemySpawn)
            }
        }
    }
    //移动逻辑,队员走位
    //跟随队长的移动方向走位
    let allinoner_inTeam_notTeamLeader = getObjectsByPrototype(Creep).filter(s => s.type == "allinoner" && s.teamNow == true && s.teamLeader == false);
    for (let allinonermix of allinoner_inTeam_notTeamLeader) {
        if (!mySpawn.warStats) {
            allinonermix.moveTo(teamPos)
        }
        else if (mySpawn.warStats) {
            if (teamLeaderGoDirection != false) {
                allinonermix.move(teamLeaderGoDirection)
            }
        }
    }

    //移动逻辑，非队员走位
    let allinoner_notInTeam = getObjectsByPrototype(Creep).filter(s => s.type == "allinoner" && s.teamNow == false && s.teamLeader == false);
    for (let allinonermix of allinoner_notInTeam) {
        if (!mySpawn.warStats && !mySpawn.isCloseCreeps) {
            allinonermix.moveTo(teamPos)
        }
        else if (mySpawn.warStats && !mySpawn.isCloseCreeps) {
            if (enemyCreeps.length > 0) {
                let allinonermix_enemyCreeps_findClosest = findClosestByRange(allinonermix, enemyCreeps)
                if (getRange(allinonermix, allinonermix_enemyCreeps_findClosest) >= 4 &&
                    getRange(allinonermix, enemySpawn) > 1) {
                    let allinonermix_allinonermix_enemyCreeps_findClosest_findPath = findPath(allinonermix, allinonermix_enemyCreeps_findClosest);
                    allinonermix.moveTo(allinonermix_allinonermix_enemyCreeps_findClosest_findPath[0])
                    //teamLeaderGoDirection = getDirection(allinonermix_allinonermix_enemyCreeps_findClosest_findPath[0].x - allinonermix.x, allinonermix_allinonermix_enemyCreeps_findClosest_findPath[0].y - allinonermix.y)
                }
                else if (getRange(allinonermix, allinonermix_enemyCreeps_findClosest) == 3 &&
                    getRange(allinonermix, enemySpawn) > 1) {
                    //不动
                }
                else if (getRange(allinonermix, allinonermix_enemyCreeps_findClosest) < 3 &&
                    getRange(allinonermix, enemySpawn) > 1) {
                    let allinonermix_allinonermix_enemyCreeps_findClosest_findPath = findPath(allinonermix, allinonermix_enemyCreeps_findClosest, { flee: true, range: 7, costMatrix: costs });
                    //console.log(allinonermix_allinonermix_enemyCreeps_findClosest_findPath)
                    allinonermix.moveTo(allinonermix_allinonermix_enemyCreeps_findClosest_findPath[0])
                    //teamLeaderGoDirection = getDirection(allinonermix.x - allinonermix_allinonermix_enemyCreeps_findClosest_findPath[0].x, allinonermix.y - allinonermix_allinonermix_enemyCreeps_findClosest_findPath[0].y)
                    //console.log(allinonermix.moveTo(allinonermix_allinonermix_enemyCreeps_findClosest_findPath[0]))
                }
                else {
                    allinonermix.moveTo(enemySpawn)
                }
            }
            else {
                allinonermix.moveTo(enemySpawn)
            }
        } else if (mySpawn.isCloseCreeps) {
            if (getRange(allinonermix, mySpawn_enemyCreeps_findClosest) >= 4 &&
                getRange(allinonermix, enemySpawn) > 1) {
                allinonermix.moveTo(mySpawn_enemyCreeps_findClosest)
            } else if (getRange(allinonermix, mySpawn_enemyCreeps_findClosest) == 3 &&
                getRange(allinonermix, enemySpawn) > 1) {
                //不动
            } else if (getRange(allinonermix, mySpawn_enemyCreeps_findClosest) < 3 &&
                getRange(allinonermix, enemySpawn) > 1) {
                let allinonermix_mySpawn_enemyCreeps_findClosest_findPath = findPath(allinonermix, mySpawn_enemyCreeps_findClosest, { flee: true, range: 7, costMatrix: costs });
                allinonermix.moveTo(allinonermix_mySpawn_enemyCreeps_findClosest_findPath[0])
            }
        }
    }

    //战斗逻辑
    for (let allinonermix of allinoner) {
        if (enemyCreeps.length > 0 && (enemySpawn || enemyExtension.length > 0 || enemyTower.length > 0)) {
            //有敌人有建筑的情况
            //优先打范围内的敌人
            //没有敌人了就打建筑
            //在打敌人的时候可以考虑Heal自己或者Heal1格内的友军
            let allinonermix_enemyCreeps_findClosest = findClosestByRange(allinonermix, enemyCreeps)
            let allinonermix_enemyCreeps_findIn3Range = findInRange(allinonermix, enemyCreeps, 3)
            let allinonermix_enemyCreeps_findIn3Range_findLowestHits = findLowestHits(allinonermix_enemyCreeps_findIn3Range)
            let allinonermix_enemyTower_findClosest = findClosestByRange(allinonermix, enemyTower)
            let allinonermix_enemyExtension_findClosest = findClosestByRange(allinonermix, enemyExtension)
            if (getRange(allinonermix, allinonermix_enemyCreeps_findClosest) <= 3 &&
                getRange(allinonermix, allinonermix_enemyCreeps_findClosest) >= 2 &&
                getRange(allinonermix, enemySpawn) > 1) {
                allinonermix.rangedAttack(allinonermix_enemyCreeps_findIn3Range_findLowestHits)
                //攻击的同时判断有没有需要Heal的友军，没有的话就Heal自己
                let allinonermix_myCreepsInjured_findIn1Range = findInRange(allinonermix, myCreepsInjured, 1)
                if (allinonermix_myCreepsInjured_findIn1Range.length > 0) {
                    let allinonermix_myCreepsInjured_findIn1Range_findLowestHits = findLowestHits(allinonermix_myCreepsInjured_findIn1Range)
                    allinonermix.heal(allinonermix_myCreepsInjured_findIn1Range_findLowestHits)
                }
                else {
                    allinonermix.heal(allinonermix)
                }
            }
            else if (getRange(allinonermix, allinonermix_enemyCreeps_findClosest) <= 1 &&
                getRange(allinonermix, enemySpawn) > 1) {
                allinonermix.rangedMassAttack()
                //攻击的同时判断有没有需要Heal的友军，没有的话就Heal自己
                let allinonermix_myCreepsInjured_findIn1Range = findInRange(allinonermix, myCreepsInjured, 1)
                if (allinonermix_myCreepsInjured_findIn1Range.length > 0) {
                    let allinonermix_myCreepsInjured_findIn1Range_findLowestHits = findLowestHits(allinonermix_myCreepsInjured_findIn1Range)
                    allinonermix.heal(allinonermix_myCreepsInjured_findIn1Range_findLowestHits)
                }
                else {
                    allinonermix.heal(allinonermix)
                }
            }
            else if (enemyTower.length > 0) {
                if (getRange(allinonermix, allinonermix_enemyTower_findClosest) <= 1) {
                    allinonermix.rangedMassAttack()
                }
                else if (getRange(allinonermix, allinonermix_enemyTower_findClosest) <= 3) {
                    allinonermix.rangedAttack(allinonermix_enemyTower_findClosest)
                }
                //攻击的同时判断有没有需要Heal的友军，没有的话就Heal自己
                let allinonermix_myCreepsInjured_findIn1Range = findInRange(allinonermix, myCreepsInjured, 1)
                if (allinonermix_myCreepsInjured_findIn1Range.length > 0) {
                    let allinonermix_myCreepsInjured_findIn1Range_findLowestHits = findLowestHits(allinonermix_myCreepsInjured_findIn1Range)
                    allinonermix.heal(allinonermix_myCreepsInjured_findIn1Range_findLowestHits)
                }
                else {
                    allinonermix.heal(allinonermix)
                }
            }
            else if (getRange(allinonermix, enemySpawn) <= 3) {
                if (getRange(allinonermix, enemySpawn) <= 1) {
                    allinonermix.rangedMassAttack()
                }
                else if (getRange(allinonermix, enemySpawn) <= 3) {
                    allinonermix.rangedAttack(enemySpawn)
                }
                //攻击的同时判断有没有需要Heal的友军，没有的话就Heal自己
                let allinonermix_myCreepsInjured_findIn1Range = findInRange(allinonermix, myCreepsInjured, 1)
                if (allinonermix_myCreepsInjured_findIn1Range.length > 0) {
                    let allinonermix_myCreepsInjured_findIn1Range_findLowestHits = findLowestHits(allinonermix_myCreepsInjured_findIn1Range)
                    allinonermix.heal(allinonermix_myCreepsInjured_findIn1Range_findLowestHits)
                }
                else {
                    allinonermix.heal(allinonermix)
                }
            }
            else if (enemyExtension.length > 0) {
                if (getRange(allinonermix, allinonermix_enemyExtension_findClosest) <= 1) {
                    allinonermix.rangedMassAttack()
                }
                else if (getRange(allinonermix, allinonermix_enemyExtension_findClosest) <= 3) {
                    allinonermix.rangedAttack(allinonermix_enemyExtension_findClosest)
                }
                //攻击的同时判断有没有需要Heal的友军，没有的话就Heal自己
                let allinonermix_myCreepsInjured_findIn1Range = findInRange(allinonermix, myCreepsInjured, 1)
                if (allinonermix_myCreepsInjured_findIn1Range.length > 0) {
                    let allinonermix_myCreepsInjured_findIn1Range_findLowestHits = findLowestHits(allinonermix_myCreepsInjured_findIn1Range)
                    allinonermix.heal(allinonermix_myCreepsInjured_findIn1Range_findLowestHits)
                }
                else {
                    allinonermix.heal(allinonermix)
                }
            }
            else {
                //此时攻击不到任何敌人和建筑，考虑一下治疗
                //优先治疗1格内的友军
                //再治疗3格内的友军
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
                else {
                    allinonermix.heal(allinonermix)
                }
            }
        }
        else {
            //没有敌人的情况（不会出现只有敌人没有建筑的情况呀^_^）,直接打基地
            //也不用考虑治疗
            if (getRange(allinonermix, enemySpawn) <= 3) {
                if (getRange(allinonermix, enemySpawn) <= 1) {
                    allinonermix.rangedMassAttack()
                }
                else if (getRange(allinonermix, enemySpawn) <= 3) {
                    allinonermix.rangedAttack(enemySpawn)
                }
                //攻击的同时判断有没有需要Heal的友军，没有的话就Heal自己
                let allinonermix_myCreepsInjured_findIn1Range = findInRange(allinonermix, myCreepsInjured, 1)
                if (allinonermix_myCreepsInjured_findIn1Range.length > 0) {
                    let allinonermix_myCreepsInjured_findIn1Range_findLowestHits = findLowestHits(allinonermix_myCreepsInjured_findIn1Range)
                    allinonermix.heal(allinonermix_myCreepsInjured_findIn1Range_findLowestHits)
                }
                else {
                    allinonermix.heal(allinonermix)
                }
            }
        }
    }


}




