import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SharedModule, RouterLink],
  template: `
    <div class="home-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Bienvenido al CRUD de Productos</mat-card-title>
          <mat-card-subtitle>Sistema de gestión de productos con stock</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <p>Este es un sistema completo para la gestión de productos que incluye:</p>
          <ul>
            <li> Crear productos con stock inicial</li>
            <li> Listar productos con información de stock</li>
            <li> Consultar productos por ID</li>
            <li> Actualizar datos de productos y stock</li>
            <li> Eliminar productos lógicamente</li>
          </ul>
        </mat-card-content>
        <mat-card-actions>
          <button mat-raised-button color="primary" routerLink="/productos">
            <mat-icon>inventory</mat-icon>
            Ver Productos
          </button>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: [`
    .home-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 60vh;
      padding: 24px;
    }
    
    mat-card {
      max-width: 600px;
      width: 100%;
    }
    
    mat-card-content ul {
      padding-left: 20px;
    }
    
    mat-card-content ul li {
      margin: 8px 0;
    }
  `]
})
export class HomeComponent { }