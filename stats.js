import './importAll';
import { canCreepAttck, isCreepBirth } from './utils';

export function stats() {
    let mySpawn = getObjectsByPrototype(StructureSpawn).filter(s => s.my)[0];
    switch (mySpawn.fightMode) {
        case 1: run1Mode();
            break;
        case 2: run2Mode();
            break;
        case 3: run3Mode();
            break;
        case 4: run4Mode();
            break;
    }
}

function run1Mode() {
    let mySpawn = getObjectsByPrototype(StructureSpawn).filter(s => s.my)[0];
    let enemyCreeps = getObjectsByPrototype(Creep).filter(s => !s.my);
    let myCreeps = getObjectsByPrototype(Creep).filter(s => s.my);

    //负责显示状态，具体实现在各个模块里面
    console.log("马作的卢飞快")
    console.log("游戏时间：", getTicks(), "ticks")
    console.log("战术模式：", mySpawn.fightMode)
    console.log("基地位置：", mySpawn.ramPos)
    console.log("战争状态：", mySpawn.warStats)
    console.log("敌人接近：", mySpawn.isCloseCreeps)
    console.log("我方数量：", myCreeps.length)
    console.log("敌人数量：", enemyCreeps.length)

}

function run2Mode() {
    let mySpawn = getObjectsByPrototype(StructureSpawn).filter(s => s.my)[0];
    let enemyCreeps = getObjectsByPrototype(Creep).filter(s => !s.my);
    let myCreeps = getObjectsByPrototype(Creep).filter(s => s.my);

    //负责显示状态，具体实现在各个模块里面
    console.log("马作的卢飞快")
    console.log("游戏时间：", getTicks(), "ticks");
    console.log("战术模式：", mySpawn.fightMode)
    console.log("基地位置：", mySpawn.ramPos)
    console.log("战争状态：", mySpawn.warStats)
    console.log("敌人接近：", mySpawn.isCloseCreeps)
    console.log("我方数量：", myCreeps.length)
    console.log("敌人数量：", enemyCreeps.length)

}

function run3Mode() {
    let mySpawn = getObjectsByPrototype(StructureSpawn).filter(s => s.my)[0];
    let enemyCreeps = getObjectsByPrototype(Creep).filter(s => !s.my);
    let myCreeps = getObjectsByPrototype(Creep).filter(s => s.my);

    //负责显示状态，具体实现在各个模块里面
    console.log("马作的卢飞快")
    console.log("游戏时间：", getTicks(), "ticks");
    console.log("战术模式：", mySpawn.fightMode)
    console.log("基地位置：", mySpawn.ramPos)
    console.log("长城位置：", mySpawn.buildGreatWallLine)
    console.log("战争状态：", mySpawn.warStats)
    console.log("敌人接近：", mySpawn.isCloseCreeps)
    console.log("我方数量：", myCreeps.length)
    console.log("敌人数量：", enemyCreeps.length)

}

function run4Mode() {
    let mySpawn = getObjectsByPrototype(StructureSpawn).filter(s => s.my)[0];
    let enemyCreeps = getObjectsByPrototype(Creep).filter(s => !s.my);
    let myCreeps = getObjectsByPrototype(Creep).filter(s => s.my);
    //负责显示状态，具体实现在各个模块里面
    console.log("马作的卢飞快")
    console.log("游戏时间：", getTicks(), "ticks");
    console.log("战术模式：", mySpawn.fightMode)
    console.log("基地位置：", mySpawn.ramPos)
    console.log("战争状态：", mySpawn.warStats)
    console.log("我方数量：", myCreeps.length)
    console.log("敌人数量：", enemyCreeps.length)
}