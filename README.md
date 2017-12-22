## CLI Banner

Create boxes around strings - great for console printing

```sh
yarn add -D cli-banner
# or
npm install --save-dev cli-banner
```

## Module Usage

```js
const banner = require('cli-banner');
const options = {}

console.log(banner('hello world', options)));

// ┌──────────────────────────────────────────────────────────────────────────────┐
// │                                                                              │
// │                                 hello world                                  │
// │                                                                              │
// └──────────────────────────────────────────────────────────────────────────────┘
```

## CLI Usage

```sh
banner "hello world"

# ┌──────────────────────────────────────────────────────────────────────────────┐
# │                                                                              │
# │                                 hello world                                  │
# │                                                                              │
# └──────────────────────────────────────────────────────────────────────────────┘
```

## Options

| Property Name   | CLI Name       | Description                                           | Choices                                                                                                                                                                                                                | Default   |
| --------------- | -------------- | ----------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| `width`         | `width`        | Width of the banner (including borders)               | any `Number`, `"auto"`                                                                                                                                                                                                 | `80`      |
| `color`         | `color`        | Color of the test                                     | `"black"`, `"red"`, `"green"`, `"yellow"`, `"blue"`, `"magenta"`, `"cyan"`, `"white"`, `"gray"`, `"redBright"`, `"greenBright"`, `"yellowBright"`, `"blueBright"`, `"magentaBright"`, `"cyanBright"`, `"whiteBright"`, | `"white"` |
| `borderColor`   | `border-color` | Color of the border                                   | `"black"`, `"red"`, `"green"`, `"yellow"`, `"blue"`, `"magenta"`, `"cyan"`, `"white"`, `"gray"`, `"redBright"`, `"greenBright"`, `"yellowBright"`, `"blueBright"`, `"magentaBright"`, `"cyanBright"`, `"whiteBright"`, | `"white"` | `"white"` |
| `paddingLength` |                | Minimum amount of spaces on either side of the string |                                                                                                                                                                                                                        | `3`       |

## Docs

* **[Dependencies](docs/dependencies.md)** - overview of each `package.json` dependency
