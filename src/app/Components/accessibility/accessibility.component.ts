import { Component } from '@angular/core';

@Component({
  selector: 'app-accessibility',
  standalone: true,
  imports: [],
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
}
