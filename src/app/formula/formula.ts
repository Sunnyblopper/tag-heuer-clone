import { Component } from '@angular/core';
import { Experience } from './experience/experience';
import { FormulaSection } from './formula-section/formula-section';
import { ExperienceImage } from "./experience-image/experience-image";

@Component({
  selector: 'app-formula',
  imports: [Experience, FormulaSection, ExperienceImage],
  templateUrl: './formula.html',
  styleUrl: './formula.css'
})
export class Formula {

}
