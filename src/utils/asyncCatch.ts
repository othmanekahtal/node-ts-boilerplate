import {Response, Request, NextFunction} from 'express'
// eslint-disable-next-line @typescript-eslint/ban-types
export default (fn: Function) =>
  (req: Request, res: Response, next: NextFunction) =>
    fn(req, res, next).catch(next)
