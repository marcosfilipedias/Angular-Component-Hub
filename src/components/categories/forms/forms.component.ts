
import { Component, ChangeDetectionStrategy, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule]
})
export class FormsComponent {
  themeService = inject(ThemeService);
  
  baseInputClass = 'block w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm placeholder-slate-400 focus:outline-none';

  focusClasses = computed(() => {
    const color = this.themeService.primaryColor();
    return `focus:ring-2 focus:ring-${color}-500 focus:border-${color}-500`;
  });

  inputClasses = computed(() => {
    return `${this.baseInputClass} ${this.focusClasses()}`;
  });

  checkboxClasses = computed(() => {
    const color = this.themeService.primaryColor();
    return `h-4 w-4 rounded border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-${color}-600 focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-900 focus:ring-${color}-500`;
  });

  buttonClasses = computed(() => {
    const color = this.themeService.primaryColor();
    return `flex w-full justify-center rounded-md bg-${color}-600 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-${color}-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-${color}-600`;
  });

  // --- Custom Date Picker State ---
  isStartDatePickerOpen = signal(false);
  isEndDatePickerOpen = signal(false);

  selectedStartDate = signal<Date | null>(null);
  selectedEndDate = signal<Date | null>(null);

  calendarDate = signal(new Date()); // The month/year being viewed in the calendar
  
  calendarMonthYear = computed(() => {
    return this.calendarDate().toLocaleString('en-US', { month: 'long', year: 'numeric' });
  });
  
  weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  isSameDay(date1: Date | null, date2: Date | null): boolean {
    if (!date1 || !date2) return false;
    return date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getDate() === date2.getDate();
  }

  calendarDays = computed(() => {
    const date = this.calendarDate();
    const year = date.getFullYear();
    const month = date.getMonth();

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    const daysInMonth = lastDayOfMonth.getDate();
    const startDayOfWeek = firstDayOfMonth.getDay();

    const days: { date: Date, isCurrentMonth: boolean }[] = [];

    // Add padding days from the previous month
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = startDayOfWeek; i > 0; i--) {
      days.push({ date: new Date(year, month - 1, prevMonthLastDay - i + 1), isCurrentMonth: false });
    }

    // Add days for the current month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({ date: new Date(year, month, i), isCurrentMonth: true });
    }

    // Add padding days from the next month
    const endDayOfWeek = lastDayOfMonth.getDay();
    for (let i = 1; i < 7 - endDayOfWeek; i++) {
      days.push({ date: new Date(year, month + 1, i), isCurrentMonth: false });
    }
    
    return days.map(d => ({
        ...d,
        isToday: this.isSameDay(d.date, new Date()),
        isSelected: this.isSameDay(d.date, this.selectedStartDate()) || this.isSameDay(d.date, this.selectedEndDate())
    }));
  });

  selectedDayClasses = computed(() => {
    const color = this.themeService.primaryColor();
    return `bg-${color}-600 text-white hover:bg-${color}-500`;
  });

  todayRingClass = computed(() => {
    const color = this.themeService.primaryColor();
    return `ring-${color}-500`;
  });

  formatDate(date: Date | null): string {
      if (!date) return 'Select date';
      return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  }
  
  toggleDatePicker(picker: 'start' | 'end') {
    if (picker === 'start') {
      this.isStartDatePickerOpen.update(v => !v);
      this.isEndDatePickerOpen.set(false);
      this.calendarDate.set(this.selectedStartDate() || new Date());
    } else {
      this.isEndDatePickerOpen.update(v => !v);
      this.isStartDatePickerOpen.set(false);
      this.calendarDate.set(this.selectedEndDate() || this.selectedStartDate() || new Date());
    }
  }

  changeMonth(offset: number) {
    this.calendarDate.update(d => {
      const newDate = new Date(d);
      newDate.setDate(1); // Avoids issues with different month lengths
      newDate.setMonth(newDate.getMonth() + offset);
      return newDate;
    });
  }

  selectDate(day: {date: Date, isCurrentMonth: boolean}, picker: 'start' | 'end') {
    if (!day.isCurrentMonth) {
      this.calendarDate.set(day.date);
      // Do not select date from other months directly, instead, switch the view
      return;
    }
    if (picker === 'start') {
      this.selectedStartDate.set(day.date);
      this.isStartDatePickerOpen.set(false);
    } else {
      this.selectedEndDate.set(day.date);
      this.isEndDatePickerOpen.set(false);
    }
  }
}
