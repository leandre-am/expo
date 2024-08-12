import ExpoFileSystem from './ExpoFileSystem';
export class File extends ExpoFileSystem.FileSystemFile {
    constructor(path) {
        super(path);
        this.validatePath();
    }
}
export class Directory extends ExpoFileSystem.FileSystemDirectory {
    constructor(path) {
        super(path);
        this.validatePath();
    }
    list() {
        // We need to wrap it in the JS File/Directory classes, and returning SharedObjects in lists is not supported yet on Android.
        return super
            .listAsRecords()
            .map(({ isDirectory, path }) => (isDirectory ? new Directory(path) : new File(path)));
    }
}
// consider module functions as API alternative
export async function write(file, contents) {
    return file.write(contents);
}
export async function download(url, to) {
    // We need to wrap it in the JS File class, and returning SharedObjects is not supported yet on iOS.
    const outputPath = await ExpoFileSystem.download(url, to);
    return new File(outputPath);
}
//# sourceMappingURL=FileSystem.js.map