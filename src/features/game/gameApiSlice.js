import { apiSlice } from "../../app/api/apiSlice";

const gameSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getGames: builder.query({
      query: () => ({
        url: "/game/getGames",
        method: "GET",
      }),
      providesTags: ["Games"],
    }),
    createGame: builder.mutation({
      query: (credentials) => ({
        url: "/game/createGame",
        method: "POST",
        body: { ...credentials },
      }),
      invalidatesTags: ["Games"],
    }),
    getData: builder.mutation({
      query: (credentials) => ({
        url: `/game/getGame/${credentials.id}`,
        method: "GET",
      }),
      // invalidatesTags: ["Games"],
    }),
    getOneGame: builder.query({
      query: (credentials) => ({
        url: `/game/getGame/${credentials.id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateGameMutation,
  useGetGamesQuery,
  useGetDataMutation,
  useGetOneGameQuery,
} = gameSlice;
