// ------------------ API avec Interface (avec extension) ------------------

import express, { Request, Response } from 'express';

const PORT: number= 3002;

// Définition de l'interface de base
interface Nombres {
  a: number,
  b: number;
}

const app = express();

app.use(express.json());

app.post('/add' , (req: Request, res: Response) => {
  const { a, b }:Nombres = req.body;
  return res.json({
    result: a + b,
  });

});

app.post('/soustraire' , (req: Request, res: Response) => {
  const {a, b}:Nombres = req.body;
  return res.json({
    result: a-b,
  });

});

app.post('/multi' , (req: Request, res: Response) => {
  const {a, b}:Nombres = req.body;
  return res.json({
    result: a*b,
  });

});

app.post('/divide' , (req: Request, res: Response) => {
  const {a, b}:Nombres = req.body;
  return res.json({
    result: a/b,
    modulo: a%b,
  });

});

app.listen(PORT, ()=> {
  console.log(`Serveur de la calculatrice sur le port ${PORT}`);
});



