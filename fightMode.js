import './importAll';

export function fightMode() {
    let mySpawn = getObjectsByPrototype(StructureSpawn).filter(s => s.my)[0];
    //选择战斗模式
    //mySpawn.fightMode = 1，泥头车模式
    //mySpawn.fightMode = 2，一体机蜂群模式
    //mySpawn.fightMode = 3，修围墙模式
    //mySpawn.fightMode = 4，红球rush模式
    //mySpawn.fightMode = 5，战术自动选择模式，测试
    mySpawn.fightMode = 4
}