module.exports = {
    transform: {
        "^.+\\.[t|j]s?$": "babel-jest",
    },
    moduleNameMapper: {
        "^@src/(.*)$": "<rootDir>/src/$1",
    },
};
