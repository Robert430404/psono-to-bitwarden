import { writeFile, readFile } from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { transformItem } from './src/transformers.js';
import { parseJsonLocation } from './src/commands.js';

let sourceFile;

try {
  sourceFile = parseJsonLocation(process.argv);
} catch (err) {
  console.error(`please provide -config=/file/path.json`, err);

  process.exit(1);
}

// Store the translated structures
const translatedFolders = [];
const translatedItems = [];

// Handles the folder structures
const handleFolder = (folder, prevFolderName) => {
  let name = folder.name;

  const items = folder.items;
  const uuid = uuidv4();

  if (prevFolderName) {
    name = `${prevFolderName}/${name}`;
  }

  translatedFolders.push({
    name,
    id: uuid,
  });

  items.forEach((item) => {
    const transformed = transformItem(item);

    transformed.folderId = uuid;

    translatedItems.push(transformed);
  });

  if (!folder.folders) {
    return;
  }

  folder.folders.forEach((folder2) => {
    handleFolder(folder2, name);
  });
};

const handleWrite = (err) => {
  if (err) {
    console.error('There was an error writing the file.', err);

    return;
  }

  console.log('Write completed successfully');
};

const handleRead = (err, data) => {
  if (err) {
    console.error('There was an error reading the psono file', err);

    return;
  }

  const parsed = JSON.parse(data);

  parsed.items.forEach((item) => {
    translatedItems.push(transformItem(item));
  });

  parsed.folders.forEach((folder) => {
    handleFolder(folder);
  });

  const translatedJSON = JSON.stringify({
    items: translatedItems,
    folders: translatedFolders,
  });

  console.log('starting write');

  writeFile('./bitwarden-import.json', translatedJSON, handleWrite);
};

console.log('Reading exported psono JSON');

readFile(sourceFile, 'utf8', handleRead);
