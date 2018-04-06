import * as fs from 'fs';
import { promisify } from 'util';
import * as express from 'express';
import { NodeLoader } from 'aurelia-loader-nodejs';
import { initialize } from 'aurelia-pal-nodejs';
import { DOM, PLATFORM } from 'aurelia-pal';
import { resolve } from 'path';

import { bootstrap } from './bootstrapper';
import { configure } from './index';

const readFile = promisify(fs.readFile);
const templateUrl = resolve(__dirname, '../dist/index.html');
let template: string;

if (process.env.NODE_ENV === 'production') {
  template = fs.readFileSync(templateUrl, 'utf-8');
}

async function render(html) {
  if (!template) {
    template = await readFile(templateUrl, 'utf-8');
  }
  return template.replace(
    '<div id="root"></div>',
    `<div id="root">${html}</div>`,
  );
}

const app = express().use(express.static(resolve(__dirname, '../dist')));

app.use(async (req, res, next) => {
  try {
    // start aurelia
    const host = DOM.createElement('div');
    const loader = new NodeLoader();
    const aurelia = await bootstrap(host, initialize, loader);
    await configure(aurelia);

    // render html
    const html = render(host.innerHTML);
    res.send(html);
  } catch (e) {
    next(e);
  }
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
