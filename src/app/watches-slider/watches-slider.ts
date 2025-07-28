import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-watches-slider',
  imports: [CommonModule],
  templateUrl: './watches-slider.html',
  styleUrl: './watches-slider.css',
})
export class WatchesSlider implements OnInit{
  @ViewChild('productGrid') productGrid!: ElementRef;

  products: any[] = [];
  currentIndexes: number[] = [];
  currentIndex: number = 0;
  showLeftArrow = false;
  showRightArrow = true;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchWatches();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.checkArrowsVisibility();
      this.productGrid.nativeElement.addEventListener(
        'scroll',
        this.checkArrowsVisibility.bind(this)
      );
    });
  }

  fetchWatches(): void {
    this.http.get<any[]>('http://127.0.0.1:3000/api/watches/').subscribe(
      (data) => {
        console.log('Fetched data:', data);
        this.products = data;
        this.currentIndexes = new Array(this.products.length).fill(0);
      },
      (error) => {
        console.error('Error fetching watch data', error);
      }
    );
  }

  toggleHeart(event: any) {
    event.target.classList.toggle('far');
    event.target.classList.toggle('fas');
    event.target.classList.toggle('filled');
  }

  prevImage(index: number) {
    this.currentIndexes[index] =
      (this.currentIndexes[index] - 1 + this.products[index].images.length) %
      this.products[index].images.length;
  }

  nextImage(index: number) {
    this.currentIndexes[index] =
      (this.currentIndexes[index] + 1) % this.products[index].images.length;
  }

  scrollLeft() {
    if (this.productGrid) {
      this.productGrid.nativeElement.scrollBy({
        left: -350,
        behavior: 'smooth',
      });
    }
  }

  scrollRight() {
    if (this.productGrid) {
      this.productGrid.nativeElement.scrollBy({
        left: 350,
        behavior: 'smooth',
      });
    }
  }

  checkArrowsVisibility() {
    const scrollLeft = this.productGrid.nativeElement.scrollLeft;
    const scrollWidth = this.productGrid.nativeElement.scrollWidth;
    const clientWidth = this.productGrid.nativeElement.clientWidth;

    this.showLeftArrow = scrollLeft > 0;
    this.showRightArrow = scrollLeft < scrollWidth - clientWidth;
  }

  goToSlide(index: number) {
    this.currentIndex = index;
    const offset = index * 350;
    this.productGrid.nativeElement.scrollTo({
      left: offset,
      behavior: 'smooth',
    });
  }
}
