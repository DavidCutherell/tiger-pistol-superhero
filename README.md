# Superhero React App

This is a React-based Superhero list application code challenge for Tiger Pistol. It allows users to view and search for superheroes in a list or grid view. The app uses TailwindCSS for styling and Webpack for bundling. It fetches superhero data from a remote JSON file.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Running the App](#running-the-app)
- [Building the App](#building-the-app)
- [Project Structure](#project-structure)
- [License](#license)

## Features
- View superheroes in both a list and grid format.
- Search functionality to filter superheroes by name, real name, or ID.
- Modal pop-up with detailed information about each superhero.
- Responsive design with TailwindCSS for a modern UI.

## Technologies Used
- **React**: A JavaScript library for building user interfaces.
- **TailwindCSS**: A utility-first CSS framework for fast UI development.
- **Webpack**: A module bundler for packaging JavaScript applications.
- **Babel**: A JavaScript compiler to convert ES6+ code into backward-compatible JavaScript.
- **PostCSS**: A tool for transforming CSS with plugins (used for TailwindCSS).

## Installation
To get started, clone the repository and install the required dependencies:

```bash
# Clone the repository
git clone https://github.com/DavidCutherell/tiger-pistol-superhero.git

# Navigate into the project directory
cd tiger-pistol-superhero

# Install dependencies
npm install
```

## Running the App 

```bash
# Start the development server
npm start
```

## Building the App
```bash
# Build the app
npm run build
```

## Project Structure

```bash
.
├── public/                   # Public files (index.html, images, etc.)
│   ├── data/                 # Local db (.json)
│   ├── images/               # Images used in the app
│   └── index.html            # Main HTML file
├── src/                      # Source files
│   ├── components/           # Reusable components (PunchRandom, etc.)
│   ├── constants/            # Constants for string literals
│   ├── css/                  # CSS files (styles.css)
│   ├── views/                # Application views (SuperheroListView, SuperheroGridView)
│       └── __tests__/        # Jest Tests for the views
│   ├── index.js              # Entry point of the application
│   └── App.js                # Main app component
├── .babelrc                  # Babel configuration
├── .gitignore                # Files and directories to be ignored by Git
├── jest.config.js            # Jest tests configuration
├── package.json              # Project dependencies and scripts
├── postcss.config.js         # PostCSS configuration for TailwindCSS
├── tailwind.config.js        # TailwindCSS configuration
└── webpack.config.js         # Webpack configuration
```

## License

This project is licensed under the MIT License. Feel free to use and modify it as needed.
