import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-technicalspecifications',
  imports: [CommonModule],
  templateUrl: './technicalspecifications.html',
  styleUrl: './technicalspecifications.css',
})
export class Technicalspecifications implements OnChanges {
  activeSection: string = 'movement';

  @Input() technicalSpecifications: any = {};

  sections = [
    {
      id: 'movement',
      title: 'Movement',
      summary: 'TH31-02',
      icon: 'https://www.tagheuer.com/on/demandware.static/Sites-TAG_INT-Site/-/default/dwa3822232/images/techspec/movement.svg',
      specs: [] as { title: string; value: string }[], 
    },
    {
      id: 'case',
      title: 'Case',
      summary: '41 mm',
      icon: 'https://www.tagheuer.com/on/demandware.static/Sites-TAG_INT-Site/-/default/dwd90d03a8/images/techspec/case.svg',
      specs: [] as { title: string; value: string }[], 
    },
    {
      id: 'strap',
      title: 'Strap/Bracelet',
      summary: 'Steel',
      icon: 'https://www.tagheuer.com/on/demandware.static/Sites-TAG_INT-Site/-/default/dw616daec8/images/techspec/strap.svg',
      specs: [] as { title: string; value: string }[], 
    },
    {
      id: 'dial',
      title: 'Dial',
      summary: 'Sunray Brushed',
      icon: 'https://www.tagheuer.com/on/demandware.static/Sites-TAG_INT-Site/-/default/dw391e2b3e/images/techspec/dial.svg',
      specs: [] as { title: string; value: string }[], 
    },
  ];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['technicalSpecifications'] && this.technicalSpecifications) {
      this.populateSpecs();
    }
  }

  populateSpecs(): void {
    this.sections.forEach((section) => {
      if (this.technicalSpecifications[section.id]) {
        section.specs = this.technicalSpecifications[section.id].map(
          (specItem: any) => ({
            title: specItem.name,
            value: specItem.description,
          })
        );
      }
    });
  }

  toggleSection(sectionId: string) {
    this.activeSection = this.activeSection === sectionId ? '' : sectionId;
  }

  isActive(sectionId: string): boolean {
    return this.activeSection === sectionId;
  }

  getActiveSpecs() {
    const activeSection = this.sections.find(
      (section) => section.id === this.activeSection
    );
    return activeSection ? activeSection.specs : [];
  }
}