export default class Explotion extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y){
        super(scene, x, y, 'explotion')
        scene.add.existing(this)
        this.play('explotion_anims')
        scene.explotionEffect.play()
    }
}