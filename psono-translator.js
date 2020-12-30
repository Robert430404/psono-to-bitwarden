import { writeFile, readFile, readFileSync } from 'fs'
import { exit } from 'process'
import { v4 as uuidv4 } from 'uuid'
import { transformItem } from './transformers.js'

// Initialize the config
let config

// Load the config or fail
try {
  config = JSON.parse(readFileSync('./config.json', 'utf8'))
} catch (err) {
  console.error('could not read config.json, did you set it up?', err)

  exit
}

// Store the translated structures
const translatedFolders = []
const translatedItems = []

// Handles the folder structures
const handleFolder = (folder, prevFolderName) => {
  let name = folder.name

  const items = folder.items
  const uuid = uuidv4()

  if (prevFolderName) {
    name = `${prevFolderName}/${name}`
  }

  translatedFolders.push({
    name,
    id: uuid,
  })

  items.forEach(item => {
    const transformed = transformItem(item)

    transformed.folderId = uuid

    translatedItems.push(transformed)
  })

  if (!folder.folders) {
    return
  }

  folder.folders.forEach(folder2 => {
    handleFolder(folder2, name)
  })
}

const handleWrite = (err) => {
  if (err) {
    console.error('There was an error writing the file.', err)

    return
  }

  console.log('Write completed successfully')
}

const handleRead = (err, data) => {
  if (err) {
    console.error('There was an error reading the psono file', err)

    return
  }

  const parsed = JSON.parse(data)

  parsed.items.forEach(item => {
    translatedItems.push(transformItem(item))
  })

  parsed.folders.forEach(folder => {
    handleFolder(folder)
  })

  const translatedJSON = JSON.stringify({
    items: translatedItems,
    folders: translatedFolders,
  })

  console.log('starting write')

  writeFile('./bitwarden-import.json', translatedJSON, handleWrite)
}

console.log('Reading exported psono JSON')

readFile(config.sourceFile, 'utf8', handleRead)
