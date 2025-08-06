import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, HostListener, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Technicalspecifications } from '../technicalspecifications/technicalspecifications';
import { Searchproduct } from '../search/searchproduct/searchproduct';

@Component({
  selector: 'app-productpage',
  imports: [CommonModule, Technicalspecifications, Searchproduct],
  templateUrl: './productpage.html',
  styleUrl: './productpage.css',
})
export class Productpage implements OnInit {
  @Input() technicalSpecifications: any = {};

  selectedThumbnail = 0;
  selectedColorOption = 0;
  isAvailabilityOpen = false;

  hovered = false;
  isAudioPlaying = false;
  audioCurrentTime = 0;
  audioDuration = 100;

  isFavorite = false;

  previousScrollY = 0;
  showMoreOptions = false;

  thumbnails: string[] = [];
  mainImage: string = '';
  product: any = null;
  productIndex: number = 0;

  colorOptions = [
    {
      image: 'https://i.imgur.com/sC5fBH7.png',
      name: 'Steel Silver',
      price: 7250.0,
    },
    {
      image: 'https://i.imgur.com/P4wL9pX.png',
      name: 'Steel Green',
      price: 7250.0,
    },
    {
      image: 'https://i.imgur.com/9O0YnJ2.png',
      name: 'Steel Black',
      price: 7250.0,
    },
    {
      image: 'https://i.imgur.com/R3dEaB8.png',
      name: 'Steel Blue',
      price: 7450.0,
    },
  ];

  storeLocations = [
    'New York - Fifth Avenue',
    'Los Angeles - Beverly Hills',
    'Chicago - Magnificent Mile',
    'Miami - Brickell City Centre',
  ];

  relatedProducts: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.productIndex = +params['id'];
      const navigation = this.router.getCurrentNavigation();
      const productState = navigation?.extras.state as { product: any };

      if (productState && productState.product) {
        this.product = productState.product;
        this.thumbnails = this.product.images || [];
        this.mainImage = this.thumbnails[0] || '';
        this.technicalSpecifications = this.product;
      } else {
        this.fetchProduct();
      }
    });
  }

  fetchProduct(): void {
    this.http.get<any[]>('http://127.0.0.1:3000/api/watches/').subscribe(
      (data) => {
        if (data && data[this.productIndex]) {
          this.product = data[this.productIndex];
          this.thumbnails = this.product.images || [];
          this.mainImage = this.thumbnails[0] || '';
          this.technicalSpecifications = this.product;
        }
      },
      (error) => {
        console.error('Error fetching product data:', error);
      }
    );
  }

  selectImage(index: number): void {
    this.selectedThumbnail = index;
    this.mainImage = this.thumbnails[index];
  }

  toggleFavorite(): void {
    this.isFavorite = !this.isFavorite;
    console.log(
      this.isFavorite ? 'Added to favorites!' : 'Removed from favorites.'
    );
  }

  toggleAvailability(): void {
    this.isAvailabilityOpen = !this.isAvailabilityOpen;
  }

  getCurrentPrice(): number {
    if (this.product && this.product.price) {
      return this.product.price;
    }
    return this.colorOptions[this.selectedColorOption].price;
  }

  goToOrderByPhone() : void {
    console.log('Go to order by phone')
  }

  addToCart(): void {
    console.log(
      `Added to cart: ${
        this.product?.name || 'Product'
      }, Price: $${this.getCurrentPrice()}`
    );
  }

  toggleAudio(audio: HTMLAudioElement): void {
    if (this.isAudioPlaying) {
      audio.pause();
    } else {
      audio.play();
      this.audioDuration = audio.duration || 100;
      this.monitorAudioProgress(audio);
    }

    this.isAudioPlaying = !this.isAudioPlaying;
  }

  monitorAudioProgress(audio: HTMLAudioElement): void {
    const interval = setInterval(() => {
      if (audio.paused || audio.ended) {
        clearInterval(interval);
        this.isAudioPlaying = false;
      } else {
        this.audioCurrentTime = audio.currentTime;
      }
    }, 500);
  }

  onSeek(event: Event, audio: HTMLAudioElement): void {
    const value = +(event.target as HTMLInputElement).value;
    audio.currentTime = value;
    this.audioCurrentTime = value;
  }

  getRangeBackground(): string {
    const percent = (this.audioCurrentTime / this.audioDuration) * 100;
    return `linear-gradient(to right, black 0%, black ${percent}%, #ccc ${percent}%, #ccc 100%)`;
  }

  formatTime(seconds: number): string {
    if (!seconds || isNaN(seconds)) return '00:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${this.pad(mins)}:${this.pad(secs)}`;
  }

  pad(num: number): string {
    return num < 10 ? '0' + num : num.toString();
  }

  selectColorOption(index: number): void {
    this.selectedColorOption = index;
    this.mainImage = this.colorOptions[index].image;
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const currentScrollY = window.scrollY;
    const productInfo = document.querySelector('.product-info');
    if (!productInfo) return;

    const rect = productInfo.getBoundingClientRect();
    const isScrollingDown = currentScrollY > this.previousScrollY;

    if (isScrollingDown && rect.top <= window.innerHeight / 2) {
      this.showMoreOptions = true;
    }

    if (!isScrollingDown || rect.top > window.innerHeight / 2) {
      this.showMoreOptions = false;
    }

    this.previousScrollY = currentScrollY;
  }
}