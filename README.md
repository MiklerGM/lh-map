# LH-Map-Project

Interactive atlas of popular languages

## Install and Run

```bash
# Install dependencies with
npm i
# To start backend
npm run server
# Serve frontend in with webpack-dev-server
npm run start

```

### Troubleshooting 

node-canvas dependencies for Windows

Check wiki for the first steps
* https://github.com/Automattic/node-canvas/wiki/Installation:-Windows

In case python is not present in the system and you've got an error executing `npm i` try

```bash
npm install --global --production windows-build-tools
```

For the following error
```
canvas.vcxproj(20,3): error MSB4019: The imported project "C:\Microsoft.Cpp.Default.props" was not found. Confirm that the path in the <Import> declaration is correct, and that the file exists on disk.
```

Environment variable should set accordingly to MSBuild version
```
VCTargetsPath=C:\Program Files (x86)\MSBuild\Microsoft.Cpp\v4.0\v140
```

## Color for deck.gl geojson layer

---

|               | rgba            | rendered        |
|---------------|-----------------|-----------------|
| stroke        | (128, 206, 206) |                 |
| fill          | (240, 248, 250) | (198, 203, 205) |
| fill selected | (217,66, 102)   | (167, 64, 90)   |
| fill white    | (255,255,255)   | (204 204 204)   |
