import { serverApi } from './serverApi';

const showMessageApi = serverApi.injectEndpoints({
  endpoints: (build) => ({
    showMessage: build.query({
      query: (body) => ({ url: 'message', method: 'GET', body }),
      
    }),
  }),
  overrideExisting: false,
});

export const { useShowMessageQuery } = showMessageApi;