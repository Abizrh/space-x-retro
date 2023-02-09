export default class Beam extends Phaser.GameObjects.Sprite {
    constructor(scene){
        const x = scene.player.x
        const y = scene.player.y
        
        super(scene, x, y, 'laser')
        // this.speed = Phaser.Math.GetSpeed(400, 1)
        console.log(this)
        scene.add.existing(this);
        scene.projectiles.add(this)

        // scene.player.play('beam_anims')
        scene.physics.world.enableBody(this)
        this.body.velocity.y = -250
    }

    // create(){
    //     this.physics.add.collider(scene.projectiles, scene.powerUps)
    // }

    update(){

        if(this.y < 32) this.destroy()
    }
}