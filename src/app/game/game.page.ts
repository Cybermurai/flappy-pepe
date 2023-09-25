import { Component, OnInit } from '@angular/core';
import 'phaser';

let game:any;
const deviceParameters = {
  width: 800,
  height: 600
}
const VELOCITY:number = 200;
const FLAP_VELOCITY:number = 150;
const _initialPepePosition = {
  x: deviceParameters.width * 0.1,
  y: deviceParameters.height / 2,
}

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})

export class GamePage implements OnInit {
  config = {
    type: Phaser.AUTO,
    width: deviceParameters.width,
    height: deviceParameters.height,
    physics: {
      default: 'arcade',
      arcade: {
        debug: false,
      }
    },
    scene: {
      preload: this.preload,
      create: this.create,
      update: this.update,
    }
  };

  load: any;
  add:any;
  physics:any;
  input:any;

  pepe:any;
  pipe:any;
  pipe2:any;
  constructor() {
    game = new Phaser.Game(this.config);
  }

  preload () {
    this.load.image('sky', './assets/sky.png');
    this.load.image('pepe', './assets/pepe.png');
    this.load.image('pipe', './assets/pipe.png')
  }

  create () {
    this.add.image(0, 0, 'sky').setOrigin(0);
    
    this.pepe = this.physics.add.sprite(_initialPepePosition.x, _initialPepePosition.y, 'pepe').setOrigin(0);
    this.pepe.body.gravity.y = 400;
    this.pepe.displayWidth = 42;
    this.pepe.displayHeight = 42;
    this.pepe.body.velocity.y = VELOCITY;
    this.input.on('pointerdownoutside', () =>{
      this.pepe.body.velocity.y =- FLAP_VELOCITY;
    });

    this.pipe = this.physics.add.sprite(300, 400, 'pipe').setOrigin(0, 0.2);
    this.pipe2 = this.physics.add.sprite(300, 400, 'pipe').setOrigin(0, 1.4);
    this.pipe.body.gravity.x = -20;
    this.pipe2.body.gravity.x = -20;
  }

  update(){
    if(this.pepe.body.position.y >= game.config.height-this.pepe.displayHeight){
      this.pepe.body.velocity.y = -VELOCITY;
      this.pepe.x = _initialPepePosition.x;
      this.pepe.y = _initialPepePosition.y;
    }else if(this.pepe.body.position.y <= 0){
      this.pepe.body.velocity.y = VELOCITY;
      this.pepe.x = _initialPepePosition.x;
      this.pepe.y = _initialPepePosition.y;
    }

    if(this.pipe.body.position.x <= 0){
      this.pipe.body.position.x = 600;
      this.pipe2.body.position.x = 600;
    }
  }
  ngOnInit() {}
}