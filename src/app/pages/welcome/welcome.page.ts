import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { IonSlides } from '@ionic/angular';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
export const APP_KEY: string = 'App';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
  encapsulation:ViewEncapsulation.None
})
export class WelcomePage implements OnInit {

  showSkip = true;
  @ViewChild('slides',{static:false})slides:IonSlides;
   constructor(private localStorageService:LocalStorageService, private router:Router) { }
  // constructor() { }

  ngOnInit() {
    let appConfig:any = this.localStorageService.get('App',{
      launched:false,
      version:'1.1.0'
    });

    // if ( appConfig.isLaunched === false ) {
    //   appConfig.isLaunched = true;
    //   this.localStorageService.set('App', appConfig);
    // }
  }
  onSlideWillChange() {
    this.slides.isEnd().then((end) => {
      this.showSkip = !end;
    });
  }
  onSkip(){
    this.router.navigateByUrl('/passport/signup');
  }
}
