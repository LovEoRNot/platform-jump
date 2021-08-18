import getContext from "./src/getContext";
import Pencil from "./src/sprite/Pencil";
import Point from "./src/basic/Point";
import Angle from "./src/basic/Angle";
import Font from "./src/basic/Font";
import Player from "./src/sprite/Player";
import Scene from "./src/Scene";
import Platform from "./src/sprite/Platform";

const context = getContext("#platform");

const player = new Player(context, new Point(100, 900), 0, 1.0)
const scene = new Scene(context, player)

const platform = new Platform(context, new Point(50, 500), 200, 20, 'black', 6)
const platform2 = new Platform(context, new Point(80, 900), 200, 20, 'red', 3)


// scene.addElement(platform)
// scene.addElement(platform2)
