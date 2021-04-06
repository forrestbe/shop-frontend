import { PAGINATION_QUERY } from '../components/Pagination';

export default function PaginationField(): any {
  return {
    keyArgs: false, // Tells Apollo we will take care of everything
    read(existing = [], { args, cache }) {
      const { skip, first } = args;
      const data = cache.readQuery({ query: PAGINATION_QUERY });
      const count = data?._allProductsMeta?.count;
      const page = skip / first + 1;
      const pages = Math.ceil(count / first);
      const items = existing.slice(skip, skip + first).filter(item => item);
      if (items.length !== first) {
        // We dont have any items, we must go to the network to fetch them
        return false;
      }
      // If there are items, just return them from the cache
      if (items.length) {
        console.log('There are items in the cache');
        return items;
      }
    },
    merge(existing, incoming, { args }) {
      const { skip } = args;
      console.log(`Merging items from the network ${incoming.length}`);
      const merged = existing ? existing.slice(0) : [];
      for (let i = skip; i < skip + incoming.length; ++i) {
        merged[i] = incoming[i - skip];
      }
      console.log({ merged });
      return merged;
    }
  }
}
