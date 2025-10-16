import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { ProductoService } from '../../shared/services/producto.service';
import { Producto } from '../../shared/models/producto.model';
import { PageEvent } from '@angular/material/paginator';
import Swal from 'sweetalert2';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-producto-list',
  standalone: true,
  imports: [SharedModule],
  template: `
    <div class="list-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Lista de Productos</mat-card-title>
          <button mat-raised-button color="primary" (click)="createProducto()">
            <mat-icon>add</mat-icon> Nuevo Producto
          </button>
        </mat-card-header>
        
        <mat-card-content>
          <!-- Barra de búsqueda -->
          <mat-form-field class="search-field">
            <mat-label>Buscar productos</mat-label>
            <input matInput [(ngModel)]="searchQuery" (ngModelChange)="onSearchChange($event)" 
                   placeholder="Escriba para buscar...">
            <mat-icon matSuffix>search</mat-icon>
            <button mat-icon-button matSuffix *ngIf="searchQuery" (click)="clearSearch()" matTooltip="Limpiar búsqueda">
              <mat-icon>close</mat-icon>
            </button>
          </mat-form-field>

          <!-- Indicador de carga -->
          <div *ngIf="loading" class="loading-container">
            <mat-spinner diameter="50"></mat-spinner>
          </div>

          <!-- Mensaje de error -->
          <mat-error *ngIf="error" class="error-message">
            {{ error }}
          </mat-error>

          <!-- Mensaje cuando no hay productos -->
          <div *ngIf="!loading && productos.length === 0 && !searchQuery" class="empty-state">
            <mat-icon class="empty-icon">inventory_2</mat-icon>
            <h2>No hay productos registrados</h2>
            <p>Comience agregando su primer producto al sistema</p>
            <button mat-raised-button color="primary" (click)="createProducto()">
              <mat-icon>add</mat-icon> Crear Primer Producto
            </button>
          </div>

          <!-- Mensaje cuando no hay resultados de búsqueda -->
          <div *ngIf="!loading && productos.length === 0 && searchQuery" class="empty-state">
            <mat-icon class="empty-icon">search_off</mat-icon>
            <h2>No se encontraron resultados</h2>
            <p>No hay productos que coincidan con "{{ searchQuery }}"</p>
            <button mat-button color="primary" (click)="clearSearch()">
              <mat-icon>clear</mat-icon> Limpiar búsqueda
            </button>
          </div>

          <!-- Tabla de productos -->
          <table mat-table [dataSource]="productos" class="productos-table" *ngIf="!loading && productos.length > 0">
            
            <!-- Columna ID -->
            <ng-container matColumnDef="id">
              <th mat-header-cell *matHeaderCellDef>ID</th>
              <td mat-cell *matCellDef="let producto">{{ producto.id }}</td>
            </ng-container>

            <!-- Columna Nombre -->
            <ng-container matColumnDef="nombre">
              <th mat-header-cell *matHeaderCellDef>Nombre</th>
              <td mat-cell *matCellDef="let producto">{{ producto.nombre }}</td>
            </ng-container>

            <!-- Columna Descripción -->
            <ng-container matColumnDef="descripcion">
              <th mat-header-cell *matHeaderCellDef>Descripción</th>
              <td mat-cell *matCellDef="let producto">{{ producto.descripcion || '-' }}</td>
            </ng-container>

            <!-- Columna Precio -->
            <ng-container matColumnDef="precio">
              <th mat-header-cell *matHeaderCellDef>Precio</th>
              <td mat-cell *matCellDef="let producto">{{ producto.precio | currency:'USD' }}</td>
            </ng-container>

            <!-- Columna Stock -->
            <ng-container matColumnDef="stock">
              <th mat-header-cell *matHeaderCellDef>Stock</th>
              <td mat-cell *matCellDef="let producto">{{ producto.stock?.cantidad || 0 }}</td>
            </ng-container>

            <!-- Columna Estado -->
            <ng-container matColumnDef="estado">
              <th mat-header-cell *matHeaderCellDef>Estado</th>
              <td mat-cell *matCellDef="let producto">
                <mat-chip [color]="producto.estado ? 'primary' : 'warn'">
                  {{ producto.estado ? 'Activo' : 'Inactivo' }}
                </mat-chip>
              </td>
            </ng-container>

            <!-- Columna Acciones -->
            <ng-container matColumnDef="acciones">
              <th mat-header-cell *matHeaderCellDef>Acciones</th>
              <td mat-cell *matCellDef="let producto">
                <button mat-icon-button (click)="viewProducto(producto.id)" matTooltip="Ver detalles">
                  <mat-icon>visibility</mat-icon>
                </button>
                <button mat-icon-button (click)="editProducto(producto.id)" matTooltip="Editar">
                  <mat-icon>edit</mat-icon>
                </button>
                <button mat-icon-button color="warn" (click)="deleteProducto(producto)" matTooltip="Eliminar">
                  <mat-icon>delete</mat-icon>
                </button>
              </td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
          </table>

          <!-- Paginador -->
          <mat-paginator 
            [length]="totalElements"
            [pageSize]="pageSize"
            [pageIndex]="currentPage"
            [pageSizeOptions]="[10, 20, 50]"
            (page)="onPageChange($event)"
            showFirstLastButtons
            *ngIf="!loading && productos.length > 0">
          </mat-paginator>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .list-container {
      padding: 24px;
      max-width: 1400px;
      margin: 0 auto;
    }

    mat-card {
      margin-bottom: 20px;
    }

    mat-card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }

    .search-field {
      width: 100%;
      max-width: 400px;
      margin-bottom: 20px;
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

    .productos-table {
      width: 100%;
      margin-top: 20px;
    }

    .productos-table th {
      font-weight: bold;
    }

    .mat-mdc-row:hover {
      background-color: #f5f5f5;
    }

    .mat-column-acciones {
      width: 150px;
      text-align: center;
    }

    mat-paginator {
      margin-top: 20px;
    }

    .empty-state {
      text-align: center;
      padding: 60px 20px;
      
      .empty-icon {
        font-size: 80px;
        width: 80px;
        height: 80px;
        color: #9e9e9e;
        margin-bottom: 20px;
      }

      h2 {
        color: #616161;
        margin-bottom: 10px;
        font-size: 24px;
      }

      p {
        color: #9e9e9e;
        margin-bottom: 30px;
        font-size: 16px;
      }
    }
  `]
})
export class ProductoListComponent implements OnInit, OnDestroy {
  productos: Producto[] = [];
  displayedColumns: string[] = ['id', 'nombre', 'descripcion', 'precio', 'stock', 'estado', 'acciones'];
  
