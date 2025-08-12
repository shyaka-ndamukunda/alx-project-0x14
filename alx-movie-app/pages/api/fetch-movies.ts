// pages/api/fetch-movies.ts
import { MoviesProps } from "@/interfaces";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method === "POST") {
    const { year, page, genre } = request.body;
    const date = new Date();
    try {
      const resp = await fetch(
        `https://moviesdatabase.p.rapidapi.com/titles?year=${
          year || date.getFullYear()
        }&sort=year.decr&limit=12&page=${page}&${genre && `genre=${genre}`}`,
        {
          headers: {
            "x-rapidapi-host": "moviesdatabase.p.rapidapi.com",
            "x-rapidapi-key": process.env.MOVIE_API_KEY as string,
          },
        }
      );

      if (!resp.ok) {
        // Log the full response for debugging
        const errorText = await resp.text();
        console.error(`API Error: ${resp.status} - ${errorText}`);
        throw new Error("Failed to fetch movies from the API");
      }

      const moviesResponse = await resp.json();
      const movies: MoviesProps[] = moviesResponse.results;

      return response.status(200).json({
        movies,
      });
    } catch (err: any) {
      console.error(err);
      return response.status(500).json({ error: err.message });
    }
  } else {
    response.setHeader("Allow", ["POST"]);
    response.status(405).end(`Method ${request.method} Not Allowed in here`);
  }
}
