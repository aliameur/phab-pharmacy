'use client';

import algoliasearch from 'algoliasearch/lite';

import { env } from '../env.mjs';

const searchClient = algoliasearch(
  env.NEXT_PUBLIC_SEARCH_APP_ID,
  env.NEXT_PUBLIC_SEARCH_API_KEY,
);

const SEARCH_INDEX_NAME = env.NEXT_PUBLIC_INDEX_NAME;

export { searchClient, SEARCH_INDEX_NAME };
