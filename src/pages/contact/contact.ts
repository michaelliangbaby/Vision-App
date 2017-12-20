import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { VisionapiProvider } from "../../providers/visionapi/visionapi";
import { AngularFireDatabase,FirebaseListObservable } from 'angularfire2/database-deprecated';
import { AlertController } from 'ionic-angular';
@Component({
  selector: 'page-home',
  templateUrl: 'contact.html'
})
export class ContactPage {
  public base64Image: string;
  picture = "";
  error = "";
  items: FirebaseListObservable<any[]>;
  constructor(private camera: Camera,public vision:VisionapiProvider,private db: AngularFireDatabase, private alert: AlertController) {
    this.items = db.list('items');
  }

  takePhoto() {
    const options: CameraOptions = {
      quality: 100,
      targetHeight: 500,
      targetWidth: 500,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
      this.vision.getLabels(imageData).subscribe((result) => {
        this.saveResults(imageData, result.json().responses);
      }, err => {
        this.showAlert(err);
      });
    }, err => {
      this.showAlert(err);
    });
  }
  saveResults(imageData, results) {
    this.items.push({ imageData: imageData, results: results})
      .then(_ => { })


  }
  showAlert(message) {
    let alert = this.alert.create({
      title: 'Error',
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }
  }
