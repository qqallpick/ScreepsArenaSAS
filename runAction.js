import { spawm as spawm1 } from './fight1Mode/spawm';
import { carry as carry1 } from './fight1Mode/carry';
import { fight as fight1 } from './fight1Mode/fight';
import { spawm as spawm2 } from './fight2Mode/spawm';
import { carry as carry2 } from './fight2Mode/carry';
import { fight as fight2 } from './fight2Mode/fight';
import { visual as visual2 } from './fight2Mode/visual';

export function runAction() {
    let mySpawn = getObjectsByPrototype(StructureSpawn).filter(s => s.my)[0];
    switch (mySpawn.fightMode) {
        case 1: run1Mode();
        case 2: run2Mode();
    }
}

function run1Mode() {
    spawm1();
    carry1();
    fight1();
}

function run2Mode() {
    spawm2();
    carry2();
    fight2();
    visual2();
}