import { Visual } from 'game/visual'


export function visual() {
    //let mySpawn = getObjectsByPrototype(StructureSpawn).filter(s => s.my)[0];
    //new Visual().rect({ x: mySpawn.x - 10, y: mySpawn.y - 17 }, 20, 34, { opacity: 0.1 });

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