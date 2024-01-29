let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["палиця"];

const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");
const weapons = [
  { name: "палиця", power: 5 },
  { name: "кинджал", power: 30 },
  { name: "молоток з кігтями", power: 50 },
  { name: "меч", power: 100 },
];
const monsters = [
  {
    name: "слиз",
    level: 2,
    health: 15,
  },
  {
    name: "ікластий звір",
    level: 8,
    health: 60,
  },
  {
    name: "дракон",
    level: 20,
    health: 300,
  },
];
const locations = [
  {
    name: "міська площа",
    "button text": [
      "Перейти до магазину",
      "Перейти до печери",
      "Бийся з драконом",
    ],
    "button functions": [goStore, goCave, fightDragon],
    text: 'Ви знаходитесь на міській площі. Ви бачите вивіску з написом "Магазин".',
  },
  {
    name: "магазин",
    "button text": [
      "Купити 10 здоров'я (10 золотих)",
      "Купити зброю (30 золотих)",
      "Йти на міську площу",
    ],
    "button functions": [buyHealth, buyWeapon, goTown],
    text: "Ви заходите до магазину.",
  },
  {
    name: "печера",
    "button text": [
      "Боротись зі слизом",
      "Боротись з ікластим звіром",
      "Вийти на міську площу",
    ],
    "button functions": [fightSlime, fightBeast, goTown],
    text: "Ви входите в печеру. Бачите  монстрів.",
  },
  {
    name: "боротьба",
    "button text": ["Атакувати", "Ухилитися", "Втекти"],
    "button functions": [attack, dodge, goTown],
    text: "Ви боретеся з монстром.",
  },
  {
    name: "вбити монстра",
    "button text": [
      "Йдіть на міську площу",
      "Йдіть на міську площу",
      "Йдіть на міську площу",
    ],
    "button functions": [goTown, goTown, goTown],
    text: 'Помираючи, монстр кричить "Агрр!". Ви отримуєте бали досвіду і знаходите золото.',
  },
];

// initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(location) {
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  text.innerText = location.text;
}

function goTown() {
  update(locations[0]);
}

function goStore() {
  update(locations[1]);
}

function goCave() {
  update(locations[2]);
}

function buyHealth() {
  if (gold >= 10) {
    gold -= 10;
    health += 10;
    goldText.innerText = gold;
    healthText.innerText = health;
  } else {
    text.innerText = "У вас недостатньо золота, щоб купити здоров'я.";
  }
}

function buyWeapon() {
  if (currentWeapon < weapons.length - 1) {
    if (gold >= 30) {
      gold -= 30;
      currentWeapon++;
      goldText.innerText = gold;
      let newWeapon = weapons[currentWeapon].name;
      text.innerText = "Тепер у вас є " + newWeapon + ".";
      inventory.push(newWeapon);
      text.innerText += " У вашому інвентарі є " + inventory;
    } else {
      text.innerText = "У вас недостатньо золота, щоб купити зброю.";
    }
  } else {
    text.innerText = "Ви вже маєте найпотужнішу зброю!";
    button2.innerText = "Продати зброю за 15 золотих";
    button2.onclick = sellWeapon;
  }
}

function sellWeapon() {
  if (inventory.length > 1) {
    gold += 15;
    goldText.innerText = gold;
    let currentWeapon = inventory.shift();
    text.innerText = "Ви продали " + currentWeapon + ".";
    text.innerText += " У вашому інвентарі є: " + inventory;
  } else {
    text.innerText = "Ви не можете продати свою єдину зброю!";
  }
}

function fightSlime() {
  fighting = 0;
  goFight();
}

function fightBeast() {
  fighting = 1;
  goFight();
}

function fightDragon() {
  fighting = 2;
  goFight();
}

function goFight() {
  update(locations[3]);
  monsterHealth = monsters[fighting].health;
  monsterStats.style.display = "block";
  monsterName.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;
}

function attack() {
  text.innerText = "Монстр - " + monsters[fighting].name + " атакує.";
  text.innerText +=
    " Ви атакуєте його своїм " + weapons[currentWeapon].name + ".";
  health -= monsters[fighting].level;
  monsterHealth -=
    weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;
  if (health <= 0) {
    lose();
  } else if (monsterHealth <= 0) {
    defeatMonster();
  }
}

function dodge() {
  text.innerText = "Ви ухиляєтеся від атаки з боку " + monsters[fighting].name;
}

function defeatMonster() {
  gold += Math.floor(monsters[fighting].level * 6.7);
  xp += monsters[fighting].level;
  goldText.innerText = gold;
  xpText.innerText = xp;
  update(locations[4]);
}

function lose() {}
