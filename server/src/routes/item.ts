import { Request, Response } from 'express';
import { Item } from '../models/item.model';

const items: Item[] = [
  {
    id: 1,
    name: 'Cucumber',
    price: 12,
    description: 'Cucumber is a summer vegetable, with elongate shape. Its skin is of a green colour, turning into yellow in maturation. At present, it is found in the European markets all over the year. Fresh or pickled cucumbers are also available.',
    complete: false,
    updatedAt: Date.now(),
  },
  {
    id: 2,
    name: 'Tomato',
    price: 15,
    description: 'Tomato, (Solanum lycopersicum), flowering plant of the nightshade family (Solanaceae), cultivated extensively for its edible fruits. Labelled as a vegetable for nutritional purposes, tomatoes are a good source of vitamin C and the phytochemical lycopene. The fruits are commonly eaten raw in salads, served as a cooked vegetable, used as an ingredient of various prepared dishes, and pickled. Additionally, a large percentage of the worlds tomato crop is used for processing; products include canned tomatoes, tomato juice, ketchup, puree, paste, and “sun-dried” tomatoes or dehydrated pulp.',
    complete: false,
    updatedAt: Date.now(),
  },
  {
    id: 3,
    name: 'Orange',
    price: 12,
    description: 'The orange is a hybrid between pomelo (Citrus maxima) and mandarin (Citrus reticulata). The chloroplast genome, and therefore the maternal line, is that of pomelo. The sweet orange has had its full genome sequenced.',
    complete: false,
    updatedAt: Date.now(),
  }
];

let id = 4;

/*
* GET items listing.
*/
export const findAll = function(req: Request, res: Response) {
  res.status(200).json(items);
};

/*
* GET item by identifier.
*/
export const findById = function(req: Request, res: Response) {
  res.status(404).json({ error: 'Not found' });
};

/*
* Create a item.
*/
export const addItem = function(req: Request, res: Response) {
  let data = {
    id: id,
    description: req.body.description,
    name: req.body.name,
    price: req.body.price,
    complete: req.body.complete,
    updatedAt: Date.now(),
  }
  items.push(data);
  id++;
  res.status(201).json(data);
};

/*
* Update a item by its identifier.
*/
export const updateItem = function(req: Request, res: Response) {
  items.forEach(item => {
    if(item.id == parseInt(req.params.id)) {
      item.complete = !item.complete;
    }
  });
  res.status(200).end();
};

/*
* Delete item
*/
export const deleteItem = function(req: Request, res: Response) {
  for (let i = 0; i < items.length; i++) {
    if (items[i].id == parseInt(req.params.id)) {
      items.splice(i, 1);
    }
  }
  res.status(204).end();
  return;
};
