import './importAll';

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
            (p) => p.exists && !p.my
        );
        for (const obstacle of obstacles) {
            costmatrix.set(obstacle.x, obstacle.y, 255);
        }

    }
    for (const prototype of obstacleEnemyPrototypesCreep) {
        let obstacles = getObjectsByPrototype(prototype).filter(
            (p) => p.exists && !p.my  //我方单位不算255
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

//判断对象是否具有攻击性
export function canCreepAttck(creep) {
    let jieguo = false
    for (let bodymix of creep.body) {
        if (bodymix.type == 'attack') {
            jieguo = true
            break;
        } else if (bodymix.type == 'ranged_attack') {
            jieguo = true
            break;
        } else {
            jieguo = false
        }
    }
    return jieguo
}

//判断对象是否已经出生
export function isCreepBirth(creep) {
    let jieguo = true
    let mySpawn = getObjectsByPrototype(StructureSpawn).find(s => s.my);
    let enemySpawn = getObjectsByPrototype(StructureSpawn).find(s => !s.my);
    if (creep.my) {
        if (creep.x == mySpawn.x && creep.y == mySpawn.y) {
            jieguo = false
        }
    }
    else if (!creep.my) {
        if (creep.x == enemySpawn.x && creep.y == enemySpawn.y) {
            jieguo = false
        }
    }
    return jieguo
}

//判断某个pos点上是否有creep
export function isHaveCreep(pos) {
    let creep = getObjectsByPrototype(Creep).find(s => s.x == pos.x && s.y == pos.y);
    if (creep) {
        return true
    }
    else {
        return false
    }
}

//判断creep的位置是不是pos的位置
export function isonthePos(creep, pos) {
    if (creep.x == pos.x && creep.y == pos.y) {
        return true
    } else {
        return false
    }
}