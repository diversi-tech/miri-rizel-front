import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { InputSwitchModule } from 'primeng/inputswitch';

@Component({
  selector: 'app-accessibility',
  standalone: true,
  imports: [CommonModule, InputSwitchModule, MatInputModule, FormsModule, MatButtonModule],
  templateUrl: './accessibility.component.html',
  styleUrl: './accessibility.component.css'
})
export class AccessibilityComponent {

  toggleAccessibilityMenu() {
    const menu = document.getElementById('accessibility-menu');
    if (menu) {
      if (menu.classList.contains('hidden')) {
        menu.classList.remove('hidden');
        menu.style.display = 'flex';
      } else {
        menu.classList.add('hidden');
        menu.style.display = 'none';
      }
    }
  }

  toggleHighContrast() {
    document.body.classList.toggle('high-contrast');
  }
}
