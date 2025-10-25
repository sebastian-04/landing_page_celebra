import {Component, HostListener, signal} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NgOptimizedImage} from '@angular/common';
import * as L from 'leaflet';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgOptimizedImage],
  templateUrl: './index.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('test');
  ngAfterViewInit(): void {
    const map = L.map('map').setView([51.505, -0.09], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // Agregar un marcador de ejemplo
    L.marker([51.505, -0.09]).addTo(map)
      .bindPopup('¡Hola desde Leaflet!')
      .openPopup();
  }
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const fondo2 = document.querySelector('.cuerpo-fondo-2') as HTMLElement;
    const footer = document.querySelector('.footer') as HTMLElement;

    if (!fondo2 || !footer) return;

    const footerTop = footer.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    // Cuando el footer empieza a aparecer:
    if (footerTop < windowHeight + 100) {
      // Obtener su posición actual antes de cambiarla
      const fondoRect = fondo2.getBoundingClientRect();
      const scrollY = window.scrollY;

      // Calcular la posición absoluta exacta donde estaba
      const absoluteTop = fondoRect.top + scrollY;

      fondo2.style.position = 'absolute';
      fondo2.style.top = `${absoluteTop}px`;
      fondo2.style.bottom = 'auto';
    } else {
      fondo2.style.position = 'fixed';
      fondo2.style.bottom = '-175px';
      fondo2.style.top = 'auto';
    }
    }
}
