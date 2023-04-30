import { omdbHandler } from '@lib/omdb.js'

export async function getTitleData(title)
{
    return (await omdbHandler({'type':'t','value':title}));
}