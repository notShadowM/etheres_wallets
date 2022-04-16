
const app = require('./app');

app.listen(app.get('PORT'), () => {
  console.log(`running on http://localhost:${app.get('PORT')}`);
});