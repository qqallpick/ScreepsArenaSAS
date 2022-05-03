import '../../importAll'
import { isCreepBirth, canCreepAttck } from '../../utils';

/**
*增加障碍物cost
*@param {*} costmatrix
*@returns
*/
export function setobstaclegoto(costmatrix) {
    let obstaclePrototypes = [
        StructureSpawn,
        StructureExtension,
        StructureTower
    ];
    let obstacleEnemyPrototypes = [StructureRampart, StructureWall]
    let obstacleEnemyPrototypesCreep = [Creep]
    let obstacleMyPrototypesCreep = [Creep]
    //敌方单位的cost
    for (const prototype of obstacleEnemyPrototypesCreep) {
        let obstacles = getObjectsByPrototype(prototype).filter(
            (p) => isCreepBirth(p) && canCreepAttck(p) && !p.my  //我方单位不算255
        );
        for (const obstacle of obstacles) {
            costmatrix.set(obstacle.x, obstacle.y, 10)
        }
    }

    //我方单位的cost
    for (const prototype of obstacleMyPrototypesCreep) {
        let obstacles = getObjectsByPrototype(prototype).filter(
            (p) => p.my  //我方单位算255
        );
        for (const obstacle of obstacles) {
            for (let x = obstacle.x - 5; x <= obstacle.x + 5; x++) {
                for (let y = obstacle.y - 5; y <= obstacle.y + 5; y++) {
                    if (getRange(obstacle, { x: x, y: y }) == 0) {
                        if (costmatrix.get(x, y) < 255) {
                            costmatrix.set(x, y, 255)
                        }
                    }
                }
            }
        }
    }

    //不可通过建筑255
    for (const prototype of obstaclePrototypes) {
        let obstacles = getObjectsByPrototype(prototype).filter(
            (p) => p.exists
        );
        for (const obstacle of obstacles) {
            costmatrix.set(obstacle.x, obstacle.y, 255);
        }
    }
    //半可通过建筑rampart，原则上255
    for (const prototype of obstacleEnemyPrototypes) {
        let obstacles = getObjectsByPrototype(prototype).filter(
            (p) => (p.exists && (p.my == false || p.my == undefined))
        );
        for (const obstacle of obstacles) {
            costmatrix.set(obstacle.x, obstacle.y, 254);
        }
    }
    //自然墙255
    for (let x = 0; x < 100; x++) {
        for (let y = 0; y < 100; y++) {
            if (getTerrainAt({ x: x, y: y }) == 1) {
                costmatrix.set(x, y, 255);
            }
            //自然沼泽把已经有的数值/2+1
            if (getTerrainAt({ x: x, y: y }) == 2) {
                costmatrix.set(x, y, costmatrix.get(x, y) + 5);
            }
            //自然路把已有的数值/2+1
            if (getTerrainAt({ x: x, y: y }) == 0) {
                costmatrix.set(x, y, costmatrix.get(x, y) + 1);
            }
        }
    }

    return costmatrix;
}
