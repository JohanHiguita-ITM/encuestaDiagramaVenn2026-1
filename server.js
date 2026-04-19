require('module-alias/register');
require('dotenv').config();

const app = require('@root/app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});