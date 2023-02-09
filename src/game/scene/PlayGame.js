import Beam from "./Beam";
import Explotion from "./Explotion";

export default class PlayGame extends Phaser.Scene {
  constructor() {
    super("PlayGame");
  }

  create() {
    this.background = this.add.tileSprite(0, 0, 256, 272, "background");
    // this.beam = this.add.image(200, 300, 'laser')
    // this.beam.setScale(0)
    this.background.setOrigin(0, 0);
    this.ship_1 = this.add.sprite(70, 100, "ship_1");
    this.ship_2 = this.add.sprite(130, 100, "ship_2");
    this.ship_3 = this.add.sprite(189, 100, "ship_3");

    this.enemies = this.physics.add.group();
    this.enemies.add(this.ship_1);
    this.enemies.add(this.ship_2);
    this.enemies.add(this.ship_3);

    this.ship_1.play("ship_1_anims");
    this.ship_2.play("ship_2_anims");
    this.ship_3.play("ship_3_anims");

    this.ship_1.setInteractive();
    this.ship_2.setInteractive();
    this.ship_3.setInteractive();

    this.input.on("gameobjectdown", this.destroyShip, this);
    // this.add.text(55, 10, "Playing game", {
    //   font: "25px Arial",
    //   fill: "yellow",
    // });
    var graphics = this.add.graphics();
    graphics.fillStyle("Black");
    graphics.fillRect(0, 0, this.game.config.width, 20);
    this.score = 0;
    this.scoreBoard = this.add.text(10, 5, "SCORE", { fill: "yellow" }, 16);

    this.laserEffect = this.sound.add('laser_effect')
    this.explotionEffect = this.sound.add('explotion_effect')
    this.pickupEffect = this.sound.add('pickup_effect')

    this.powerUps = this.physics.add.group();

    for (let i = 0; i <= 4; i++) {
      const power = this.physics.add.sprite(16, 16, "power-up");
      this.powerUps.add(power);
      power.setRandomPosition(
        0,
        0,
        this.game.config.width,
        this.game.config.height
      );

      if (Math.random() > 0.5) power.play("red");
      else power.play("grey");

      power.setVelocity(100, 100);
      power.setCollideWorldBounds(true);
      power.setBounce(1);
    }

    this.player = this.physics.add.sprite(
      this.game.config.width / 2 - 8,
      this.game.config.height - 64,
      "player"
    );
    this.player.play("thrust");
    this.player.setCollideWorldBounds(true);

    this.cursorKeys = this.input.keyboard.createCursorKeys();
    this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.spacebar = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.ENTER
    );
    this.projectiles = this.add.group();

    this.physics.add.collider(
      this.projectiles,
      this.powerUps,
      (projectile, powerUps) => {
        projectile.destroy();
      }
    );

    this.physics.add.overlap(
      this.player,
      this.powerUps,
      (player, powerUp) => {
        powerUp.disableBody(true, true);
        this.pickupEffect.play()
      },
      null,
      this
    );

    this.physics.add.overlap(
      this.player,
      this.enemies,
      this.hurtPlayer,
      null,
      this
    );

    this.physics.add.overlap(
      this.projectiles,
      this.enemies,
      (missil, enemy) => {
        const explode = new Explotion(this, enemy.x, enemy.y);
        missil.destroy();
        this.resetShipPosition(enemy);
        this.score += 15;
        this.scoreBoard.text = "SCORE " + this.score || 0;
      },
      null,
      this
    );
  }

  update() {
    this.moveShip(this.ship_1, 1);
    this.moveShip(this.ship_2, 2);
    this.moveShip(this.ship_3, 3);

    this.background.tilePositionY -= 0.5;

    this.movePlayer();

    if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
      if(this.player.active) this.shootBeam()
    }

    for (let i = 0; i < this.projectiles.getChildren().length; i++) {
      const beam = this.projectiles.getChildren()[i];
      beam.update();
    }
  }

  moveShip(ship, speed) {
    ship.y += speed;
    if (ship.y > 272) this.resetShipPosition(ship);
  }

  resetShipPosition(ship) {
    ship.y = 0;
    const width = 256;
    // const height = 272
    const random = Phaser.Math.Between(0, width);
    ship.x = random;
  }

  destroyShip(pointer, gameObj) {
    this.explotionEffect.play()
    gameObj.setTexture("explotion");
    gameObj.play("explotion_anims");
  }

  movePlayer() {
    if (this.keyA.isDown) {
      this.player.setVelocityX(-200);
    } else if (this.keyS.isDown) {
      this.player.setVelocityY(200);
    } else if (this.keyD.isDown) {
      this.player.setVelocityX(200);
    } else if (this.keyW.isDown) {
      this.player.setVelocityY(-200);
    }
  }

  shootBeam() {
    const beam = new Beam(this);
    this.laserEffect.play()
  }

  hurtPlayer(player, enemy) {
    this.resetShipPosition(enemy);

    if(this.player.alpha < 1) return

    const explode = new Explotion(this, player.x, player.y);
    player.disableBody(true, true)

    // this.resetPlayer()
    this.time.addEvent({
      delay: 1000,
      callback: this.resetPlayer,
      callbackScope: this,
      loop: false
    })
    
  }

  resetPlayer(){
    const x = this.game.config.width / 2 - 8;
    const y = this.game.config.height - 64;
    this.player.enableBody(true, x, y, true, true)

    this.player.alpha = 0.5

    const tween = this.tweens.add({
      targets: this.player,
      y: this.game.config.height - 64,
      ease: 'Power1',
      duration: 1200,
      repeat: 0, 
      onComplete: (() => {
        this.player.alpha = 1
      }),
      callbackScope: this
    })
  }
}
