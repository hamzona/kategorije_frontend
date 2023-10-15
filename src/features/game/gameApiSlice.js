import { apiSlice } from "../../app/api/apiSlice";

const gameSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getGames: builder.mutation({
      query: (credentials) => ({
        url: "/game/getGames",
        method: "POST",
        body: { ...credentials },
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

    findGame: builder.mutation({
      query: (credentials) => ({
        url: `/game/findGame`,
        method: "POST",
        body: { ...credentials },
      }),
      // invalidatesTags: ["Games"],
    }),
  }),
});

export const {
  useCreateGameMutation,
  useGetGamesMutation,
  useGetDataMutation,
  useGetOneGameQuery,
  useFindGameMutation,
} = gameSlice;
