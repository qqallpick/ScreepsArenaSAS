import { Visual } from 'game/visual'


export function visual() {
    //安全区
    //配合修墙重新规划
    let mySpawn = getObjectsByPrototype(StructureSpawn).filter(s => s.my)[0];
    if (mySpawn.ramPos == "左侧" && mySpawn.buildGreatWallLine != undefined) {
        if (mySpawn.buildGreatWallLine > mySpawn.y) {
            new Visual().rect({ x: mySpawn.x - 4, y: mySpawn.y - 45 }, 11, mySpawn.buildGreatWallLine, { opacity: 0.1 });
        }
        else {
            new Visual().rect({ x: mySpawn.x - 4, y: mySpawn.buildGreatWallLine }, 11, (99 - mySpawn.buildGreatWallLine), { opacity: 0.1 });
        }
    }
    else if (mySpawn.ramPos == "右侧" && mySpawn.buildGreatWallLine != undefined) {
        if (mySpawn.buildGreatWallLine > mySpawn.y) {
            new Visual().rect({ x: mySpawn.x - 7, y: mySpawn.y - 54 }, 11, mySpawn.buildGreatWallLine, { opacity: 0.1 });
        }
        else {
            new Visual().rect({ x: mySpawn.x - 7, y: mySpawn.buildGreatWallLine }, 11, (99 - mySpawn.buildGreatWallLine), { opacity: 0.1 });
        }
    }

    //队长标记
    let allinoner_teamLeader_all = getObjectsByPrototype(Creep).filter(s => s.type == "allinoner" && s.teamLeader == true);
    if (allinoner_teamLeader_all.length > 0) {
        for (let allinonermix of allinoner_teamLeader_all)
            new Visual().rect({ x: allinonermix.x - 0.5, y: allinonermix.y - 0.5 }, 1, 1, { opacity: 0.5, fill: '#FF6A6A' });//红色
    }
    //队员标记
    let allinoner_teamNow = getObjectsByPrototype(Creep).filter(s => s.type == "allinoner" && s.teamLeader == false && s.teamNow == true);
    if (allinoner_teamNow.length > 0) {
        for (let allinonermix of allinoner_teamNow)
            new Visual().rect({ x: allinonermix.x - 0.5, y: allinonermix.y - 0.5 }, 1, 1, { opacity: 0.5, fill: '#458B00' });//绿色
    }
    //非队员标记
    let allinoner_notInTeam = getObjectsByPrototype(Creep).filter(s => s.type == "allinoner" && s.teamLeader == false && s.teamNow == false);
    if (allinoner_notInTeam.length > 0) {
        for (let allinonermix of allinoner_notInTeam)
            new Visual().rect({ x: allinonermix.x - 0.5, y: allinonermix.y - 0.5 }, 1, 1, { opacity: 0.5, fill: '#1C1C1C' });//黑色
    }
}