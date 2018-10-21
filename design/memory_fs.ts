export interface IFileSystem {
    // TODO: more methods here
    copy(item: IDirectoryItem, dest: IDirectoryItem): void;
    move(item: IDirectoryItem, dest: IDirectory): void;
    changeDirectory(directory: IDirectory): void;
    listDirectory(directory: IDirectory): void;
    workingDirectory(): IDirectory;
}

export interface IDirectory extends IDirectoryItem {
    listing(): IDirectoryItem[];
    addDirectoryItem(item: IDirectoryItem): void;
    createFile(name: string, contents: string): IFile;
    createDirectory(name: string): IDirectory;
    rename(oldName: string, newName: string): void;
    remove(name: string): void;
}

export interface IFile extends IDirectoryItem {
    getContents(): string;
    getExtension(): string | undefined;
    setContents(contents: string): void;
}

export interface IDirectoryItem {
    name: string;
    parent: IDirectory | null;
    copy(): IDirectoryItem;
    getCreated(): Date;
    getPath(): string;
    getSize(): number;
}

abstract class DirectoryItem implements IDirectoryItem {
    public name: string;
    public parent: IDirectory | null;
    private created: Date;

    public constructor(name: string, parent: IDirectory | null) {
        this.name = name;
        this.parent = parent;
        this.created = new Date();
    }

    public abstract getSize(): number;

    public abstract copy(): IDirectoryItem;

    public getCreated() {
        return this.created;
    }

    public getPath() {
        const parentPath = this.parent != null ? this.parent.getPath() : "";
        return `${parentPath}/${name}`;
    }
}

export class FileObject extends DirectoryItem implements IFile {
    public constructor(name: string, parent: IDirectory, private contents: string) {
        super(name, parent);
    }

    public copy() {
        return new FileObject(this.name, this.parent!, this.contents);
    }

    public getContents() {
        return this.contents;
    }

    public getExtension() {
        return this.name.split(".")[1];
    }

    public getSize() {
        return this.contents.length;
    }

    public setContents(contents: string) {
        this.contents = contents;
    }
}

export class Directory extends DirectoryItem implements IDirectory {
    private items: IDirectoryItem[];

    public constructor(name: string, parent: IDirectory | null) {
        super(name, parent);
        this.items = [];
    }

    public listing() {
        return this.items;
    }

    public createFile(name: string, contents: string): IFile {
        const newFile = new FileObject(name, this, contents);
        this.items.push(newFile);
        return newFile;
    }

    public createDirectory(name: string): IDirectory {
        const created = new Directory(name, this);
        this.items.push(created);
        return created;
    }

    public addDirectoryItem(item: IDirectoryItem) {
        item.parent = this;
        this.items.push(item);
    }

    public copy() {
        const copyDir = new Directory(this.name, this.parent);
        this.items.forEach(item => {
            copyDir.addDirectoryItem(item.copy());
        });
        return copyDir;
    }

    public rename(oldName: string, newName: string) {
        const oldItem = this.items.find(item => item.name === oldName);
        if (oldItem != null) {
            oldItem.name = newName;
        }
    }

    public remove(name: string) {
        const index = this.items.findIndex(item => item.name === name);
        if (index >= 0) {
            this.items.splice(index, 1);
        }
    }

    public getSize() {
        let total = 0;
        this.items.forEach(item => total += item.getSize());
        return total;
    }
}

export class FileSystem implements IFileSystem {
    private root: IDirectory;
    private currentDirectory: IDirectory;

    public constructor() {
        this.root = new Directory("", null);
        this.currentDirectory = this.root;
    }

    public copy(item: IDirectoryItem, dest: IDirectory) {
        dest.addDirectoryItem(item.copy());
    }

    public move(item: IDirectoryItem, dest: IDirectory) {
        if (item.parent != null) {
            item.parent.remove(item.name);
            dest.addDirectoryItem(item);
        }
    }

    public changeDirectory(directory: IDirectory) {
        this.currentDirectory = directory;
    }

    public listDirectory() {
        return this.currentDirectory.listing();
    }

    public workingDirectory() {
        return this.currentDirectory;
    }
}
