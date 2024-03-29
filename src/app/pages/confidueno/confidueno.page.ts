import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Camera } from '@awesome-cordova-plugins/camera/ngx';
import { ToastController } from '@ionic/angular';
import { BdService } from 'src/app/services/bd.service';
import { CameraService } from 'src/app/services/camera.service';

@Component({
  selector: 'app-confidueno',
  templateUrl: './confidueno.page.html',
  styleUrls: ['./confidueno.page.scss'],
})
export class ConfiduenoPage implements OnInit {
  onModalCancel(onModalCancel: any){
    throw new Error ('Method not implemented.');
  }
  foto: any = 0;
  usua: any [] = [];
  Usuario: any [] = [];

  constructor(private router: Router,private camara: Camera, private camera: CameraService, private bd: BdService,private toastController: ToastController) { }

  ngOnInit() {
    this.bd.dbState().subscribe((res) => {
      if (res) {
        this.bd.fetchUser().subscribe(item => {
          this.Usuario = item;
        })
      }
    })
    this.camera.fetchImage().subscribe(item=>{
      this.foto = item;
    })
    this.camera.obser.subscribe((res: any[]) =>{
      this.foto = res;
      console.log(res[0]);
    },(error: any) =>{
      console.log(error);
    });
  }

  Tomarfoto() {
    this.camera.Camera();
    this.foto = this.camera.image;
  }


  Galeria() {
    this.camera.Galery();
    this.foto = this.camera.image;
  }

  Guardar(){
    this.bd.modificarUsuarioImg(this.Usuario[0].idusuario,this.foto);
    this.presentToast("Se ha cambiado la foto con exito");
    this.router.navigate(['/confidueno']);
  }

  async presentToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000
  
    });
    toast.present();
  }
}
