# Psono To Bitwarden

This is a simple translation script for moving passwords and notes from
psono password manager to bitwarden.

## Setup

Copy `config.examples.json` to `config.json` and update the sourceFile
path to point to your exported Psono file.

Install the dependencies with `npm ci`.

## Execution

Run the script with node like this

```bash
node psono-translator.js
```

The script will output some status messages or errors if there are problems.

It should put the bitwarden import file at `bitwarden-import.json`.