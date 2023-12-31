import { Component } from '@angular/core';
import 'phaser';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page{
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
  }
}