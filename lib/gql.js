/**
 * getMediaGQL
 * Requests a 'getMedia' query from the OMDb API via GraphQL. getMedia is used to search for an individual movie by its IMDb ID.
 * @param {String} imdbIDEntry ID of the movie in the IMDb database
 * @returns {Object} GraphQL JSON object containing reply from OMDb
 */
export async function getMediaGQL(imdbIDEntry)
{
    const apiurl = new URL(process.env.BASE_URL+'api/graphql');
    return await fetch(apiurl, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({
        query: `
            query Query($imdbID: String!) {
                getMedia(imdbID: $imdbID) {
                    Title,
                    Year,
                    Rated,
                    Released,
                    Runtime,
                    Genre,
                    Director,
                    Writer,
                    Actors,
                    Plot,
                    Language,
                    Country,
                    Awards,
                    Poster,
                    Ratings {
                        Source,
                        Value
                    },
                    Metascore,
                    imdbRating,
                    imdbVotes,
                    imdbID,
                    Type,
                    DVD,
                    BoxOffice,
                    Production,
                    Website,
                    Response,
                    Error,
                    totalResults
                }
            }
            `,
        variables: {
            imdbID: imdbIDEntry,
        },
        }),
    })
        .then((res) => res.json())
}

/**
* getMediaTitleGQL
* Requests a 'getMediaTitle' query from the OMDb API via GraphQL. getMediaTitle is used to search for an individual movie by its name.
* @param {String} title Name of the movie
* @returns {Object} GraphQL JSON object containing reply from OMDb
*/
export async function getMediaTitleGQL(title)
{
    const apiurl = new URL(process.env.BASE_URL+'api/graphql');
    return await fetch(apiurl, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({
        query: `
            query Query($title: String!) {
                getMediaTitle(title: $title) {
                    Title,
                    Year,
                    Rated,
                    Released,
                    Runtime,
                    Genre,
                    Director,
                    Writer,
                    Actors,
                    Plot,
                    Language,
                    Country,
                    Awards,
                    Poster,
                    Ratings {
                        Source,
                        Value
                    },
                    Metascore,
                    imdbRating,
                    imdbVotes,
                    imdbID,
                    Type,
                    DVD,
                    BoxOffice,
                    Production,
                    Website,
                    Response,
                    Error,
                    totalResults
                }
            }
            `,
        variables: {
            title: title,
        },
        }),
    })
        .then((res) => res.json())
}

/**
* getMediaListGQL
* Requests a 'getMediaList' query from the OMDb API via GraphQL. getMediaList is used to search for a list of movies based on the provided search string.
* @param {String} title String which will be searched
* @param {Number} page Number representing which page of results to return (OMDb provides 10 results per page)
* @param {String} mType String used to filter what type of media to search for (valid values: <empty>, movie, series, episode)
* @returns {Object} GraphQL JSON object containing reply from OMDb
*/
export async function getMediaListGQL(title,page,mType)
{
    const pageString = page.toString();
    const apiurl = new URL(process.env.BASE_URL+'api/graphql');
    return await fetch(apiurl, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({
        query: `
            query Query($title: String!,$page: String!,$mType : String) 
            {
                getMediaList(title: $title,page: $page,mType: $mType) 
                {
                Media 
                {
                    Title,
                    Year,
                    Runtime,
                    imdbID,
                    Poster
                },
                Response,
                Error,
                totalResults
                }
            }
            `,
        variables: {
            title: title,
            page: pageString,
            mType: mType
        },
        }),
    })
        .then((res) => res.json());
}