import FpsText from '../objects/fpsText'
import {CST} from '../CST'
import PlayerSprite from '../objects/Player'
import Bullet from '../objects/Bullet'



export default class MainScene extends Phaser.Scene {

  fpsText: Phaser.GameObjects.Text
  public player: PlayerSprite
  keyboard!: any
  bounds: Phaser.GameObjects.Components.GetBounds
  bullets: any
  reticle: Phaser.Physics.Arcade.Sprite
  map: Phaser.Tilemaps.Tilemap
  terrain:Phaser.Tilemaps.Tileset
  
  constructor() {
    super({ key: CST.SCENES.PLAY})
  }
  preload(){
    this.load.image("bullet","assets/shot-1.png")
    console.log(this.textures.list)
  }
  
  create() {
    //Tiles
    this.map=this.add.tilemap("map")
    this.terrain=this.map.addTilesetImage("terrain_atlas", "terrain")

    //Layers
    let botlayer=this.map.createStaticLayer("bot",[this.terrain],0,0)
    let middlelayer=this.map.createDynamicLayer("middle",[this.terrain],0,0)
    let toplayer=this.map.createDynamicLayer("top",[this.terrain],0,0)

    //Player
    this.player = new PlayerSprite(this,200,200,350).setSize(177,130).setOffset(35,65).setScale(0.3)
    this.player.playerfeet.setSize(10,10).setOffset(50,77)
    
    //Reticle
    this.reticle = this.physics.add.sprite(200, 200, 'bullet').setScale(4);
    this.physics.world.enableBody(this.reticle)

    //Map Collisions 
    this.physics.add.collider(toplayer, this.player)
    this.physics.add.collider(middlelayer,this.player)

    toplayer.setCollisionByProperty({collides:true})
    botlayer.setCollisionByProperty({collides:true})
   
    //Bounds
    this.physics.world.setBounds(0,0,this.map.widthInPixels,this.map.heightInPixels)
    this.player.setCollideWorldBounds(true)
    this.reticle.setCollideWorldBounds(true)

     //Camera
    this.cameras.main.setBounds(0, 0, this.physics.world.bounds.width,this.physics.world.bounds.height).setName('main');
    this.cameras.main.startFollow(this.player)

    //Keyboard
    this.keyboard=this.input.keyboard.addKeys({
      'up': Phaser.Input.Keyboard.KeyCodes.W, 
      'down': Phaser.Input.Keyboard.KeyCodes.S,
      'right' : Phaser.Input.Keyboard.KeyCodes.D,
      'left':Phaser.Input.Keyboard.KeyCodes.A,
    });

    //Bullet 
    this.bullets = this.physics.add.group({
      defaultKey: 'bullet',
      maxSize: 20,
    })
    // para usar la clase Bullet hay que pasarle como argumento un objeto CreateGroupConfig

    //Texto Fps
    this.fpsText = new FpsText(this)
    
    



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
  }plq
  
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
    //this.lockReticle()
    //this.lockPLayer()
    this.movePLayer()
    this.rotatePlayer()
    this.animPlayer()
    
  }
}
