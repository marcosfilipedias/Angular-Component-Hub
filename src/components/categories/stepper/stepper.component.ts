
import { Component, ChangeDetectionStrategy, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule]
})
export class StepperComponent {
  themeService = inject(ThemeService);
  currentStep = signal(1);
  steps = [
    { id: 1, name: 'Job Details', description: 'Provide job details.' },
    { id: 2, name: 'Application Form', description: 'Fill out the form.' },
    { id: 3, name: 'Preview', description: 'Review your application.' }
  ];

  buttonClasses = computed(() => {
    const color = this.themeService.primaryColor();
    return `bg-${color}-600 hover:bg-${color}-500 text-white font-semibold py-2 px-4 rounded-md`;
  });
  
  secondaryButtonClasses = `bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-100 font-semibold py-2 px-4 rounded-md`;

  goToStep(step: number) {
    this.currentStep.set(step);
  }

  nextStep() {
    this.currentStep.update(step => (step < this.steps.length) ? step + 1 : step);
  }
  
  prevStep() {
    this.currentStep.update(step => (step > 1) ? step - 1 : step);
  }
}
