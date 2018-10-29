import { Component, OnInit, ViewChild } from '@angular/core';
import { ImageCropperComponent, CropperSettings } from 'ng2-img-cropper';
import { PerfilService } from '../../../services/perfil.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-image-profile',
  templateUrl: './image-profile.component.html',
  styleUrls: ['./image-profile.component.css']
})
export class ImageProfileComponent implements OnInit {

  data: any;
  dataI: any;
  cropperSettings: CropperSettings;
  keyAdmin = '';
  flag = false;

  @ViewChild('cropper', undefined)
  cropper: ImageCropperComponent;

  constructor(
    private profileService: PerfilService,
    private toastr: ToastrService,
    public router: Router, public authService: AuthService
  ) {
    this.cropperSettings = new CropperSettings();
    this.cropperSettings.width = 100;
    this.cropperSettings.height = 100;
    this.cropperSettings.croppedWidth = 100;
    this.cropperSettings.croppedHeight = 100;
    this.cropperSettings.canvasWidth = 400;
    this.cropperSettings.canvasHeight = 300;
    this.cropperSettings.rounded = true;
    this.cropperSettings.noFileInput = true;
    this.data = {};
  }

  ngOnInit() {
    this.keyAdmin = this.profileService.getkeyAdmin();
    this.profileService.getProfileImage(this.keyAdmin).then(url => {
      this.dataI =  url;
    });
  }

  fileChangeListener($event) {
    this.flag = true;
    const image: any = new Image();
    const file: File = $event.target.files[0];
    const myReader: FileReader = new FileReader();
    const that = this;
    myReader.onloadend = function (loadEvent: any) {
      image.src = loadEvent.target.result;
      that.cropper.setImage(image);
    };
    myReader.readAsDataURL(file);
  }

  saveNewImage() {
    if (this.data && this.data.image) {
      this.profileService.saveImageProfile(this.keyAdmin, this.data.image.split(/,(.+)/)[1])
        .then((res) => {
          this.toastr.success('Imagen de Perfil Actualizada');
          this.authService.getLoggedInName.emit(true);
          this.router.navigate(['/perfil']);
        }).catch((err) => {
          this.toastr.warning('Error al Actualizar Imegen de perfil');
        });
    }

  }
}

