import path from 'path';
import fs from 'fs';

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import express from 'express';

import { renderToString } from '../../test-components/hydrate';


import App from '../src/App';

const PORT = process.env.PORT || 3006;
const app = express();

app.get('/', async (req, res) => {
  const app = ReactDOMServer.renderToString(<App />);


  const indexFile = path.resolve('./build/index.html');

  fs.readFile(indexFile, 'utf8', async (err, data) => {
    if (err) {
      console.error('Something went wrong:', err);
      return res.status(500).send('Oops, better luck next time!');
    }

    const renderedApp = data.replace('<div id="root"></div>', `<div id="root">${app}</div>`)
    const hydratedStencilApp = await renderToString(renderedApp);

    return res.send(hydratedStencilApp.html);
  });
});

app.use(express.static('./build'));

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});