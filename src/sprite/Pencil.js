import Angle from "../basic/Angle";
import Point from "../basic/Point";
import Font from "../basic/Font";

const defaultColor = '#000'
const defaultType = 'fill'

export default class Pencil {
  constructor(context) {
    this.context = context;
  }

  resetColor(color) {
    this.context.strokeStyle = color;
    this.context.fillStyle = color;
  }

  /**
   * 绘制矩形
   * @param {Point} startPoint 起点坐标 {x, y}
   * @param {number} width 矩形宽
   * @param {number} height 矩形高
   * @param {string} color 颜色
   * @param {string} type 绘制方式，fill, stroke
   */
  rect(startPoint, width, height, color = defaultColor, type = defaultType) {
    const { x, y } = startPoint;
    this.resetColor(color)
    
    if (type === "stroke") {
      this.context.strokeRect(x, y, width, height);
    } else {
      this.context.fillRect(x, y, width, height);
    }
  }

  /**
   * 绘制线条
   * @param {array} pointArray 坐标点集合 [Point, Point]
   * @param {string} type 绘制方式，fill, stroke
   */
  lines(pointArray, color = defaultColor, type = defaultType) {
    this.context.beginPath();
    this.resetColor(color)
  
    const firstPoint = pointArray.shift();
    this.context.moveTo(firstPoint.x, firstPoint.y);
    pointArray.forEach((point) => {
      this.context.lineTo(point.x, point.y);
    });

    if (type === "stroke") {
      this.context.closePath()
      this.context.stroke();
    } else {
      this.context.fill();
    }
  }

  /**
   *
   * @param {Point} startPoint 起点坐标 {x, y}
   * @param {number} radius 圆弧半径
   * @param {Angle} startAngle 起始角度， Math.PI的倍数
   * @param {Angle} endAngle 结束角度， Math.PI的倍数
   * @param {string} color 颜色
   * @param {bool} anticlockwise 顺时针绘制或者逆时针绘制，false为逆时针
   * @param {string} type 绘制方式，fill, stroke
   */
  arc(
    startPoint,
    radius,
    startAngle,
    endAngle,
    color = "#fff",
    anticlockwise = true,
    type = "fill"
  ) {
    this.context.beginPath();
    this.resetColor(color)

    this.context.arc(
      startPoint.x,
      startPoint.y,
      radius,
      startAngle.getRadians(),
      endAngle.getRadians(),
      anticlockwise
    );
    if (type === "stroke") {
      this.context.stroke();
    } else {
      this.context.fill();
    }
  }

  /**
   * 
   * @param {Point} startPoint 起始坐标
   * @param {string} text 文本内容
   * @param {Font} font 文本样式
   * @param {string} color 文本颜色
   * @param {number?} maxWidth 文本最大宽度
   * @param {string} type 填充或是描边默认填充fill
   */
  text(startPoint, text, font, color = defaultColor, type = defaultType, maxWidth) {
    this.resetColor(color)

    this.context.font = font.font
    this.context.textAlign = font.textAlign
    this.context.textBaseLine = font.baseLine
    this.context.direction = font.direction

    if (type === 'fill') {
      this.context.fillText(text, startPoint.x, startPoint.y, maxWidth)
    } else {
      this.context.strokeText(text, startPoint.x, startPoint.y, maxWidth)
    }
  }
}
