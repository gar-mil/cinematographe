/**
 * typeDefs for GraphQL. 
 * type Search: Data types for an OMDb bulk search operation.
 * type IndividualMedia: Data types for individual movie information (title and IMDb ID lookups). 
 * type ResponseInfo: Data types for generic OMDb response information (all queries).
 * type Sources: Data types for Ratings sub-information (child type of IndividualMedia).
 * See: https://www.apollographql.com/tutorials/fullstack-quickstart/02-building-a-schema
 */
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
    getMediaList(title: String!,page: String!,mType: String): Search
    getMedia(imdbID: String!): IndividualMedia
    getMediaTitle(title: String!): IndividualMedia
}`

/**
 * resolvers for GraphQL. 
 * getMediaList: OMDb bulk media search.
 * getMedia: OMDb single media lookup by IMDb ID.
 * getMediaTitle: OMDb single media lookup by name.
 * See: https://www.apollographql.com/docs/apollo-server/data/resolvers/
 */
export const resolvers = 
{
  Query: {
    getMediaList: async (_, args) => {
      try {
        let mTypeText = args.mType ? `&type=${args.mType}` : '';
        const URL = process.env.OMDB_URL+process.env.OMDB_KEY+`&s=${args.title}`+`&page=${args.page}${mTypeText}`;
        const mediaList = await fetch(URL);
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
        const URL = process.env.OMDB_URL+process.env.OMDB_KEY+`&i=${args.imdbID}&plot=full`;
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
    },
    getMediaTitle: async (_, args) => {
      try {
        const URL = process.env.OMDB_URL+process.env.OMDB_KEY+`&t=${args.title}`;
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