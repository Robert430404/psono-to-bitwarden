# Psono To Bitwarden

This is a simple translation script for moving passwords and notes from
psono password manager to bitwarden.

## Setup

Clone the repository to your local machine and install the dependencies
with the following command:

```bash
npm ci
```

## Execution

Run the script with node like this

```bash
node index.js -config=/file/location.json
```

The script will output some status messages or errors if there are problems.

It should put the bitwarden import file at `bitwarden-import.json`.
