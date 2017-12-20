import { SettingsProvider } from '../../providers/settings/settings';
import { Component} from '@angular/core';
import { NavController } from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  selectedTheme: String;

  constructor(public navCtrl: NavController, private settings: SettingsProvider) {
    this.settings.getActiveTheme().subscribe(val => this.selectedTheme = val);
  }

  toggleAppTheme() {
    if (this.selectedTheme === 'dark-theme') {
      this.settings.setActiveTheme('light-theme');
    } else {
      this.settings.setActiveTheme('dark-theme');
    }
  }
  slides = [
    {
      title: "want to change theme?click the button below!",
      description: "<b>U </b>could change to a light theme at the day time.",
      image: "assets/front/theme.png",
    },
    {
      title: "want to see what's in front of U?",
      description: "<b>Click discovery below</b> U take photos whatever you want to see what it is.",
      image: "assets/front/logo.png",
    },
  ];
}
