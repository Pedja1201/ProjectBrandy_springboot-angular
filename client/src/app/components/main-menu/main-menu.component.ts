import { Component } from '@angular/core';
import { TokenStorageService } from 'src/app/service/token-storage/token-storage.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent {

  constructor(private tokenStorageService: TokenStorageService,  public dialog: MatDialog, private router: Router) { }

  isLoggedIn = false;

  roleAdmin = false;
  roleProfessorOrAdmin = false;
  roleProfessorOnly = false;
  roleStudent = false;

  username: string | undefined;
  
  ngOnInit(): void {
    this.openNav();
    this.closeNav();
  }

  openNav() {
    (document.getElementById("mySidebar") as HTMLFormElement).style.width = "250px";
    (document.getElementById("main") as HTMLFormElement).style.marginLeft = "250px";
  }
  
  /* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
  closeNav() {
    (document.getElementById("mySidebar") as HTMLFormElement).style.width = "0";
    (document.getElementById("main") as HTMLFormElement).style.marginLeft = "0";
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}
