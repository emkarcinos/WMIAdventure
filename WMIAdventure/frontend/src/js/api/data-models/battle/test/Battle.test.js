import {battleFromData} from "../Battle";

const exampleData1 = {
    attacker: {
        id: 10,
        stats: {
            hp: 100.0,
            armour: 6.0
        },
        deck: [],
    },
    defender: {
        id: 152,
        stats: {
            hp: 25.2,
            armour: 2.2
        },
        deck: [],
    }
}

test("Create Battle", () => {
    const battle = battleFromData(exampleData1);
    expect(battle.user.id).toBe(exampleData1.attacker.id);
})