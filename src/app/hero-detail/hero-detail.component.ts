import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { states } from '../data-model';


@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
	
	heroForm: FormGroup; 
	states = states;
	// = new FormGroup({
	// 	name: new FormControl()
	// });

  constructor(private formBuilder: FormBuilder) { 
  	this.createForm();
  }

  ngOnInit() {
  }

  createForm(){
  	this.heroForm = this.formBuilder.group({
  		name: ['', Validators.required ],
      
      address: this.formBuilder.group({
      	street: '',
      	city: '',
      	state: '',
      	zip: '',		
      }),

      power: '',
      sidekick: ''
  	});
  }
}
