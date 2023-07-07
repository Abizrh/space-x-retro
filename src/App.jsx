import BootScene from './game/scene/BootScene'
import Phaser from 'phaser'
import { GridEngine } from 'grid-engine'
// import './App.css'
import { useEffect } from 'react'
import PlayGame from './game/scene/PlayGame'

function App() {

  useEffect(() => {
    const game = new Phaser.Game({
      width: 1056,
      height: 530,
      parent: 'game-content',
      scene: [
        BootScene, PlayGame
      ],
      physics: {
        default: 'arcade',
        arcade: {
          debug: false
        }
      },
      plugins: {
        scene: [
          {
            key: 'gridEngine',
            plugin: GridEngine,
            mapping: 'gridEngine',
          },
        ],
      },
      pixelArt: true
    })
    window.phaserGame = game;
  }, [])

  return (
    // <div className="App">
      <div id="game-content">

        {/* Hallooo */}
      </div>
    // </div>
  )
}

export default App
