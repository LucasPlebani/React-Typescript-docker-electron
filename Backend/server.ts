import http from 'http';
import app from './app';
import { connectDB } from './config/database';
import cors from 'cors';

app.use(cors());
// Connexion à la base de données
connectDB();

const normalizePort = (val: string | number): number => {
    const port = parseInt(val.toString(), 10);

    if (isNaN(port)) {
        return 3000; // port par défaut
    }
    if (port >= 0) {
        return port;
    }
    return 3000;
};

const port = normalizePort(process.env.PORT || 3000);
app.set('port', port);

const errorHandler = (error: NodeJS.ErrnoException): void => {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const address = server.address();
    const bind = typeof address === 'string' 
        ? 'pipe ' + address 
        : 'port: ' + port;
    
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges.');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use.');
            process.exit(1);
            break;
        default:
            throw error;
    }
};

const server = http.createServer(app);

server.on('error', errorHandler);
server.on('listening', () => {
    const address = server.address();
    const bind = typeof address === 'string' 
        ? 'pipe ' + address 
        : 'port ' + port;
    console.log('Listening on ' + bind);
});

server.listen(port); 