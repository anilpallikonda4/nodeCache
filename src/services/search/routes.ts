import { Request, Response } from "express";
import { getPlacesByName } from "./SearchController";
import { checkSearchParams } from "../../middleware/checks";
import { prepareCache } from "../../middleware/nodeCache";

export default [
  {
    path: "/api/v1/search",
    method: "get",
    handler: [
      checkSearchParams,
      async ({ query }: Request, res: Response) => {
        const result = await getPlacesByName(query.q);
        res.status(200).send(result);
      }
    ]
  },
  {
    path: "/testing",
    method: "get",
    handler: [
      //checkSearchParams,
      prepareCache,
      async ({ query }: Request, res: Response) => {
       // const result = await getPlacesByName(query.q);
        //res.status(200).send('Working fine');
      }
    ]
  },
  {
    path: "/getPatientService",
    method: "get",
    handler: [
      //checkSearchParams,
      prepareCache,
      async ({ query }: Request, res: Response) => {
       // const result = await getPlacesByName(query.q);
        //res.status(200).send('Working fine');
      }
    ]
  }
];
