import { Request, Response } from 'express';

/** Database */
import payload from '../../../db/payload.json';

/** Models */
import { ICoworker } from '../../../models/Coworker';

const getCoworkerById = async (req: Request, res: Response) => {
  const coworkers = payload.data as ICoworker[];
  const id = Number(req.params.id);

  const coworker = {
    name: coworkers[id].name,
    text: coworkers[id].text,
    imagePortraitUrl: coworkers[id].imagePortraitUrl,
  };

  res.send(coworker);
};

export { getCoworkerById };
