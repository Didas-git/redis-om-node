export type RedisJSON = null | boolean | number | string | Date | Array<RedisJSON> | {
    [key: string]: RedisJSON;
    [key: number]: RedisJSON;
}