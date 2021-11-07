import Redis from "ioredis";
import { promisify } from 'util';

const client = new Redis(
  Number(process.env.REDIS_PORT) || 6379,
  process.env.REDIS_HOST || '127.0.0.1'
);

client.on("error", function (error) {
  console.error("redis error: ", error);
});

export const hgetallAsync = promisify(client.hgetall).bind(client);

export const hgetAsync = (key: string, field: string) : Promise<string | null> => client.hget(key, field);
export const setAsync = promisify(client.set).bind(client);
export const getAsync = promisify(client.get).bind(client);
export const hsetAsync = (key: string, values: string[]) : Promise<number> => client.hset(key, values);

export const hdelAsync = (key: string, field: string) : Promise<boolean> => {
  return client.hdel(key, field).then(number => number > 0);
}

export const smembersAsync = (key : string) : Promise<string[]> => new Promise((resolve, reject) => {
  client.smembers(key, (err, result : string[]) =>
  {
    if (err){
      console.log("error is", err);
      reject(err);
      return;
    }
    
    resolve(result);
  }) 
});

export const setWithExpirationAsync = (key: string, value: string, timeInMinutes: number) => new Promise<any>((resolve, reject) => {
  client.set(key, value, 'EX', timeInMinutes * 60, (err, result) => {
    if (err) {
      reject(err);
      return;
    }

    resolve(result);
  })
});

export const saddAsync = (key: string, value: string) => new Promise((resolve, reject) => {
  client.sadd(key, value, (err, result) => {
    if (err) {
      reject(err);
      return;
    }

    resolve(result);
  })
})


export const sremAsync = (key: string, value: string) => new Promise((resolve, reject) => {
  client.srem(key, value, (err, result) => {
    if (err || result === 0) {
      reject(err);
      return;
    }

    resolve(result);
  });
});

export const delAsync = (key: string) => new Promise((resolve, reject) => {
  client.del(key, (err, result) => {
    if (err) {
      reject(err);
      return;
    }

    resolve(result);
  });
});

export const sismemberAsync = (key: string, member: string): Promise<boolean> => new Promise((resolve, reject) => {
  client.sismember(key, member, (err, result) => {
    if (err) {
      return reject(err);
    }

    resolve(result === 1)
  })
});