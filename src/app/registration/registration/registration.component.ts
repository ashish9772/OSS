import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { RegistrationService } from '../services/registration.service';
import { RouterOutlet, ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  registerForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email] ],
    password: ['', [Validators.required, Validators.minLength(4)] ],
    registerAsAdmin: [true],
    username: ['', [Validators.required, Validators.minLength(4)] ]
  });

  isRegistered:boolean = false;
  constructor( private fb: FormBuilder, 
    private regService: RegistrationService,
    private router: Router,
    private ac: ActivatedRoute
    ) { }

  ngOnInit(): void {
  }

  register(){
    if(this.registerForm.valid){
      this.regService.registerUser().subscribe(
        () => {
          this.router.navigate(['/login']);
        }
      )
    }
  }

  get email(): FormControl{
    const fc = this.registerForm.get('email') as FormControl;
    return fc;
  }
  
  get password(): FormControl {
    const fc = this.registerForm.get('password') as FormControl;
    return fc;
  }

  get registerAsAdmin(): FormControl {
    const fc = this.registerForm.get('registerAsAdmin') as FormControl;
    return fc;
  }

  get username(): FormControl {
    const fc = this.registerForm.get('username') as FormControl;
    return fc;
  }

}
