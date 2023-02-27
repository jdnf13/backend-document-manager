import app from './app';
import './database';

app.listen(app.get('port'));
console.log(`This api runs on the port ${app.get('port')}`);