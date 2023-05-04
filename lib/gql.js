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