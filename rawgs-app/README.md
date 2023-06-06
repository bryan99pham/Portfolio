## RAWGS App
This is a game discovery app based on the [RAWG](https://rawg.io/) website and the free tier of its [API](https://api.rawg.io/docs/). The reasons why I wanted to work on this project was because I didn't have much experience with CSS and the modern/minimalistic design of the [RAWG](https://rawg.io/) website had very satisfying features and animations that I want to be capable of producing on my own. With a combination of React/Typescript and Vite, my teammate (Giovanni Lituma) and I are proud to have accomplished our goals with this project. Through pure CSS, I could now create simple but eye-catching animations using the transform property and ::before/::after selectors. Features include:
- View through all games in the RAWG database (350,000+ games)
- Search for a specific game
- Scroll through pages with pagination feature
- Hover over a game "card" to view more details about the game
- WIP: click on game title to view full details about the game.

## Technologies
- Vite 4.3.2
- React 18.2.0
- [RAWG Website](https://rawg.io/) and [RAWG API](https://api.rawg.io/docs/)
- Deployed on Render (https://rawgs-app.onrender.com/)

## Competencies
### JF 2.3
Can develop effective user interfaces
- Using CSS grids and flex, a clean UI layout was created. Additional CSS allowed the inclusion of smooth size scaling and color animations when hovering over different elements on the screen to improve UX. Getting the apropriate effects for the animations required research on CSS basics and the observation of many popular websites such as Apple's and Tesla's. With the knowledge I've gained from this project, I plan on improving the UX of my current project at work.

### JF 2.7
Effectively manages state for complex User Interfaces
- The rendering of the grid of cards when the user uses the search bar was based on this state that I created: "const [searchResults, setSearchResults] = useState<Array<Game>>([]);" , in which Game is a custom model/interface that contains properties such as the title, game image, release date, etc. Conditional rendering is then used whenever the user hits enter on the search bar: "(searchResults.length > 0 ? searchResults : games)". Managing state helped our team create a functional search feature, pagination, and switching between pages by accessing the state as it dynamically changes to render what is requested by the user.

## Table of Contents

- [Installation](#installation)
- [Developers](#contributing)
- [License](#license)

## Installation

- Request an API key from https://rawg.io/apidocs (requires signup)
- Create a file named ".env" and in that file, set VITE_RAWG_API_KEY equal to the API key that you received.
+ Example: VITE_RAWG_API_KEY = 123213213213123213213213

You have two choices to build/run this app:
- 1. using pnpm
- 2. using Docker

#### Using pnpm

- Run command: git clone https://github.com/VZ-Devs/rawgs-app.git
- Run command: npm install -g pnpm
- Run command: pnpm i
- Run command: pnpm run dev

#### Using Docker
- Install [Docker Desktop](https://www.docker.com/products/docker-desktop/)
```
from the root directory, run the following command:
    docker compose up
```

# Developers
- [@bryan99pham](https://github.com/bryan99pham)
- [@giovannixdev](https://github.com/giovannixdev)
- [@crybyte](https://github.com/crybyte)

## License

[Information about the project's license and any applicable terms or restrictions]
