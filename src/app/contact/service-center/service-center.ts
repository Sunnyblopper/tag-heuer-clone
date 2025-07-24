import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-service-center',
  imports: [CommonModule],
  templateUrl: './service-center.html',
  styleUrl: './service-center.css',
})
export class ServiceCenter implements OnInit{
  currentIndex: number = 0;
  intervalId: any;

  slides = [
    {
      title: 'Find a Service Center',
      description:
        'Among more than 100 TAG Heuer authorized service centers. Whatever your need, a watchmaker TAG Heuer will watch over your watch.',
      link: '#',
      image:
        'https://www.tagheuer.com/on/demandware.static/-/Library-Sites-TagHeuer-Shared/default/dw195ff52e/images/ContactUs/workshop_slider1.jpg',
    },
    {
      title: 'Take Care of your watch',
      description:
        'TAG Heuer will follow your watch for its entire journey with you. We provide maintenance services as well as tailor-made operations.',
      link: '#',
      image:
        'https://www.tagheuer.com/on/demandware.static/-/Library-Sites-TagHeuer-Shared/default/dw6ae95453/images/ContactUs/watch_microfiber_slider2.jpg',
    },
    {
      title: 'Warranty',
      description:
        'Your TAG Heuer watch is covered by the Limited International Warranty for 24 months from the date of purchase.',
      link: '#',
      image:
        'https://www.tagheuer.com/on/demandware.static/-/Library-Sites-TagHeuer-Shared/default/dw93cbf621/images/ContactUs/SAV_new_case_slider3.jpg',
    },
    {
      title: 'DOWNLOADS',
      description:
        'Find our catalogue, TAG Heuer Connected Watch instructions and warranty cards on our download page.',
      link: '#',
      image:
        'https://www.tagheuer.com/on/demandware.static/-/Library-Sites-TagHeuer-Shared/default/dw6ca5309d/images/ContactUs/download_slider4.jpg',
    },
  ];

  ngOnInit() {
    this.intervalId = setInterval(() => {
      this.goToNext();
    }, 3000);
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  goToPrev() {
    this.currentIndex =
      this.currentIndex === 0 ? this.slides.length - 1 : this.currentIndex - 1;
  }

  goToNext() {
    this.currentIndex =
      this.currentIndex === this.slides.length - 1 ? 0 : this.currentIndex + 1;
  }

  goToSlide(index: number) {
    this.currentIndex = index;
  }
}
