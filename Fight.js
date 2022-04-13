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
        teampos = { x: mySpawn.x + 4, y: mySpawn.y - 4 }
    }
    else if (mySpawn.rampos == "右侧") {
        teampos = { x: mySpawn.x - 4, y: mySpawn.y - 4 }
    }
    else {
        teampos = { x: mySpawn.x + 4, y: mySpawn.y - 4 }
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
        if (enemyCreeps) {
            let closeenemycreep = findClosestByRange(redmix, enemyCreeps)
            let rangecloseenemycreep = getRange(redmix, closeenemycreep);
            if (rangecloseenemycreep <= 1) {
                redmix.attack(closeenemycreep)
            }
            else {
                redmix.attack(enemySpawn)
            }
        } else {
            redmix.attack(enemySpawn)
        }
    }


    /*   //绿球移动逻辑(旧版本)
       let greenballOdd = getObjectsByPrototype(Creep).filter(s => s.type == "Greenball" && s.num % 2 == 1);
       let greenballEven = getObjectsByPrototype(Creep).filter(s => s.type == "Greenball" && s.num % 2 == 0);
       let redballOdd = getObjectsByPrototype(Creep).filter(s => s.type == "Redball" && s.num % 2 == 1);
       let redballEven = getObjectsByPrototype(Creep).filter(s => s.type == "Redball" && s.num % 2 == 0);
       //奇数绿跟奇数红
       if (redballOdd.length > 0) {
           for (let greenodd of greenballOdd) {
               greenodd.moveTo(redballOdd[0])
           }
       }
       else {
           if (Blueball.length > 0) {
               for (let greenodd of greenballOdd) {
                   let closeBlue = findClosestByRange(greenodd, Blueball)
                   greenodd.moveTo(closeBlue)
               }
           }
       }
       //偶数绿跟偶数红
       if (redballEven.length > 0) {
           for (let greeneven of greenballEven) {
               greeneven.moveTo(redballEven[0])
           }
       }
       else {
           if (Blueball.length > 0) {
               for (let greeneven of greenballEven) {
                   let closeBlue = findClosestByRange(greeneven, Blueball)
                   greeneven.moveTo(closeBlue)
               }
           }
       }
   */


    //绿球移动逻辑(新版本)
    //跟随离对面基地最近的红球
    let RedballclosetoenemySpawm = findClosestByRange(enemySpawn, Redball)
    let BlueballclosetoenemySpawm = findClosestByRange(enemySpawn, Blueball)
    if (RedballclosetoenemySpawm) {
        for (let green of Greenball) {
            green.moveTo(RedballclosetoenemySpawm)
        }
    } else if (BlueballclosetoenemySpawm) {
        for (let green of Greenball) {
            green.moveTo(BlueballclosetoenemySpawm)
        }
    }

    //绿球战斗逻辑
    //治疗顺序1范围内有红球就不停治疗 2范围内血量百分比最低 3自己有伤先治疗自己 
    //三格内用range，一格内用heal
    for (let greenball of Greenball) {
        let lowhitsRedball = getObjectsByPrototype(Redball).filter(i => i.hits < i.hitsMax);
        let greenballFindRedballin1range = findInRange(greenball, lowhitsRedball, 1)
        let greenballFindRedballin3range = findInRange(greenball, lowhitsRedball, 3)
        let greenballRedballin3range = findInRange(greenball, Redball, 3)
        let greenballRedballin1range = findInRange(greenball, Redball, 1)
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
        //自己受伤治疗自己
        else if (greenball.hits < greenball.hitsMax) {
            greenball.heal(greenball)
        }
        else {
            if (greenballRedballin1range.length > 0) {
                greenball.heal(greenballRedballin1range[0])
            }
            else if (greenballRedballin3range.length > 0) {
                greenball.rangedHeal(greenballRedballin3range[0])
            }
        }
    }

    /*    //蓝球移动逻辑(旧版本)
        //奇数跟奇数//偶数跟偶数
        let blueballOdd = getObjectsByPrototype(Creep).filter(s => s.type == "Blueball" && s.num % 2 == 1);
        let blueballEven = getObjectsByPrototype(Creep).filter(s => s.type == "Blueball" && s.num % 2 == 0);
        //奇数蓝跟奇数绿
        if (redballOdd.length > 0) {
            for (let blueodd of blueballOdd) {
                blueodd.moveTo(redballOdd[0])
            }
        } else {
            for (let blueodd of blueballOdd) {
                blueodd.moveTo(enemySpawn)
            }
        }
        //偶数蓝跟偶数绿
        if (redballEven.length > 0) {
            for (let blueeven of blueballEven) {
                blueeven.moveTo(redballEven[0])
            }
        } else {
            for (let blueeven of blueballOdd) {
                blueeven.moveTo(enemySpawn)
            }
        }
    */

    //蓝球移动逻辑(新版本)
    //跟随离对面基地最近的红球
    if (RedballclosetoenemySpawm) {
        for (let blue of Blueball) {
            blue.moveTo(RedballclosetoenemySpawm)
        }
    } else {
        for (let blue of Blueball) {
            blue.moveTo(enemySpawn)
        }
    }

    //蓝球战斗逻辑
    //3ranged1mass 
    for (let bullmix of Blueball) {
        let bullin3range = findInRange(bullmix, enemyCreeps, 3)
        let lowesthitsTargetin3range = findlowesthits(bullin3range);
        let bullin1range = findInRange(bullmix, enemyCreeps, 1)
        let lowesthitsTargetin1range = findlowesthits(bullin1range);

        if (bullmix.rangedAttack(enemySpawn) == 0) {
            bullmix.rangedAttack(enemySpawn)
        }
        else if (bullin3range.length > 0) {
            if (lowesthitsTargetin1range) {
                bullmix.rangedMassAttack(lowesthitsTargetin1range)
            }
            else if (lowesthitsTargetin3range) {
                bullmix.rangedAttack(lowesthitsTargetin3range)
            }
        }
    }

    //防偷家逻辑,一体机守家，攻击离家最近的爬
    //守家的模式是只在基地附近活动
    //随时治疗，远程打击

}

function findlowesthits(creeps) {
    let bar = creeps[0];
    for (let i of creeps) {
        if (i.hits < bar.hits) {
            bar = i
        }
    }
    return bar
}

