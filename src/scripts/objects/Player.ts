import { Scene } from "phaser"
import {CST} from '../CST'

export default class PlayerSprite extends Phaser.Physics.Arcade.Sprite{
    speed: number;
    constructor(scene: Phaser.Scene, x: number, y: number, speed:number){
        super(scene, x, y, CST.SPRITE.PLAYER)
        scene.add.existing(this)
        scene.physics.world.enableBody(this);
        this.setTexture("player")
        this.speed=speed
        this.setScale(0.6)
        this.setX(x)
        this.setY(y) 
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

    playerIdle(){
        this.play("idleHandgun",true)
    }
}