  loading = false;
  error: string | null = null;
  searchQuery = '';
  
  // Paginación
  currentPage = 0;
  pageSize = 20;
  totalElements = 0;

  // Para búsqueda dinámica
  private searchSubject = new Subject<string>();

  constructor(
    private productoService: ProductoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProductos();
    
    // Configurar búsqueda dinámica con debounce
    this.searchSubject.pipe(
      debounceTime(500), // Esperar 500ms después de que el usuario deje de escribir
      distinctUntilChanged() // Solo buscar si el valor cambió
    ).subscribe(searchTerm => {
      this.currentPage = 0; // Resetear a la primera página
      this.loadProductos();
    });
  }

  ngOnDestroy(): void {
    this.searchSubject.complete();
  }

  onSearchChange(searchTerm: string): void {
    this.searchSubject.next(searchTerm);
  }

  clearSearch(): void {
    this.searchQuery = '';
    this.currentPage = 0;
    this.loadProductos();
  }

  loadProductos(): void {
    this.loading = true;
    this.error = null;

    this.productoService.list(this.currentPage, this.pageSize, 'id', this.searchQuery)
      .subscribe({
        next: (response) => {
          this.productos = response.content;
          this.totalElements = response.totalElements;
          this.loading = false;
        },
        error: (err) => {
          console.error('Error al cargar productos:', err);
          this.loading = false;
          Swal.fire({
            icon: 'error',
            title: 'Error al cargar productos',
            text: 'No se pudieron cargar los productos. Por favor, intente nuevamente.',
            confirmButtonColor: '#3f51b5'
          });
        }
      });
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadProductos();
  }

  createProducto(): void {
    this.router.navigate(['/productos/nuevo']);
  }

  viewProducto(id: number): void {
    this.router.navigate(['/productos', id]);
  }

  editProducto(id: number): void {
    this.router.navigate(['/productos', id, 'editar']);
  }

  deleteProducto(producto: Producto): void {
    Swal.fire({
      title: '¿Está seguro?',
      text: `¿Desea eliminar el producto "${producto.nombre}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3f51b5',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed && producto.id) {
        this.productoService.delete(producto.id).subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: '¡Eliminado!',
              text: 'El producto ha sido eliminado correctamente.',
              confirmButtonColor: '#3f51b5',
              timer: 2000,
              showConfirmButton: false
            });
            this.loadProductos();
          },
          error: (err) => {
            console.error('Error al eliminar producto:', err);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'No se pudo eliminar el producto. Por favor, intente nuevamente.',
              confirmButtonColor: '#3f51b5'
            });
          }
        });
      }
    });
  }
}