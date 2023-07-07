import { Scene } from "phaser";
import background from '../../assets/space.svg'
import ship_1 from '../../assets/spritesheets/ship.png'
import ship_2 from '../../assets/spritesheets/ship2.png'
import ship_3 from '../../assets/spritesheets/ship3.png'
import explotion from '../../assets/spritesheets/explosion.png'
import power_up from '../../assets/spritesheets/power-up.png'
import player from '../../assets/spritesheets/Lightning.png'
import laser from '../../assets/spritesheets/bullet.png'
import audio_laser from '../../assets/audio/laser.mp3'
import audio_explotion from '../../assets/audio/explotion.mp3'
import audio_pickup from '../../assets/audio/pickup.mp3'
import heart from '../../assets/spritesheets/heart_full.png'
import half_heart from '../../assets/spritesheets/heart_half.png'
import empty_heart from '../../assets/spritesheets/heart_empty.png'

export default class BootScene extends Phaser.Scene {
    constructor(){
        super('BootScene')
    }

    preload(){
        this.load.image('background', background)

        this.load.spritesheet('ship_1', ship_1, {
            frameWidth: 16, 
            frameHeight: 16
        })
        this.load.spritesheet('ship_2', ship_2, {
            frameWidth: 32,
            frameHeight: 16
        })
        this.load.spritesheet('ship_3', ship_3, {
            frameWidth: 32,
            frameHeight: 32
        })
        this.load.spritesheet('explotion', explotion, {
            frameWidth: 16,
            frameHeight: 16
        })
        this.load.spritesheet('power-up', power_up, {
            frameWidth: 16,
            frameHeight: 16
        })
        this.load.spritesheet('player', player, {
          frameWidth: 32,
          frameHeight: 32
        })
        this.load.spritesheet('laser', laser, {
          frameWidth: 32,
          frameHeight: 32
        })

        this.load.spritesheet('heart', heart, {
          frameWidth: 16,
          frameHeight: 16
        })

        this.load.spritesheet('half_heart', half_heart, {
          frameWidth: 16,
          frameHeight: 16
        })
        
        this.load.spritesheet('empty_heart', empty_heart, {
          frameWidth: 16,
          frameHeight: 16
        })

        // this.load.image('laser', laser)
        this.load.audio('laser_effect', audio_laser)
        this.load.audio('explotion_effect', audio_explotion)
        this.load.audio('pickup_effect', audio_pickup)
    }

    create(){
              // ship object
      this.anims.create({
        key: 'ship_1_anims',
        frames: this.anims.generateFrameNumbers('ship_1'),
        frameRate: 20,
        repeat: -1
      })
      this.anims.create({
        key: 'ship_2_anims',
        frames: this.anims.generateFrameNumbers('ship_2'),
        frameRate: 20,
        repeat: -1
      })
      this.anims.create({
        key: 'ship_3_anims',
        frames: this.anims.generateFrameNumbers('ship_3'),
        frameRate: 20,
        repeat: -1
      })
      this.anims.create({
        key: 'explotion_anims',
        frames: this.anims.generateFrameNumbers('explotion'),
        frameRate: 20,
        repeat: 0,
        hideOnComplete: true
      })
      
      // power up object
      this.anims.create({
        key: 'red',
        frames: this.anims.generateFrameNumbers('power-up', {
          start: 0,
          end: 1
        }),
        frameRate: 20,
        repeat: -1
      })
      this.anims.create({
        key: 'grey',
        frames: this.anims.generateFrameNumbers('power-up', {
          start: 2,
          end: 3
        }),
        frameRate: 20,
        repeat: -1
      })
      
      this.anims.create({
        key: 'thrust',
        frames: this.anims.generateFrameNumbers('player'),
        frameRate: 20,
        repeat: -1
      })
      this.anims.create({
        key: 'beam_anims',
        frames: this.anims.generateFrameNumbers('laser'),
        frameRate: 20,
        repeat: -1
      })



        this.add.text(20, 20, 'Loading Game...')
        this.scene.start('PlayGame')
    }
}