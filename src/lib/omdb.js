export async function omdbHandler(params)
{
    try
    {
        // Ensure that the search type and value are strings
        params.type.toString();
        params.value.toString(); 
    }
    catch(e)
    {
        console.log(e);
        return false;
    }
    let omdbFetch = await fetch(process.env.OMDB_URL+process.env.OMDB_KEY+"&"+params.type+"="+params.value);
    let omdbData = await omdbFetch.text();
    return omdbData;
}
