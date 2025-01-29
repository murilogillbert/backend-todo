const bcrypt = require('bcryptjs');

async function testHash() {
  const password = "123456";
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  console.log("Senha original:", password);
  console.log("Senha hashada:", hashedPassword);

  const isMatch = await bcrypt.compare(password, hashedPassword);
  console.log("Senha válida?", isMatch);
}

testHash();
