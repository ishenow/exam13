const mongoose = require('mongoose');
const config = require('./config');
const { nanoid } = require('nanoid');

const User = require('./models/User');
const Place = require('./models/Place');

const run = async () => {
  await mongoose.connect(config.database, config.databaseOptions);

  const connection = mongoose.connection;

  const collections = await connection.db.collections();

  for (let collection of collections) {
    await collection.drop();
  }

  const users = await User.create({
    username: 'admin',
    password: '123',
    displayName: 'Adminov Admin',
    role: 'admin',
    token: nanoid(),
  }, {
    username: 'user',
    password: '123',
    displayName: 'Userov User',
    role: 'user',
    token: nanoid(),
  });

  await Place.create(
    {
      user: users[0]._id,
      title: '12 Bar',
      desc: '12 Bar - бар элитного типа с исключительной концепцией, высоким уровнем обслуживания и авторской кухней. «Бар 12» расположен на 12 и 13 этаже бизнес-центра недалеко от бульвара Эркиндик. В баре большой ассортимент спиртных напитков и коктейлей, в меню — европейская кухня и суши. Бар открыт с шести вечера до шести утра.',
      image: '12bar.jpg',
    },
    {
      user: users[1]._id,
      title: 'Монгол',
      desc: 'Кухня восточная, европейская Средний счет 800–1200 сом на человека Количество мест 150 мест',
      image: 'mongol.jpg',
    },
  );

  return connection.close();
};

run().catch(e => {
  console.log(e);
});
