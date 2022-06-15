import { Request, Response } from 'express';

/** Database */
import payload from '../../../db/payload.json';

/** Models */
import { ICoworker } from '../../../models/Coworker';

const getCoworkers = async (req: Request, res: Response) => {
  const start = Number(req.query.start);
  const end = Number(req.query.end);
  const filterString = req.query.filter as string;

  const coworkers = payload.data as ICoworker[];

  const shouldBePaginated = !!end && !filterString;
  const shouldBeFilteredByName = !!filterString && !end;
  const shouldBeFilteredAndPaginated = !!filterString && !!end;

  if (shouldBeFilteredByName) {
    const filteredByName = coworkers.filter((colleague) => {
      return colleague.name.includes(filterString);
    });

    const filteredPayload = {
      data: filteredByName,
      totalLength: payload.totalLength,
    }

    return res.send(filteredPayload);
  }

  if (shouldBePaginated) {
    const payloadPaginated = {
      data: coworkers.slice(start, end),
      totalLength: payload.data.length
    }

    return res.send(payloadPaginated);
  }

  if (shouldBeFilteredAndPaginated) {
    const filteredByName = coworkers.filter((colleague) => {
      return colleague.name.includes(filterString);
    });

    const payloadPaginated = {
      data: filteredByName.slice(start, end),
      totalLength: payload.data.length
    }

    return res.send(payloadPaginated);
  }

  res.send(payload);
};

export { getCoworkers };
