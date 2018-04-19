import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { states, Address, Hero, heroes } from '../data-model';
import { HeroService } from '../hero.service';


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

	// ngOnInit() {

	// 	this.heroService.getHeroes().subscribe(heroes => {
	// 		const selectedHero = heroes.find(storedHero => storedHero.name === this.hero.name);
			
	// 	});
	// }

	// createForm(selectedHero: Hero) {
	// 	this.heroForm = this.fb.group({
	// 		name: [selectedHero.name, Validators.required ],
	// 		address: this.fb.group({
	// 			street: selectedHero.addresses[0].street,
	// 			city: selectedHero.addresses[0].city,
	// 			state: selectedHero.addresses[0].state,
	// 			zip: selectedHero.addresses[0].zip
	// 		}),
	// 		power: '',
	// 		sidekick: ''
	// 	});
	// }

	createForm() {
		this.heroForm = this.fb.group({
			name: ['', Validators.required ],
			address: this.fb.group({
				street: '',
				city: '',
				state: '',
				zip: ''
			}),
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
  	this.heroForm.reset();
  	this.heroForm.patchValue({
  		name: this.hero.name
  	});
  }
}
