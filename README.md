If you have some experience designing an iOS App, you’ll be familiar with the minimum sizes for typography (24px+, optimal for reading: 32px), buttons (44px to 88px) and navigation bar (72px to 98px). It’s also in line with Android devices.



 Animating path

 http://bl.ocks.org/nbremer/bf3d285e48189507e0ea

 http://bl.ocks.org/nbremer/25e2db4abc9eaf080190

 https://gist.github.com/reinson/97c4cd077ac39c29148e223d15ac89a5

 https://www.visualcinnamon.com/2016/01/animating-dashed-line-d3.html

 requirments:

  - low on resources
  - universal
  - neato


 - [] сделать флаги на таймлайн и


[directional arrow](http://bl.ocks.org/veltman/2ffca9dfddbfe67dc8e70a08fa429d6b)  -

[](https://stackoverflow.com/questions/43853980/can-i-get-a-point-along-an-svg-path-without-rendering-it)


[Curve Types]( http://bl.ocks.org/emmasaunders/raw/c25a147970def2b02d8c7c2719dc7502/ )
[Strock Dash Animation](https://bl.ocks.org/mbostock/5649592)


 - Selectы для тайлайна
 -цсс
 - респонсив главная страничка

 - callback

 посмотреть как можно ли таймлайн отображать
 (скрыть часть элементов)

 - сделать в лэндинге видео лайтбоксом?
 https://www.w3schools.com/howto/howto_js_lightbox.asp


#Year Input

https://github.com/facebook/react/issues/1549


#Carousel
https://blog.alexdevero.com/create-simple-carousel-react-js/


##Code Splitting
https://hackernoon.com/impress-your-friends-with-code-splitting-in-react-9f9a3ca2ae6e


#D3 react canvas notes

graph component distinct from calculation
data calculation doing outside the graph component
if user interaction does mutate data: propagate from parents, calculate in componentWillRecieveProps
if interaction does not mutate data: set state in component, calculate in render

http://bl.ocks.org/micahstubbs/52b01b0152547c74196a4f960df3e6e8

fetch => https://medium.com/@zimrick/how-to-create-pure-react-svg-maps-with-topojson-and-d3-geo-e4a6b6848a98

react-map-gl staticmap https://github.com/uber/react-map-gl/blob/master/src/components/static-map.js

zoom and scale -> https://github.com/mapbox/mapbox-gl-js/issues/5658

.beginPath

drag and zoom -> https://bl.ocks.org/mbostock/2b534b091d80a8de39219dd076b316cd


const create = (name, age) => {
  return { name: name, age: age};
};
const getAge = (person) => {return person.age};
const getName = (person) => {return person.name};





 -[] проекции. посмотреть хотя бы меркатор
 -[] привязка тултипа к коорд, not fixed x,y bullshit. это вообще хз, улчше прост вырубать тултипы по хендлерам
 -[] анимация path. экспедиывьажф. animation loop?
 -[] имплементация в админке 1/2
 -[] Clip shit



https://www.reddit.com/r/javascript/comments/3f7rx5/been_interviewing_with_a_lot_of_tech_startups_as/


[DeckGl layer lifecycle](https://github.com/uber/deck.gl/blob/master/docs/advanced/layer-lifecycle.md)


https://medium.com/@Scarysize/the-moving-city-visualizing-public-transport-877f581ca96e
https://twitter.com/Scarysize/status/865923290287747072
https://blog.mapbox.com/fast-geodesic-approximations-with-cheap-ruler-106f229ad016

https://twitter.com/Scarysize THIS CRAZY GUY


[geoPath + Canvas](https://bl.ocks.org/mbostock/3783604)
[animated path](http://bl.ocks.org/rveciana/502db152b70cddfd554e9d48ee23e279)


http://andyshora.com/tweening-shapes-paths-d3-js.html


http://codetheory.in/controlling-the-frame-rate-with-requestanimationframe/


test rFA performance on naked reaact page

