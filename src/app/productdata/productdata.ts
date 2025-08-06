import { Component } from '@angular/core';
import { Productpage } from "../productpage/productpage";
import { Technicalspecifications } from "../technicalspecifications/technicalspecifications";

@Component({
  selector: 'app-productdata',
  imports: [Productpage, Technicalspecifications],
  templateUrl: './productdata.html',
  styleUrl: './productdata.css'
})
export class Productdata {

}
