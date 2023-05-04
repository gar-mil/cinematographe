# Cinématographe

**Cinématographe** is a React/Nextjs/GraphQL application that consumes the [OMDb API](https://www.omdbapi.com/) and displays information to the user about movies that they have searched for.

## Local Installation
Run the following commands in a terminal:

1. Clone this repository.
``` git clone https://github.com/gar-mil/cinematographe.git ```
2. Navigate to newly cloned repository.
``` cd cinematographe ```
3. Use NPM to install the application.
``` npm install ```
4. If necessary, run an audit fix in npm.
``` npm audit fix ```
5. Obtain an OMDb API key from [OMDb API](https://www.omdbapi.com/).
6. Create a local environment configuration file.
``` touch .env.local ```
7. Add the three required values to the .env.local file.
```
// .env.local
OMDB_KEY = "INSERT_YOUR_OMDB_API_KEY"
OMDB_URL = "https://www.omdbapi.com/?apikey="
BASE_URL = "http://localhost:3000/"
```
8. Start the application
``` npm run dev ```
9. In a browser, navigate to `http://localhost:3000/`. Note that this is http, not https, due to local SSL cert warnings.

# License
Cinématographe is licensed under the MIT License. Please see the [attached license file](https://github.com/gar-mil/Cinématographe/blob/main/LICENSE) for more information.
