import { Component, OnInit } from '@angular/core';
import 'phaser';

let game:any;
const deviceParameters = {
  width: 800,
  height: 600
}
const VELOCITY:number = 200;
const FLAP_VELOCITY:number = 150;
const PIPES_TO_RENDER = 128;
const _initialPepePosition = {
  x: deviceParameters.width * 0.1,
  y: deviceParameters.height / 2,
}
const pipeVerticalDistanceRange = [280, 450];

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

  pipeVerticalDistance:number | undefined;
  pipeVerticalPosition:number | undefined;
  upperPipe: any;
  lowerPipe:any;
  
  constructor() {
    game = new Phaser.Game(this.config);
  }

  preload () {
    this.load.image('sky', './assets/sky.png');

    this.load.image('pepeup', './assets/pepeup.png');
    this.load.image('pepedown', './assets/pepedown.png');

    this.load.image('pipe', './assets/pipe.png');
  }

  create () {
    this.add.image(0, 0, 'sky').setOrigin(0);

    this.pepe = this.physics.add.sprite(_initialPepePosition.x, _initialPepePosition.y, 'pepedown').setOrigin(0);
    this.pepe.body.gravity.y = 400;
    this.pepe.displayWidth = 42;
    this.pepe.displayHeight = 42;
    this.pepe.body.velocity.y = VELOCITY;
    this.input.on('pointerdownoutside', () => {
      flap(this.pepe.body.velocity);
    });
    let pipeHorizontalDistance:number = 0;
    for (let i = 0; i < PIPES_TO_RENDER; i++) {
      this.pipeVerticalDistance = Phaser.Math.Between(pipeVerticalDistanceRange[0], pipeVerticalDistanceRange[1]);
      this.pipeVerticalPosition = Phaser.Math.Between(0 + 20, game.config.height - 20 - this.pipeVerticalDistance);
      this.upperPipe = this.physics.add.sprite(pipeHorizontalDistance, this.pipeVerticalPosition, 'pipe').setOrigin(0, 1);
      this.lowerPipe = this.physics.add.sprite(this.upperPipe.body.x+30, this.upperPipe.body.y + this.pipeVerticalDistance,  'pipe').setOrigin(0, 0);
      this.upperPipe.body.velocity.x = -200;
      this.lowerPipe.body.velocity.x = -200;
      pipeHorizontalDistance = pipeHorizontalDistance + 400;
    }
  }

  update(){
    if(this.pepe.body.position.y >= game.config.height-this.pepe.displayHeight){
      this.pepe.body.velocity.y = -VELOCITY;
      gameOver(this.pepe);
    }else if(this.pepe.body.position.y <= 0){
      this.pepe.body.velocity.y = VELOCITY;
      gameOver(this.pepe);
    }

    if(this.pepe.body.velocity.y >= 0){
      this.pepe.setTexture('pepedown');
    }else{
      this.pepe.setTexture('pepeup');
    }
  }
  ngOnInit() {}
}

function gameOver(player:any):void {
  player.x = _initialPepePosition.x;
  player.y = _initialPepePosition.y;
  game.pause();
}

function flap(playerVelocity:any):void{
  playerVelocity.y =- FLAP_VELOCITY;
}