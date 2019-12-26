import Phaser from 'phaser'
import MainScene from './scenes/mainScene'
import PreloadScene from './scenes/preloadScene'





const DEFAULT_WIDTH = 1280
const DEFAULT_HEIGHT = 720
let game:Phaser.Game
// @ts-ignore https://github.com/photonstorm/phaser/issues/4522
// still not working in 3.18.1 :/
const config: GameConfig = {
  type: Phaser.AUTO,
  backgroundColor: '#ffffff',
  scale: {
    parent: 'phaser-game',
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT
  },
  scene: [PreloadScene, MainScene],
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
      
    }
  }
}

window.addEventListener('load', () => {
  game = new Phaser.Game(config)
  
})


