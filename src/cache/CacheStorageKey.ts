/**
 * Cache storages have their own names, called CacheStorageKey.
 * The name "global" means that the operation occurs with all cache storages that are located in the specified keyspace.
 * */
export type CacheStorageKey = string | 'global'
