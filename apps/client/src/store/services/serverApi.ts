import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Created a serverApi
// The serverApi creates a new api with a base URL
export const serverApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3333' }),
  endpoints: () => ({}),
});
