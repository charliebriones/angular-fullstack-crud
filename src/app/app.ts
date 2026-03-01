import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { baseImports } from './shared/base-imports';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, ...baseImports],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
