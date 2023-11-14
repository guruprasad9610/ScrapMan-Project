import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;
  public screen: Number;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    let rootScreen = this.activatedRoute.snapshot.paramMap.get('id');

    if(rootScreen == 'Home'){
      this.screen=1
    }else if(rootScreen == 'Profile'){
      this.screen = 2
    }else if(rootScreen == 'Orders'){
      this.screen = 3
    }

    console.log(screen)
    this.folder = rootScreen;

  }

}
