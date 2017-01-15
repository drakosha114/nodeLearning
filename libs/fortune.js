const fortunes = [
    'Предсказание 1',
    'Предсказание 2',
    'Предсказание 3',
    'Предсказание 4',
    'Предсказание 5',
    'Предсказание 6',
    'Предсказание 7',
    'Предсказание 8',
    'Предсказание 9',
    'Предсказание 10',
    'Предсказание 11'
];

const _getRandomFortune = () => fortunes[Math.floor(Math.random() * fortunes.length)];

exports.getFortune = () => _getRandomFortune();