export function getMediaGQL(imdbIDEntry)
{
    const apiurl = new URL(process.env.BASE_URL+'api/graphql');
    fetch(apiurl, {
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
        .then((result) => document.getElementById("getMediaGQLDiv").innerHTML = JSON.stringify(result, null, 2));
}

export function getMediaListGQL(title,page)
{
    const apiurl = new URL(process.env.BASE_URL+'api/graphql');
    fetch(apiurl, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({
        query: `
            query Query($title: String!,$page: String!) {
                getMediaList(title: $title,page: $page) {
                Media {
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
            page: page
        },
        }),
    })
        .then((res) => res.json())
        .then((result) => document.getElementById("getMediaListGQLDiv").innerHTML = JSON.stringify(result, null, 2));
}