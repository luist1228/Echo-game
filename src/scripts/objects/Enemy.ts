import { Scene } from 'phaser'
import { CST } from '../CST'

export default class Enemy extends Phaser.Physics.Arcade.Sprite {
    
    speed: number
    scale: number
    hp: number
    scene: Phaser.Scene

    constructor(scene: Phaser.Scene, x: number, y: number, speed:number) {
        super(scene, x, y, CST.SPRITE.TEST.ENEMY)

        this.speed = speed
        this.scene = scene
        this.scale = 1
        this.setX(x)
        this.setY(y)
        this.setTexture("red-nigga")
        //this.setScale(this.scale)
        this.setDepth(1)

        this.scene.add.existing(this)
        this.scene.physics.world.enableBody(this);

        this.hp = 50
        
    }

    die() {
        this.destroy()
        console.log("I'm dead lol")
    }

    checkDeath() {
        if(this.hp <= 0) {
            this.die()
        }
    }

    receiveDamage(damage: number) {
        this.hp -= damage
        console.log('OUCH', this.hp)
        this.checkDeath()
    }

    

}