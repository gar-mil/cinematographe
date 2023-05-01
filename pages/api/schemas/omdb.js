export const typeDefs = `
type  Search 
{
  Response: String
  Error: String
  totalResults: String
  Media: [IndividualMedia]
}

type  IndividualMedia
{
  Title: String!
  Year: String
  Rated: String
  Released: String
  Runtime: String
  Genre: String
  Director: String
  Writer: String
  Actors: String
  Plot: String
  Language: String
  Country: String
  Awards: String
  Poster: String
  Ratings: [Sources]
  Metascore: String
  imdbRating: String
  imdbVotes: String
  imdbID: String
  Type: String
  DVD: String
  BoxOffice: String
  Production: String
  Website: String
  Response: String
  Error: String
  totalResults: String
}

type  ResponseInfo
{
  Response: String
  Error: String
  totalResults: String
}

type  Sources
{
    Source: String
    Value: String
}

type  Query 
{
    getMediaList(title: String!,page: String!): Search
    getMedia(imdbID: String!): IndividualMedia
}`

export const resolvers = 
{
  Query: {
    getMediaList: async (_, args) => {
      try {
        const mediaList = await fetch(process.env.OMDB_URL+process.env.OMDB_KEY+`&s=${args.title}`+`&page=${args.page}`);
        const mediaListJson = await mediaList.json();
        const response = {
          Response: mediaListJson.Response,
          Error: mediaListJson.Error,
          totalResults: mediaListJson.totalResults,
          Media: mediaListJson.Search
        };
        return response;
      } catch (e) {
        throw e;
      }
    },
    getMedia: async (_, args) => {
      try {
        const URL = process.env.OMDB_URL+process.env.OMDB_KEY+`&i=${args.imdbID}`;
        const media = await fetch(URL);
        const mediaJson = await media.json();
        return {
            Title: mediaJson.Title,
            Year: mediaJson.Year,
            Rated: mediaJson.Rated,
            Released: mediaJson.Released,
            Runtime: mediaJson.Runtime,
            Genre: mediaJson.Genre,
            Director: mediaJson.Director,
            Writer: mediaJson.Writer,
            Actors: mediaJson.Actors,
            Plot: mediaJson.Plot,
            Language: mediaJson.Language,
            Country: mediaJson.Country,
            Awards: mediaJson.Awards,
            Poster: mediaJson.Poster,
            Ratings: mediaJson.Ratings,
            Metascore: mediaJson.Metascore,
            imdbRating: mediaJson.imdbRating,
            imdbVotes: mediaJson.imdbVotes,
            imdbID: mediaJson.imdbID,
            Type: mediaJson.Type,
            DVD: mediaJson.DVD,
            BoxOffice: mediaJson.BoxOffice,
            Production: mediaJson.Production,
            Website: mediaJson.Website,
            Response: mediaJson.Response,
            Error: mediaJson.Error,
            totalResults: mediaJson.totalResults
        };
      } catch (e) {
        throw e;
      }
    }
  }
};