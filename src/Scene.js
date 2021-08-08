import Point from "./basic/Point"
import { getCanvasWidthAndHeight } from "./getContext"
import Sprite from "./sprite/Sprite"

export default class Scene extends Sprite {
  /**
   * @param {CanvasRenderingContext2D} context
   * @param {Sprite} player 
   */
  constructor(context, player) {
    super(context)
    this.sprites = []
    this.player = player
    this.update()
  }

  /**
   * @param {Sprite} sprite 
   */
  addElement(sprite) {
    this.sprites.push(sprite)
  }

  draw(width, height) {
    this.pencil.rect(new Point(0, 0), width, height, '#aaa')
  }

  update() {
    const { width, height } = getCanvasWidthAndHeight()
    this.context.clearRect(0, 0, width, height)
    // 绘制背景
    this.draw(width, height)
    // 绘制角色
    this.player.draw()
    // 绘制其他元素
    this.sprites.forEach(sprite => {
      sprite.draw()
      if (this.player.isCollided(sprite)) {
        this.player.stop()
        // sprite.stop()
      } else {
        this.player.start()
        // sprite.start()
      }
    })
    window.requestAnimationFrame(() => {
      this.update()
    })
  }
}