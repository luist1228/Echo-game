import { Scene } from 'phaser'
import { CST } from '../CST'

export default class Enemy extends Phaser.Physics.Arcade.Sprite {
    
    speed: number
    scale: number

    constructor(scene: Phaser.Scene, x: number, y: number, speed:number) {
        super(scene, x, y, CST.SPRITE.TEST.ENEMY)

        this.speed = speed
        this.scale = 1
        this.setX(x)
        this.setY(y)
        this.setTexture("enemy")
        this.setScale(this.scale)
        this.setDepth(1)

        scene.add.existing(this)
        scene.physics.world.enableBody(this);
        
    }

    

}