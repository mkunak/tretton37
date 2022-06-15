import { Request, Response } from 'express';

/** Database */
import payload from '../../../db/payload.json';

const editCoworker = async (req: Request, res: Response) => {
  const { id, ...rest } = req.body;

  payload.data[id].name = rest.name;
  payload.data[id].city = rest.city;
  payload.data[id].text = rest.text;

  res.send({});
};

export { editCoworker };
