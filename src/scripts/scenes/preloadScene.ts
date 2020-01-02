import {CST} from '../CST'

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: CST.SCENES.PRELOAD })
  }

  preload() {
    //load Images
    this.load.image('phaser-logo', 'assets/img/phaser-logo.png')
    this.load.image('red-nigga', 'assets/red-nigga.PNG')
    
    //load Atlases
    this.load.atlas("player","assets/Packs/playersprite.png", "assets/Packs/playersprite_atlas.json")
    this.load.atlas("patas","assets/Packs/feet.png", "assets/Packs/feet_atlas.json")

    this.load.spritesheet("cat", "assets/cat.png",{frameHeight:32,frameWidth:32})
  }

  create() {

    this.anims.create({
      key: 'idleHandgun',
      frames: this.anims.generateFrameNames('player',{prefix:'survivor-idle_handgun_', end:19}),
      frameRate: 16,
      repeat: -1
    });

    //player move
    this.anims.create({
      key: 'moveHandgun',
      frames: this.anims.generateFrameNames('player',{prefix:'survivor-move_handgun_', end:19}),
      frameRate: 48,
      repeat:-1
    });
    
    //player shoot
    this.anims.create({
      key: 'shootHandgun',
      frames: this.anims.generateFrameNames('player',{prefix:'survivor-shoot_handgun_', end:2}),
      frameRate: 16,
      repeat: -1
    });

    this.anims.create({
      key:"feetRun",
      frames: this.anims.generateFrameNames('patas',{prefix:'survivor-run_', end:19}),
      frameRate:48,
      repeat:-1
    
    })

    this.anims.create({
      key: 'walk',
      frames:this.anims.generateFrameNumbers('cat',{frames:[0,1,2,3],}),
      frameRate:4,
      repeat:-1
    })
    
    this.scene.start(CST.SCENES.PLAY)


    /**
     * This is how you would dynamically import the mainScene class (with code splitting),
     * add the mainScene to the Scene Manager
     * and start the scene.
     * The name of the chunk would be 'mainScene.chunk.js
     * Find more about code splitting here: https://webpack.js.org/guides/code-splitting/
     */
    // let someCondition = true
    // if (someCondition)
    //   import(/* webpackChunkName: "mainScene" */ './mainScene').then(mainScene => {
    //     this.scene.add('MainScene', mainScene.default, true)
    //   })
    // else console.log('The mainScene class will not even be loaded by the browser')
  }
}
