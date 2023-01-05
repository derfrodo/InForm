module.exports = {
    transform: {
        "^.+\\.[t|j]s?$": "babel-jest",
    },
    moduleNameMapper: {
        "^@src/(.*)$": "<rootDir>/src/$1",
    },
    coveragePathIgnorePatterns: [
        "<rootDir>/.*.generated.*$",
        "<rootDir>/.*.generated.ts$",
        "<rootDir>/node_modules/",
    ],
    watchPathIgnorePatterns: [
        "<rootDir>/.*.generated.*$",
        "<rootDir>/.*.generated.ts$",
        "<rootDir>/node_modules/",
    ],
};
