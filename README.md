# Project Title: Autocomplete Component

This project is a simple React Autocomplete component. Cat breeds fetched from [CatAPI](https://developers.thecatapi.com/) are used for the demo.

## Overview

The main purpose of this application is to build a real world usable Autocomplete component with minimal styling and prestine functionality. We utilize hooks, data fetching, fuzzy searching, and debouncing. 

## How It Works

1. **Fetching data from the API**: We use a custom hook, `useApiFetch`, to fetch a list of cat breeds from the CatAPI.

2. **Debouncing**: We use a debounce function to limit the number of API requests made by our application. Debouncing ensures that a function (in this case, our search function) will not be called again until a certain amount of time has passed since the last call was made.

3. **Fuzzy Searching**: We employ a fuzzy search algorithm to provide more lenient and user-friendly search functionality. Fuzzy search allows us to find matches that are approximately equal to the search string, which is beneficial for handling minor typos or spelling discrepancies.

4. **Filtering**: We use a `useFilter` hook to filter the list of cat breeds based on the user's search query. 

## How to Run the Project

1. **Clone the repository**

```bash
git clone https://github.com/kunoacc/autocomplete-lib.git
```

2. **Navigate into the directory**

```bash
cd autocomplete-lib
```

3. **Install the dependencies**

```bash
pnpm install
```

4. **Start the development server**

```bash
pnpm start
```

By default, the development server will run on `localhost:5173`.

## Technologies Used

- React
- TypeScript
