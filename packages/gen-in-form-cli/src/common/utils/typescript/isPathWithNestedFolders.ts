export function isPathWithNestedFolders(pathToTest: string): boolean {
    return pathToTest.lastIndexOf("/") > 0 || pathToTest.indexOf("\\") > 0;
}
