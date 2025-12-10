import { Component, ChangeDetectionStrategy, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService, ColorPalette } from '../../../services/theme.service';
import { ColorMapService } from '../../../services/color-map.service';

// Since jsPDF is loaded from a script tag, we declare its global variable.
declare const jspdf: any;

@Component({
  selector: 'app-pdf-export',
  templateUrl: './pdf-export.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  standalone: true
})
export class PdfExportComponent {
  themeService = inject(ThemeService);
  colorMapService = inject(ColorMapService);

  buttonClass = computed(() => {
    const color = this.themeService.primaryColor();
    return `w-full flex items-center justify-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white`;
  });

  generatePdf() {
    // FIX: Access jsPDF from the declared global 'jspdf' variable, which is attached to the window object by the script tag.
    const { jsPDF } = jspdf;
    const doc = new jsPDF();
    const primaryColorName = this.themeService.primaryColor();
    const currentTheme = this.themeService.theme();

    let yPos = 20; // Initial Y position

    // --- Helper function to draw a palette ---
    const drawPalette = (title: string, colorName: ColorPalette, startY: number): number => {
      let y = startY;
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      doc.text(title, 14, y);
      y += 8;

      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(100);
      doc.text('Swatch', 14, y);
      doc.text('Tailwind Class', 35, y);
      doc.text('Hex Code', 100, y);
      y += 2;
      doc.setDrawColor(200);
      doc.line(14, y, 190, y); // separator line
      y += 8;

      const shades = this.colorMapService.getColorShades(colorName);
      for (const shade in shades) {
        if (Object.prototype.hasOwnProperty.call(shades, shade)) {
          const hex = shades[shade as any];

          // Check for page break
          if (y > 270) {
            doc.addPage();
            y = 20;
          }
          
          doc.setFillColor(hex);
          doc.rect(14, y - 4, 15, 10, 'F');
          
          doc.setTextColor(50);
          doc.setFont('courier', 'normal');
          doc.text(`bg-${colorName}-${shade}`, 35, y);
          doc.text(hex, 100, y);

          y += 12;
        }
      }
      return y + 10; // Return new Y position with extra space
    };

    // --- PDF Content ---
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    const title = `Color Palette Guide (${currentTheme.charAt(0).toUpperCase() + currentTheme.slice(1)} Theme)`;
    doc.text(title, 14, yPos);
    yPos += 12;

    // Draw Palettes
    yPos = drawPalette(`Primary: ${primaryColorName.charAt(0).toUpperCase() + primaryColorName.slice(1)}`, primaryColorName, yPos);
    yPos = drawPalette('Neutral: Slate', 'slate', yPos);
    yPos = drawPalette('Semantic: Success (Green)', 'green', yPos);
    yPos = drawPalette('Semantic: Danger (Red)', 'red', yPos);
    yPos = drawPalette('Semantic: Warning (Amber)', 'amber', yPos);

    // --- Save the PDF ---
    doc.save(`color-palette-${primaryColorName}-${currentTheme}.pdf`);
  }
}
