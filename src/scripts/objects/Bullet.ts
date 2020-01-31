import { Scene } from 'phaser'
import {CST} from '../CST'

export default class Bullet extends Phaser.Physics.Arcade.Sprite{

    speed: number
    scale: number

    constructor(
                scene: Phaser.Scene, 
                x: number, y: number, 
                speed: number, 
                sprite: string, 
                scale: number){

        super(scene, x, y, sprite)
        
        this.scale = scale
        this.setTexture("bullet")
        this.setScale(this.scale)
        scene.add.existing(this)
        scene.physics.world.enableBody(this);
        this.setX(x)
        this.setY(y)
        this.speed = speed
        this.setDepth(1)

    }

    fire(x: number, y: number) {
        this.body.reset(x, y);
        this.setActive(true);
        this.setVisible(true);
    }

    disappear() {
        
    }

}