import { Component, OnInit } from '@angular/core';
import 'phaser';


@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})

export class GamePage implements OnInit {
  config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 200 }
      }
    },
    scene: {
      preload: this.preload,
      create: this.create,
      update: this.update
    }
  };

  load: any;
  add:any;

  constructor() {
    new Phaser.Game(this.config);
  }

 preload () {
    console.log('preload OK');
    this.load.image('sky', './assets/sky.png');
  }

  create () {
    console.log('create OK');
    this.add.image(400, 300, 'sky');
  }

  update(){
    console.log('UPDATE OK');
    let frames = 1+1;
  }

  ngOnInit() {
  }
}
