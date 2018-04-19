import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

import { states, Address, Hero, heroes } from '../data-model';
import { HeroService } from '../hero.service';

export const SECRET_LAIR_NAME = 'secretLairs';

@Component({
	selector: 'app-hero-detail',
	templateUrl: './hero-detail.component.html',
	styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnChanges {
	@Input() hero: Hero;

	heroForm: FormGroup;
	states = states;

	constructor(private fb: FormBuilder, private heroService: HeroService) {
		this.createForm();
	}

	createForm() {
		this.heroForm = this.fb.group({
			name: ['', Validators.required ],
			SECRET_LAIR_NAME: this.fb.array([]),
			power: '',
			sidekick: ''
		});
	}

  ngOnChanges() { // <-- call rebuildForm in ngOnChanges
  	if(this.heroForm !== undefined) {
  		this.rebuildForm();
  	}
  }

  rebuildForm() { // <-- wrap patchValue in rebuildForm
  	this.heroForm.reset({
			name: this.hero.name,
			address: this.hero.addresses[0] || new Address()
		});
  	this.setAddresses(this.hero.addresses);
  }

  setAddresses(addresses: Address[]) {
	  const addressFGs = addresses.map(address => this.fb.group(address));
	  const addressFormArray = this.fb.array(addressFGs);
	  this.heroForm.setControl(SECRET_LAIR_NAME, addressFormArray);
	}

	get secretLairs(): FormArray {
		return this.heroForm.get(SECRET_LAIR_NAME) as FormArray;
	}
}
