import './importAll';

export function fightMode() {
    let mySpawn = getObjectsByPrototype(StructureSpawn).filter(s => s.my)[0];
    //选择战斗模式
    //mySpawn.fightMode = 1，泥头车模式
    //mySpawn.fightMode = 2，一体机蜂群模式
    //mySpawn.fightMode = 3，修围墙模式
    //mySpawn.fightMode = 4，测试模式
    mySpawn.fightMode = 4
}