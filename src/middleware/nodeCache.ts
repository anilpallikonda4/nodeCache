import { Request, Response, NextFunction } from "express";
import { HTTP400Error } from "../utils/httpErrors";
const axios = require('axios');
let mcache = require('memory-cache'); //npm install memory-cache

export const prepareCache = (    
  req: Request,
  res: Response,  
  next: NextFunction
) => {
  if (req) {
    let key = '__KEY__' + req.originalUrl || req.url;      
    let cacheBody = mcache.get(key);   
   // console.log('Get key Here',mcache.get(key));    
    if(cacheBody){     
      console.log('Coming From Cache');           
      res.status(200).json(cacheBody);   
      return
    }else{      
        console.log('Coming From actual api');      
        axios.get("https://api.neoscan.io/api/main_net/v1/get_all_nodes")
        .then((data:any) => {               
          mcache.put(key, data.data, 36000);                
          res.status(200).json(data.data);          
      })
        .catch((err:any) => next(err));                          
    }
      next();    
  } else {      
    throw new HTTP400Error("Missing q parameter");
  }
};
