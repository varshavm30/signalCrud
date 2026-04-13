import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MATERIAL_IMPORTS } from './shared/const/material';

@Component({
  selector: 'app-root',
  imports: [...MATERIAL_IMPORTS, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('signalCrud');
}
