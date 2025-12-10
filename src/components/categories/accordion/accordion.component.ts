
import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule]
})
export class AccordionComponent {
  openPanel = signal<number | null>(1);

  accordionItems = [
    {
      id: 1,
      title: 'What is the component hub?',
      content: 'This is a centralized platform for showcasing UI components built with Angular and styled with Tailwind CSS. It allows developers to quickly find, preview, and copy components for their projects.'
    },
    {
      id: 2,
      title: 'How do I use a component?',
      content: 'Simply navigate to the component category you are interested in. You will find different variations of the component. The HTML and TypeScript code is designed to be easily understandable and reusable. Just copy the code into your own Angular project.'
    },
    {
      id: 3,
      title: 'Can I change the primary color?',
      content: 'Yes! Use the color palette selector in the top navigation bar to change the primary accent color used across all components in real-time. This helps in visualizing how the components would fit into your own application\'s theme.'
    }
  ];

  togglePanel(id: number) {
    this.openPanel.update(current => current === id ? null : id);
  }
}
