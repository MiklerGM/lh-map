#LH-Project

У языков выбранных, для прямоугольников цвета
geojson layer colors:
line - #80CECE
fill - #F0F8FA
fill select
В десктоп варианте у менюшек всех нет границ, только тени со всех сторон. Цвет кнопок #C1332F



|               | rgba            | rendered        |
|---------------|-----------------|-----------------|
| stroke        | (128, 206, 206) |                 |
| fill          | (240, 248, 250) | (198, 203, 205) |
| fill selected | (217,66, 102)   | (167, 64, 90)   |
| fill white    |  (255,255,255)  | (204 204 204)   |





# Установка зависимостей для node-canvas под Windows

Информация из их вики
https://github.com/Automattic/node-canvas/wiki/Installation:-Windows

История похода по граблям

Если при `npm i` появляется ошибка с python
`npm install --global --production windows-build-tools`

```
canvas.vcxproj(20,3): error MSB4019: The imported project "C:\Microsoft.Cpp.Default.props" was not found. Confirm that the path in the <Import> declaration is correct, and that the file exists on disk.
```

То необходимо установить переменную в соответствии с положением и версией MSBuild
`VCTargetsPath=C:\Program Files (x86)\MSBuild\Microsoft.Cpp\v4.0\v140`
