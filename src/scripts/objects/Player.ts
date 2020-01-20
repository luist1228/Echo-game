import { Scene } from "phaser"
import {CST} from '../CST'

export default class PlayerSprite extends Phaser.Physics.Arcade.Sprite{
    speed: number;
    scale: number;
    playerfeet:Phaser.Physics.Arcade.Sprite;
    constructor(scene: Phaser.Scene, x: number, y: number, speed:number){
        super(scene, x, y, CST.SPRITE.PLAYER)
        this.scale=0.6
        this.setTexture("player")
        this.setScale(this.scale)
        scene.add.existing(this)
        scene.physics.world.enableBody(this);
        this.setX(x)
        this.setY(y)
        this.speed=speed
        this.setDepth(1)

    }

    moveUp(){
        this.setVelocityY(-this.speed)
    }
    moveDown(){
        this.setVelocityY(this.speed)
    }
    moveLeft(){
        this.setVelocityX(-this.speed)
    }
    moveRight(){
        this.setVelocityX(this.speed)
    }

}