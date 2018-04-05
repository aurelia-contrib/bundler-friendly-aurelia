import * as express from 'express';

const app = express().use(express.static('dist'));

app.use((req, res, next) => {
  // render html
  res.send('html here');
});

app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`);
});
