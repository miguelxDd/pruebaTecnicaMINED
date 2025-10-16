import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { ProductoService } from '../../shared/services/producto.service';
import { Producto } from '../../shared/models/producto.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-producto-detail',
  standalone: true,
  imports: [SharedModule],
  template: `
    <div class="detail-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Detalle de Producto</mat-card-title>
          <div class="header-actions">
            <button mat-button (click)="goBack()">
              <mat-icon>arrow_back</mat-icon> Volver
            </button>
            <button mat-raised-button color="primary" (click)="editProducto()" *ngIf="producto">
              <mat-icon>edit</mat-icon> Editar
            </button>
          </div>
        </mat-card-header>
        
        <mat-card-content>
          <!-- Indicador de carga -->
          <div *ngIf="loading" class="loading-container">
            <mat-spinner diameter="50"></mat-spinner>
          </div>

          <!-- Mensaje de error -->
          <mat-error *ngIf="error" class="error-message">
            {{ error }}
          </mat-error>

          <!-- Detalles del producto -->
          <div *ngIf="producto && !loading" class="producto-details">
            <mat-list>
              <mat-list-item>
                <span matListItemTitle>ID:</span>
                <span matListItemLine>{{ producto.id }}</span>
              </mat-list-item>
              <mat-divider></mat-divider>

              <mat-list-item>
                <span matListItemTitle>Nombre:</span>
                <span matListItemLine>{{ producto.nombre }}</span>
              </mat-list-item>
              <mat-divider></mat-divider>

              <mat-list-item *ngIf="producto.descripcion">
                <span matListItemTitle>Descripción:</span>
                <span matListItemLine>{{ producto.descripcion }}</span>
              </mat-list-item>
              <mat-divider *ngIf="producto.descripcion"></mat-divider>

              <mat-list-item>
                <span matListItemTitle>Precio:</span>
                <span matListItemLine>{{ producto.precio | currency:'USD' }}</span>
              </mat-list-item>
              <mat-divider></mat-divider>

              <mat-list-item>
                <span matListItemTitle>Estado:</span>
                <span matListItemLine>
                  <mat-chip [color]="producto.estado ? 'primary' : 'warn'">
                    {{ producto.estado ? 'Activo' : 'Inactivo' }}
                  </mat-chip>
                </span>
              </mat-list-item>
              <mat-divider></mat-divider>

              <mat-list-item>
                <span matListItemTitle>Fecha de Creación:</span>
                <span matListItemLine>{{ producto.fechaCreacion | date:'medium' }}</span>
              </mat-list-item>
            </mat-list>

            <!-- Sección de Stock -->
            <div class="stock-section" *ngIf="producto.stock">
              <h3>Información de Stock</h3>
              <mat-list>
                <mat-list-item>
                  <span matListItemTitle>Cantidad:</span>
                  <span matListItemLine>{{ producto.stock.cantidad }}</span>
                </mat-list-item>
                <mat-divider></mat-divider>

                <mat-list-item *ngIf="producto.stock.ubicacion">
                  <span matListItemTitle>Ubicación:</span>
                  <span matListItemLine>{{ producto.stock.ubicacion }}</span>
                </mat-list-item>
                <mat-divider *ngIf="producto.stock.ubicacion"></mat-divider>

                <mat-list-item *ngIf="producto.stock.ultimaActualizacion">
                  <span matListItemTitle>Última Actualización:</span>
                  <span matListItemLine>{{ producto.stock.ultimaActualizacion | date:'medium' }}</span>
                </mat-list-item>
              </mat-list>
            </div>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .detail-container {
      padding: 24px;
      max-width: 800px;
      margin: 0 auto;
    }

    mat-card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }

    .header-actions {
      display: flex;
      gap: 10px;
    }

    .loading-container {
      display: flex;
      justify-content: center;
      padding: 40px;
    }

    .error-message {
      padding: 20px;
      text-align: center;
      display: block;
    }

    .producto-details {
      padding: 20px 0;
    }

    mat-list-item {
      margin-bottom: 10px;
    }

    mat-list-item span[matListItemTitle] {
      font-weight: bold;
      color: #555;
      min-width: 180px;
      display: inline-block;
    }

    .stock-section {
      margin-top: 30px;
    }

    .stock-section h3 {
      margin-bottom: 15px;
      color: #333;
    }

    .stock-table {
      width: 100%;
      margin-top: 10px;
    }

    .stock-table th {
      font-weight: bold;
    }
  `]
})
export class ProductoDetailComponent implements OnInit {
  producto: Producto | null = null;
  loading = false;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productoService: ProductoService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadProducto(+id);
    }
  }

  loadProducto(id: number): void {
    this.loading = true;
    this.error = null;

    this.productoService.getById(id).subscribe({
      next: (producto) => {
        this.producto = producto;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar producto:', err);
        this.loading = false;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo cargar el producto. Por favor, intente nuevamente.',
          confirmButtonColor: '#3f51b5'
        }).then(() => {
          this.router.navigate(['/productos']);
        });
      }
    });
  }

  editProducto(): void {
    if (this.producto?.id) {
      this.router.navigate(['/productos', this.producto.id, 'editar']);
    }
  }

  goBack(): void {
    this.router.navigate(['/productos']);
  }
}