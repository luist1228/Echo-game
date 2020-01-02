import FpsText from '../objects/fpsText'
import {CST} from '../CST'
import PlayerSprite from '../objects/Player'
import Bullet from '../objects/Bullet'
import Enemy from '../objects/Enemy'

export default class MainScene extends Phaser.Scene {

  fpsText: Phaser.GameObjects.Text
  public player: PlayerSprite
  public enemy: Enemy
  keyboard!: any
  bounds: Phaser.GameObjects.Components.GetBounds
  bullets: any
  reticle: Phaser.Physics.Arcade.Sprite
  
  constructor() {
    super({ key: CST.SCENES.PLAY})
  }
  preload(){
    this.load.image("bullet","assets/shot-1.png")
    console.log(this.textures.list)
  }
  
  create() {
    const canvas = this.sys.canvas
    canvas.style.cursor = 'none'
    this.reticle = this.physics.add.sprite(200, 200, 'bullet').setScale(4);
    this.player = new PlayerSprite(this,100,100,350).setSize(177,130).setOffset(35,65)
    this.enemy = new Enemy(this, 500, 500, 350).setSize(200, 200).setImmovable(true).setCollideWorldBounds(true)
    this.player.playerfeet.setSize(10,10).setOffset(50,77)
    
    //keyboard
    this.keyboard=this.input.keyboard.addKeys({
      'up': Phaser.Input.Keyboard.KeyCodes.W, 
      'down': Phaser.Input.Keyboard.KeyCodes.S,
      'right' : Phaser.Input.Keyboard.KeyCodes.D,
      'left':Phaser.Input.Keyboard.KeyCodes.A,
    });
    this.player.playerfeet.play("feetRun");
    this.bullets = this.physics.add.group({
      defaultKey: 'bullet',
      maxSize: 20,
    })
    // para usar la clase Bullet hay que pasarle como argumento un objeto CreateGroupConfig

    //Texto Fps
    this.fpsText = new FpsText(this)

    this.physics.add.collider(this.enemy, this.bullets, this.enemyHit)



    /// Locks pointer on mousedown
    this.input.on('pointerdown', (pointer) => {
      this.input.mouse.requestPointerLock()   
      this.shoot(pointer)   
    })
    
    // Moves reticle with mouse movement
    this.input.on('pointermove',  (pointer) => {
      if (this.input.mouse.locked)
      {
        this.reticle.x += pointer.movementX
        this.reticle.y += pointer.movementY
      }  
    })
   
  

    
/*     //display the Phaser.VERSION
    this.add
      .text(this.cameras.main.width - 15, 15, `Phaser v${Phaser.VERSION}`, {
        color: '#000000',
        fontSize: 24
      })
      .setOrigin(1, 0) */
  }

  enemyHit(enemy, bullet) {
    bullet.disableBody()
    bullet.setVisible(false)
  }

  shoot(pointer) {
    const bullet = this.bullets.get(this.player.x, this.player.y)
    if(bullet) {
      bullet.setActive(true)
      bullet.setVisible(true)
      this.physics.world.enableBody(bullet)
      let lineAngle = Phaser.Math.Angle.Between(this.player.x, this.player.y, this.reticle.x, this.reticle.y) * 180 / 3.14
      const velocityVector: Phaser.Math.Vector2 = this.physics.velocityFromAngle(lineAngle, 1000)
      bullet.setVelocityX(velocityVector.x)
      bullet.setVelocityY(velocityVector.y)
    }
  }
  

  lockPLayer(){
    if (this.player.x>1280){
      this.player.x= 1280
      this.player.playerfeet.x=1280
    }else if (this.player.x<0){
      this.player.x=0
      this.player.playerfeet.x=0
    }

    if (this.player.y>720){
      this.player.y= 720
      this.player.playerfeet.y=720
    }else if (this.player.y<0){
      this.player.y=0
      this.player.playerfeet.y=0
    }
  }

  lockReticle(){
    if (this.reticle.x>1280){
      this.reticle.x= 1280
    }else if (this.reticle.x<0){
      this.reticle.x=0
    }

    if (this.reticle.y>720){
      this.reticle.y= 720
    }else if (this.reticle.y<0){
      this.reticle.y=0
    }
  }
  
  rotatePlayer(){
    //angle between mouse and reticle
    let angle=Phaser.Math.Angle.Between(this.player.x,this.player.y,this.reticle.x,this.reticle.y)
    //rotate player
    this.player.setRotation(angle)
    this.player.playerfeet.setRotation(angle)
  }

  movePLayer(){

    if(this.keyboard.up.isDown == true){
      this.player.moveUp()
    }
    if (this.keyboard.down.isDown == true){
      this.player.moveDown()
    }
    if (this.keyboard.left.isDown == true){
      this.player.moveLeft()
    }
    if (this.keyboard.right.isDown == true){
      this.player.moveRight()
    }

    if(this.keyboard.up.isDown==false && this.keyboard.down.isDown==false){
      this.player.setVelocityY(0)
      this.player.playerfeet.setVelocityY(0)
    }
    if(this.keyboard.left.isDown==false && this.keyboard.right.isDown==false){
      this.player.setVelocityX(0)
      this.player.playerfeet.setVelocityX(0)
    }

  }

  animPlayer(){

    if (this.player.body.velocity.x > 0) { //moving right
      this.player.play("moveHandgun", true);
      this.player.playerfeet.play("feetRun",true);

    } else if (this.player.body.velocity.x < 0) { //moving left
      this.player.anims.play("moveHandgun", true);
      this.player.playerfeet.play("feetRun",true);

    } else if (this.player.body.velocity.y < 0) { //moving up
      this.player.play("moveHandgun", true);
      this.player.playerfeet.play("feetRun",true);

    } else if (this.player.body.velocity.y > 0) { //moving down
      this.player.play("moveHandgun", true);
      this.player.playerfeet.play("feetRun",true);

    }else{
      this.player.play("idleHandgun",true)
      this.player.playerfeet.setTexture("player", "survivor-run_0")
    }
  }

  update(time:number, delta:number) {
    this.fpsText.update()
    this.lockReticle()
    this.lockPLayer()
    this.movePLayer()
    this.rotatePlayer()
    this.animPlayer()
    
  }
}
