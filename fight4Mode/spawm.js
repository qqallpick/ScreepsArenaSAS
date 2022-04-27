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

import { createSite, getLeastDuplicateItems } from '../utils';

export function spawm() {
    let mySpawn = getObjectsByPrototype(StructureSpawn).filter(s => s.my)[0];
    let enemyCreeps = getObjectsByPrototype(Creep).filter(s => !s.my);
    let enemySpawn = getObjectsByPrototype(StructureSpawn).filter(s => !s.my)[0];
    let carrier = getObjectsByPrototype(Creep).filter(s => s.type == "carrier");
    let worker = getObjectsByPrototype(Creep).filter(s => s.type == "worker");
    let droper = getObjectsByPrototype(Creep).filter(s => s.type == "droper")
    let er = getObjectsByPrototype(Creep).filter(s => s.type == "er")
    let allinoner = getObjectsByPrototype(Creep).filter(s => s.type == "allinoner");
    let mySpawm_enemyCreeps_findClosest = findClosestByRange(mySpawn, enemyCreeps)
    let container = getObjectsByPrototype(StructureContainer).filter(s => s.store[RESOURCE_ENERGY] > 0);

    //体型数据
    const body_carriers = [MOVE, CARRY, MOVE, CARRY];
    const body_allinoners = [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, HEAL];
    const body_workers = [WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE];
    const body_dropers = [CARRY, CARRY, CARRY, MOVE];
    const body_ers = [TOUGH];

    //主动作战开始时间
    const fightTime = 260

    //基地位置判断
    mySpawn.ramPos = mySpawn.x > 50 ? "右侧" : "左侧"

    //建筑相关
    //修单边长城
    buildGreatWall();
    buildSpawmProject();
    //修野外建筑
    buildExtension();
    //在敌人基地下面写个“死”字(不写了，改成画Logo)
    //motherFuckerDie();
    myLogo();

    //出生顺序管理
    if (getTicks() <= 500) {
        if (carrier.length < 2) {
            let carriermix = mySpawn.spawnCreep(body_carriers).object;
            if (carriermix) {
                carriermix.type = "carrier"
                carriermix.num = carrier.length
            }
        }
        else if (worker.length < 1) {
            let workermix = mySpawn.spawnCreep(body_workers).object;
            if (workermix) {
                workermix.type = "worker"
                workermix.num = worker.length
            }
        }
        else if (droper.length < 1) {
            let dropermix = mySpawn.spawnCreep(body_dropers).object;
            if (dropermix) {
                dropermix.type = "droper"
                dropermix.num = droper.length
            }
        } else if (er.length < 1) {
            let ermix = mySpawn.spawnCreep(body_ers).object;
            if (ermix) {
                ermix.type = "er"
                ermix.num = er.length
            }
        }
        else if (allinoner.length < 99) {
            let allinonermix = mySpawn.spawnCreep(body_allinoners).object;
            if (allinonermix) {
                allinonermix.type = "allinoner"
                allinonermix.num = allinonermix.length
                allinonermix.flagNum = 1
                allinonermix.teamLeader = false
                allinonermix.teamNow = false
            }
        }
    }
    if (getTicks() > 500) {
        if (carrier.length < 2) {
            let carriermix = mySpawn.spawnCreep(body_carriers).object;
            if (carriermix) {
                carriermix.type = "carrier"
                carriermix.num = carrier.length
            }
        }
        else if (allinoner.length < 99) {
            let allinonermix = mySpawn.spawnCreep(body_allinoners).object;
            if (allinonermix) {
                allinonermix.type = "allinoner"
                allinonermix.num = allinonermix.length
                allinonermix.flagNum = 1
                allinonermix.teamLeader = false
                allinonermix.teamNow = false
            }
        }
    }

    //战争状态管理
    //时间相关
    if (getTicks() < fightTime) {
        mySpawn.warStats = false
    }
    else {
        mySpawn.warStats = true
    }
    //敌人相关
    //根据左侧和右侧要区分
    //配合修墙重新规划
    if (enemyCreeps.length > 0) {
        if (mySpawn.ramPos == "左侧") {
            if (mySpawn.buildGreatWallLine > mySpawn.y) {
                if (mySpawm_enemyCreeps_findClosest.x >= mySpawn.x - 4 &&
                    mySpawm_enemyCreeps_findClosest.x <= mySpawn.x + 7 &&
                    mySpawm_enemyCreeps_findClosest.y >= mySpawn.y - 45 &&
                    mySpawm_enemyCreeps_findClosest.y <= mySpawn.buildGreatWallLine) {
                    mySpawn.isCloseCreeps = true
                }
                else { mySpawn.isCloseCreeps = false }
            }
            else {
                if (mySpawm_enemyCreeps_findClosest.x >= mySpawn.x - 4 &&
                    mySpawm_enemyCreeps_findClosest.x <= mySpawn.x + 7 &&
                    mySpawm_enemyCreeps_findClosest.y >= mySpawn.buildGreatWallLine &&
                    mySpawm_enemyCreeps_findClosest.y <= mySpawn.y + 54) {
                    mySpawn.isCloseCreeps = true
                }
                else { mySpawn.isCloseCreeps = false }
            }
        }
        else if (mySpawn.ramPos == "右侧") {
            if (mySpawn.buildGreatWallLine > mySpawn.y) {
                if (mySpawm_enemyCreeps_findClosest.x >= mySpawn.x - 7 &&
                    mySpawm_enemyCreeps_findClosest.x <= mySpawn.x + 4 &&
                    mySpawm_enemyCreeps_findClosest.y >= mySpawn.y - 54 &&
                    mySpawm_enemyCreeps_findClosest.y <= mySpawn.buildGreatWallLine) {
                    mySpawn.isCloseCreeps = true
                }
                else { mySpawn.isCloseCreeps = false }
            }
            else {
                if (mySpawm_enemyCreeps_findClosest.x >= mySpawn.x - 7 &&
                    mySpawm_enemyCreeps_findClosest.x <= mySpawn.x + 4 &&
                    mySpawm_enemyCreeps_findClosest.y >= mySpawn.buildGreatWallLine &&
                    mySpawm_enemyCreeps_findClosest.y <= mySpawn.y + 45) {
                    mySpawn.isCloseCreeps = true
                }
                else { mySpawn.isCloseCreeps = false }
            }
        }
    }

    //基地下面写“死”
    function motherFuckerDie() {
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
    }

    //基地下面画个坦克开炮
    function myLogo() {
        let ball1 = getObjectsByPrototype(ConstructionSite).find(s => s.x == enemySpawn.x && s.y == enemySpawn.y + 7 && s.my);
        let ball2 = getObjectsByPrototype(ConstructionSite).find(s => s.x == enemySpawn.x && s.y == enemySpawn.y + 5 && s.my);
        let ball3 = getObjectsByPrototype(ConstructionSite).find(s => s.x == enemySpawn.x && s.y == enemySpawn.y + 3 && s.my);
        let ball4 = getObjectsByPrototype(ConstructionSite).find(s => s.x == enemySpawn.x && s.y == enemySpawn.y + 1 && s.my);
        if (mySpawn.ball == undefined) {
            createSite({ x: enemySpawn.x, y: enemySpawn.y + 7 }, StructureRampart)
            mySpawn.ball = 1
        }
        else if (mySpawn.ball == 1) {
            if (ball1) {
                ball1.remove();
            }
            createSite({ x: enemySpawn.x, y: enemySpawn.y + 5 }, StructureRampart)
            mySpawn.ball = 2
        }
        else if (mySpawn.ball == 2) {
            if (ball2) {
                ball2.remove();
            }
            createSite({ x: enemySpawn.x, y: enemySpawn.y + 3 }, StructureRampart)
            mySpawn.ball = 3
        }
        else if (mySpawn.ball == 3) {
            if (ball3) {
                ball3.remove();
            }
            createSite({ x: enemySpawn.x, y: enemySpawn.y + 1 }, StructureRampart)
            mySpawn.ball = 4
        }
        else if (mySpawn.ball == 4) {
            if (ball4) {
                ball4.remove();
            }
            createSite({ x: enemySpawn.x + 1, y: enemySpawn.y + 1 }, StructureRampart)
            createSite({ x: enemySpawn.x + 1, y: enemySpawn.y - 1 }, StructureRampart)
            createSite({ x: enemySpawn.x - 1, y: enemySpawn.y + 1 }, StructureRampart)
            createSite({ x: enemySpawn.x - 1, y: enemySpawn.y - 1 }, StructureRampart)
            mySpawn.ball = 5
        }

        else if (mySpawn.ball == 5) {
            let ball6 = getObjectsByPrototype(ConstructionSite).find(s => s.x == enemySpawn.x + 1 && s.y == enemySpawn.y + 1 && s.my);
            let ball7 = getObjectsByPrototype(ConstructionSite).find(s => s.x == enemySpawn.x + 1 && s.y == enemySpawn.y - 1 && s.my);
            let ball8 = getObjectsByPrototype(ConstructionSite).find(s => s.x == enemySpawn.x - 1 && s.y == enemySpawn.y + 1 && s.my);
            let ball9 = getObjectsByPrototype(ConstructionSite).find(s => s.x == enemySpawn.x - 1 && s.y == enemySpawn.y - 1 && s.my);
            if (ball4) {
                ball4.remove();
            }
            if (ball6) {
                ball6.remove();
            }
            if (ball7) {
                ball7.remove();
            }
            if (ball8) {
                ball8.remove();
            }
            if (ball9) {
                ball9.remove();
            }
            createSite({ x: enemySpawn.x, y: enemySpawn.y + 7 }, StructureRampart)
            mySpawn.ball = 1
        }
        let markPos1 = [
            { x: enemySpawn.x, y: enemySpawn.y + 9 },
            { x: enemySpawn.x, y: enemySpawn.y + 10 },
            { x: enemySpawn.x + 1, y: enemySpawn.y + 10 },
            { x: enemySpawn.x + 1, y: enemySpawn.y + 11 },
            { x: enemySpawn.x - 1, y: enemySpawn.y + 10 },
            { x: enemySpawn.x - 1, y: enemySpawn.y + 11 },
        ]
        for (let i of markPos1) {
            createSite(i, StructureRampart)
        }
    }

    //修长城
    function buildGreatWall() {
        //先检测区域内每一排有多少格空地
        //找出最短的那一行
        //把那一行都填满wall
        //getTerrainAt(pos) 返回值：
        //0平原
        //1系统墙
        //2沼泽
        let touPiao = [];
        if (mySpawn.ramPos == "左侧" && mySpawn.buildGreatWallLine == undefined) {
            for (let y = 21; y < 78; y++) {
                for (let x = 1; x < 13; x++) {
                    //console.log(x, ",", y, ":", getTerrainAt({ x: x, y: y }))
                    if (getTerrainAt({ x: x, y: y }) != 1) {
                        touPiao.push(y)
                    }
                }
            }
            //找出出现次数最少的x，就是那一排
            let houxuan = getLeastDuplicateItems(touPiao)
            let bar = houxuan[0];
            for (let i of houxuan) {
                if (Math.abs(i - mySpawn.y) < Math.abs(bar - mySpawn.y)) {
                    bar = i
                }
            }
            mySpawn.buildGreatWallLine = bar
            //安放建筑工地代码
            for (let x = 1; x < 13; x++) {
                if (getTerrainAt({ x: x, y: bar }) != 1) {
                    createSite({ x: x, y: bar }, StructureWall)
                }
            }
        }
        else if (mySpawn.ramPos == "右侧" && mySpawn.buildGreatWallLine == undefined) {
            for (let y = 21; y < 28; y++) {
                for (let x = 86; x < 98; x++) {
                    if (getTerrainAt({ x: x, y: y }) != 1) {
                        touPiao.push(y)
                    }
                }
            }
            //找出出现次数最少的x，就是那一排
            let houxuan = getLeastDuplicateItems(touPiao)
            let bar = houxuan[0];
            for (let i of houxuan) {
                if (Math.abs(i - mySpawn.y) < Math.abs(bar - mySpawn.y)) {
                    bar = i
                }
            }
            mySpawn.buildGreatWallLine = bar
            //安放建筑工地代码
            for (let x = 86; x < 98; x++) {
                if (getTerrainAt({ x: x, y: bar }) != 1) {
                    createSite({ x: x, y: bar }, StructureWall)
                }
            }
        }
    }

    function buildTower() {
        //先检测基地10格以外的container
        //安放Tower
        for (let containermix of container) {
            if (getRange(containermix, mySpawn) > 10) {
                createSite({ x: containermix.x, y: containermix.y - 1 }, StructureTower)
            }
        }
    }

    function buildExtension() {
        //先检测基地10格以外的container
        //安放Extension
        if (getTicks() >= 240) {
            for (let containermix of container) {
                if (getRange(containermix, mySpawn) > 10 && getRange(containermix, enemySpawn) > 10) {
                    createSite({ x: containermix.x - 3, y: containermix.y - 3 }, StructureExtension)
                    createSite({ x: containermix.x - 3, y: containermix.y + 3 }, StructureExtension)
                    createSite({ x: containermix.x - 3, y: containermix.y }, StructureExtension)
                    createSite({ x: containermix.x, y: containermix.y - 3 }, StructureExtension)
                    createSite({ x: containermix.x, y: containermix.y + 3 }, StructureExtension)
                    createSite({ x: containermix.x + 3, y: containermix.y + 3 }, StructureExtension)
                    createSite({ x: containermix.x + 3, y: containermix.y - 3 }, StructureExtension)
                    createSite({ x: containermix.x + 3, y: containermix.y }, StructureExtension)
                }
            }
        }
    }

    function buildSpawmProject() {
        //先检测基地
        //安放Rampart
        createSite({ x: mySpawn.x, y: mySpawn.y }, StructureRampart)
    }
}
