An NPM package which scans a given directory for the inclusion of AWS keys.

## Requires

Node 8+

## Installation

1. Install package

   ```sh
   npm install --save-dev scan-for-secrets
   ```

2. Add the script to package.json with the directory in which you want to scan for keys
   ```js
   {
     "scripts" : {
       "scan-for-secrets": "scan-for-secrets <directory-to-scan>",
       ...
     }
     ...
   }
   ```

3. Add to pre-commit hook in package.json (optional)
    ```js
    {
        "pre-commit": [
          "scan-for-secrets"
        ],
    }
    ```
