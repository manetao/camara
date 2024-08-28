import { Component } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Directory, Encoding, Filesystem } from '@capacitor/filesystem';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  path: string= "Test"
  constructor() {}

  ngOnInit(){
    Camera.requestPermissions();
    this.crearCarpeta();
  }

  async tomarfoto(){

      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera
      });
      if(image){
        this.guardarfoto(image.base64String!)
      }

  }

 async guardarfoto(photo: string){
  var a=0;
  a++
  await Filesystem.writeFile({
    path: this.path+'/Test'+a+'.jpg',
    data: photo,
    directory: Directory.Documents,
    encoding: Encoding.UTF8
  })
  }

 crearCarpeta(){
  Filesystem.readdir(
    {
      path: this.path,
      directory: Directory.Documents

    }
  ).then(res=>{console.log(res)})
  .catch(err=>{console.log(err)})
  Filesystem.mkdir(
    {
      path: this.path,
      directory: Directory.Documents

    }
  ).then(res=>{console.log(res)})
  .catch(err=>{console.log(err)})
 }
 loadPhoto(){
  
 }
}
