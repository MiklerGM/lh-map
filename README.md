#LH-Project


##Color for deck.gl geojson layer
---

|               | rgba            | rendered        |
|---------------|-----------------|-----------------|
| stroke        | (128, 206, 206) |                 |
| fill          | (240, 248, 250) | (198, 203, 205) |
| fill selected | (217,66, 102)   | (167, 64, 90)   |
| fill white    | (255,255,255)   | (204 204 204)   |





# Установка зависимостей для node-canvas под Windows

Информация из их вики
* https://github.com/Automattic/node-canvas/wiki/Installation:-Windows

История похода по граблям

Если при `npm i` появляется ошибка с python
`npm install --global --production windows-build-tools`

```
canvas.vcxproj(20,3): error MSB4019: The imported project "C:\Microsoft.Cpp.Default.props" was not found. Confirm that the path in the <Import> declaration is correct, and that the file exists on disk.
```

То необходимо установить переменную в соответствии с положением и версией MSBuild
`VCTargetsPath=C:\Program Files (x86)\MSBuild\Microsoft.Cpp\v4.0\v140`


## Babel 7

["@babel/plugin-transform-runtime",  { "polyfill": false, "regenerator": true }],


ERROR in ./server/server.js
Module build failed (from ./node_modules/babel-loader/lib/index.js):
Error: [BABEL] /mnt/c/Users/Dmitriy/Documents/lh-project/server/server.js:
As of v7.0.0-beta.55, we've removed Babel's Stage presets.
Please consider reading our blog post on this decision at
https://babeljs.io/blog/2018/07/27/removing-babels-stage-presets
for more details. TL;DR is that it's more beneficial in the
  long run to explicitly add which proposals to use.

For a more automatic migration, we have updated babel-upgrade,
https://github.com/babel/babel-upgrade to do this for you with
"npx babel-upgrade".

If you want the same configuration as before:

{
  "plugins": [
    // Stage 0
    "@babel/plugin-proposal-function-bind",

    // Stage 1
    "@babel/plugin-proposal-export-default-from",
    "@babel/plugin-proposal-logical-assignment-operators",
    ["@babel/plugin-proposal-optional-chaining", { "loose": false }],
    ["@babel/plugin-proposal-pipeline-operator", { "proposal": "minimal" }],
    ["@babel/plugin-proposal-nullish-coalescing-operator", { "loose": false }],
    "@babel/plugin-proposal-do-expressions",

    // Stage 2
    ["@babel/plugin-proposal-decorators", { "legacy": true }],
    "@babel/plugin-proposal-function-sent",
    "@babel/plugin-proposal-export-namespace-from",
    "@babel/plugin-proposal-numeric-separator",
    "@babel/plugin-proposal-throw-expressions",

    // Stage 3
    "@babel/plugin-syntax-dynamic-import",
    "@babel/plugin-syntax-import-meta",
    ["@babel/plugin-proposal-class-properties", { "loose": false }],
    "@babel/plugin-proposal-json-strings"
  ]
}



If you're using the same configuration across many separate projects,
keep in mind that you can also create your own custom presets with
whichever plugins and presets you're looking to use.

module.exports = function() {
  return {
    plugins: [
      require("@babel/plugin-syntax-dynamic-import"),
      [require("@babel/plugin-proposal-decorators"), { "legacy": true }],
      [require("@babel/plugin-proposal-class-properties"), { "loose": false }],
    ],
    presets: [
      // ...
    ],
  };
};


"@babel/plugin-syntax-dynamic-import",
