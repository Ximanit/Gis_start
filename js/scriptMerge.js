const fs = require("fs");

// Прочитаем первый JSON файл
const file1 = fs.readFileSync("Cafes2_.json");
const data1 = JSON.parse(file1);

// Прочитаем второй JSON файл
const file2 = fs.readFileSync("кафе_.json");
const data2 = JSON.parse(file2);

// Объединим два объекта в один
const mergedData = Object.assign({}, data1, data2);

// Преобразуем объединенный объект в JSON
const json = JSON.stringify(mergedData, null, 2);

// Сохраним JSON в файл
fs.writeFileSync("merged.json", json);
