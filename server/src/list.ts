import cors from 'cors';
import express from 'express';
import expressWinston from 'express-winston';
import winston from 'winston';

import * as item from './routes/item';

const app = express();

app.set('port', process.env.PORT || 3000);

app.use(cors());
app.use(expressWinston.logger({
  transports: [
    new winston.transports.Console()
  ],
  format: winston.format.combine(
    winston.format.json()
  ),
}));
app.use(express.json());

app.get('/api/items', item.findAll);
app.get('/api/item/:id', item.findById);
app.post('/api/item', item.addItem);

app.put('/api/item/:id', item.updateItem);
app.delete('/api/item/:id', item.deleteItem);

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
