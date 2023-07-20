import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Admin } from 'src/app/model/admin';
import { AdminService } from 'src/app/service/admin/admin.service';
import { AuthService } from 'src/app/service/auth/auth.service';
import { TokenStorageService } from 'src/app/service/token-storage/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  errorMessage = '';
  roles: string[] = [];
  hidePassword = true;
  note=false;
  admins: Admin[]=[];
  adminKontact = false

  formLogin : FormGroup = new FormGroup({
    "username" : new FormControl(null, [Validators.required]),
    "password" : new FormControl(null, [Validators.required])
  });

  constructor(private authService: AuthService, private adminService: AdminService, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.roles = this.tokenStorage.getUserToken().roles;
    }
    this.adminService.getAll().subscribe(x=>{
      this.admins = x
    })
  }

  login(): void {
    this.authService.login(this.formLogin.value).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        
        this.tokenStorage.saveUser(data);
        
        console.log("Uspesan login")
        this.reloadPage();
      },
      err => {
        this.errorMessage = err.error.message
        if(this.errorMessage.includes('Your account is disabled, please refer to administrator.')){
          this.adminKontact = true
        }
        this.note = true
      }
    );
  }

  confirmNote(){
    this.formLogin.reset()
    this.note = false
  }

  reloadPage(): void {
    window.location.href="home"
  }

}
