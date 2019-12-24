import PhaserLogo from '../objects/phaserLogo'
import FpsText from '../objects/fpsText'
import {CST} from '../CST'
import PlayerSprite from '../objects/Player'

export default class MainScene extends Phaser.Scene {

  fpsText: Phaser.GameObjects.Text
  public player: PlayerSprite
  
  keyboard!: any
  
  constructor() {
    super({ key: CST.SCENES.PLAY})
  }
  preload(){
    
    console.log(this.textures.list)
  }
  
  create() {
    this.player=new PlayerSprite(this,100,100,350).setSize(177,130).setOffset(35,65)
    this.player.playerfeet.setSize(10,10).setOffset(50,77)
    //keyboard
    this.keyboard=this.input.keyboard.addKeys({
      'up': Phaser.Input.Keyboard.KeyCodes.W, 
      'down': Phaser.Input.Keyboard.KeyCodes.S,
      'right' : Phaser.Input.Keyboard.KeyCodes.D,
      'left':Phaser.Input.Keyboard.KeyCodes.A,
    });
    this.player.playerfeet.play("feetRun");
    this.fpsText = new FpsText(this)

    
/*     //display the Phaser.VERSION
    this.add
      .text(this.cameras.main.width - 15, 15, `Phaser v${Phaser.VERSION}`, {
        color: '#000000',
        fontSize: 24
      })
      .setOrigin(1, 0) */
  }

  movePLayer(player:PlayerSprite){

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
    //this.player.play('diamond');
    this.fpsText.update()
    this.movePLayer(this.player)
    this.animPlayer()
    
  }
}
