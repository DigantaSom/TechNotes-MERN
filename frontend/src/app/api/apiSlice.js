import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { setCredentials } from '../../features/auth/authSlice';

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:3500',
  credentials: 'include', // so we will always send our cookie (to have refresh token when needed)
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;

    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  // console.log(args) // request url, method, body
  // console.log(api) // signal, dispatch, getState()
  // console.log(extraOptions) //custom, like {shout: true}, else undefined

  let result = await baseQuery(args, api, extraOptions);

  // If you want, handle other status codes too
  if (result?.error?.status === 403) {
    console.log('Sending refresh token');

    // send refresh token to get new access token
    const refreshResult = await baseQuery('/auth/refresh', api, extraOptions);

    if (refreshResult?.data) {
      // store the new access token
      api.dispatch(setCredentials({ ...refreshResult.data }));

      // retry the original query with the new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      if (refreshResult?.error?.status === 403) {
        refreshResult.error.data.message = 'Your login has expired.';
      }
      return refreshResult;
    }
  }
  return result;
};

export const apiSlice = createApi({
  // baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3500' }),
  // baseQuery,
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Note', 'User'],
  endpoints: builder => ({}),
});
