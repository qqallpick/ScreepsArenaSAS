import { spawm as spawm1 } from './fight1Mode/spawm';
import { carry as carry1 } from './fight1Mode/carry';
import { fight as fight1 } from './fight1Mode/fight';
import { spawm as spawm2 } from './fight2Mode/spawm';
import { carry as carry2 } from './fight2Mode/carry';
import { fight as fight2 } from './fight2Mode/fight';
import { visual as visual2 } from './fight3Mode/visual';
import { spawm as spawm3 } from './fight3Mode/spawm';
import { carry as carry3 } from './fight3Mode/carry';
import { drop as drop3 } from './fight3Mode/drop';
import { work as work3 } from './fight3Mode/work';
import { fight as fight3 } from './fight3Mode/fight';
import { visual as visual3 } from './fight3Mode/visual';
import { spawm as spawm4 } from './fight4Mode/spawm';
import { carrier as carrier4 } from './fight4Mode/carrier';
import { attacker as attacker4 } from './fight4Mode/attacker';
import { worker as worker4 } from './fight4Mode/worker';
import { ranger as ranger4 } from './fight4Mode/ranger';
import { visual as visual4 } from './fight4Mode/visual';
import { spawm as spawm5 } from './fight5Mode/rush/spawm';
import { carrier as carrier5 } from './fight5Mode/rush/carrier';
import { attacker as attacker5 } from './fight5Mode/rush/attacker';
import { worker as worker5 } from './fight5Mode/rush/worker';
import { ranger as ranger5 } from './fight5Mode/rush/ranger';
import { visual as visual5 } from './fight5Mode/rush/visual';
import { spawm as spawm52 } from './fight5Mode/development/spawm';
import { carrier as carrier52 } from './fight5Mode/development/carrier';
import { dropouter as dropouter52 } from './fight5Mode/development/dropouter';
import { attacker as attacker52 } from './fight5Mode/development/attacker';
import { healer as healer52 } from './fight5Mode/development/healer';
import { worker as worker52 } from './fight5Mode/development/worker';
import { carryouter as carryouter52 } from './fight5Mode/development/carryouter';
import { ranger as ranger52 } from './fight5Mode/development/ranger';
import { visual as visual52 } from './fight5Mode/development/visual';
import { overmind } from './overMind';

export function runAction() {
    let mySpawn = getObjectsByPrototype(StructureSpawn).find(s => s.my);
    switch (mySpawn.fightMode) {
        case 1: run1Mode();
            break;
        case 2: run2Mode();
            break;
        case 3: run3Mode();
            break;
        case 4: run4Mode();
            break;
        case 5: run5Mode();
            break;
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

function run3Mode() {
    spawm3();
    carry3();
    drop3();
    work3();
    fight3();
    visual3();
}

function run4Mode() {
    spawm4();
    carrier4();
    worker4();
    ranger4();
    attacker4();
    visual4();
}

function run5Mode() {
    if (overmind.fightMode == 'rush') {
        spawm5();
        carrier5();
        worker5();
        ranger5();
        attacker5();
        visual5();
    }
    else if (overmind.fightMode == '??????') {
        spawm52();
        carrier52();
        carryouter52();
        dropouter52();
        worker52();
        ranger52();
        attacker52();
        healer52();
        visual52();
    }
}