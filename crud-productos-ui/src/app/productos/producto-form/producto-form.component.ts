import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { ProductoService } from '../../shared/services/producto.service';
import { Producto } from '../../shared/models/producto.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-producto-form',
  standalone: true,
  imports: [SharedModule],
  template: `
    <div class="form-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>{{ isEditMode ? 'Editar' : 'Nuevo' }} Producto</mat-card-title>
          <button mat-button (click)="goBack()">
            <mat-icon>arrow_back</mat-icon> Volver
          </button>
        </mat-card-header>
        
        <mat-card-content>
          <!-- Indicador de carga -->
          <div *ngIf="loading" class="loading-container">
            <mat-spinner diameter="50"></mat-spinner>
          </div>

          <!-- Formulario -->
          <form [formGroup]="productoForm" (ngSubmit)="onSubmit()" *ngIf="!loading">
            <div class="form-fields">
              <!-- Nombre -->
              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Nombre</mat-label>
                <input matInput formControlName="nombre" placeholder="Nombre del producto">
                <mat-error *ngIf="productoForm.get('nombre')?.hasError('required')">
                  El nombre es requerido
                </mat-error>
                <mat-error *ngIf="productoForm.get('nombre')?.hasError('maxlength')">
                  El nombre no puede exceder 150 caracteres
                </mat-error>
              </mat-form-field>

              <!-- Descripción -->
              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Descripción</mat-label>
                <textarea matInput formControlName="descripcion" 
                          placeholder="Descripción del producto"
                          rows="4"></textarea>
                <mat-error *ngIf="productoForm.get('descripcion')?.hasError('maxlength')">
                  La descripción no puede exceder 10000 caracteres
                </mat-error>
              </mat-form-field>

              <!-- Precio -->
              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Precio</mat-label>
                <input matInput type="number" formControlName="precio" 
                       placeholder="0.00" step="0.01">
                <span matPrefix>$&nbsp;</span>
                <mat-error *ngIf="productoForm.get('precio')?.hasError('required')">
                  El precio es requerido
                </mat-error>
                <mat-error *ngIf="productoForm.get('precio')?.hasError('min')">
                  El precio debe ser mayor o igual a 0
                </mat-error>
              </mat-form-field>

              <!-- Stock Cantidad -->
              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Cantidad en Stock</mat-label>
                <input matInput type="number" formControlName="stockCantidad" 
                       placeholder="0">
                <mat-error *ngIf="productoForm.get('stockCantidad')?.hasError('required')">
                  La cantidad es requerida
                </mat-error>
                <mat-error *ngIf="productoForm.get('stockCantidad')?.hasError('min')">
                  La cantidad debe ser mayor o igual a 0
                </mat-error>
              </mat-form-field>

              <!-- Stock Ubicación -->
              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Ubicación</mat-label>
                <input matInput formControlName="stockUbicacion" 
                       placeholder="Ubicación del stock (opcional)">
                <mat-error *ngIf="productoForm.get('stockUbicacion')?.hasError('maxlength')">
                  La ubicación no puede exceder 100 caracteres
                </mat-error>
              </mat-form-field>
            </div>

            <!-- Mensajes de error -->
            <mat-error *ngIf="error" class="error-message">
              {{ error }}
            </mat-error>

            <!-- Botones de acción -->
            <div class="form-actions">
              <button mat-button type="button" (click)="goBack()">
                Cancelar
              </button>
              <button mat-raised-button color="primary" type="submit" 
                      [disabled]="!productoForm.valid || saving">
                <mat-spinner diameter="20" *ngIf="saving"></mat-spinner>
                <span *ngIf="!saving">{{ isEditMode ? 'Actualizar' : 'Crear' }}</span>
              </button>
            </div>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .form-container {
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

    .loading-container {
      display: flex;
      justify-content: center;
      padding: 40px;
    }

    .form-fields {
      display: flex;
      flex-direction: column;
      gap: 16px;
      margin-top: 20px;
    }

    .full-width {
      width: 100%;
    }

    .error-message {
      padding: 20px;
      text-align: center;
      display: block;
      margin: 20px 0;
    }

    .form-actions {
      display: flex;
      justify-content: flex-end;
      gap: 10px;
      margin-top: 20px;
      padding-top: 20px;
      border-top: 1px solid #e0e0e0;
    }

    button mat-spinner {
      display: inline-block;
      margin-right: 8px;
    }
  `]
})
export class ProductoFormComponent implements OnInit {
  productoForm: FormGroup;
  isEditMode = false;
  productoId: number | null = null;
  loading = false;
  saving = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private productoService: ProductoService
  ) {
    this.productoForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(150)]],
      descripcion: ['', [Validators.maxLength(10000)]],
      precio: [0, [Validators.required, Validators.min(0)]],
      stockCantidad: [0, [Validators.required, Validators.min(0)]],
      stockUbicacion: ['', [Validators.maxLength(100)]]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.productoId = +id;
      this.loadProducto(this.productoId);
    }
  }

  loadProducto(id: number): void {
    this.loading = true;
    this.error = null;

    this.productoService.getById(id).subscribe({
      next: (producto) => {
        this.productoForm.patchValue({
          nombre: producto.nombre,
          descripcion: producto.descripcion || '',
          precio: producto.precio,
          stockCantidad: producto.stock?.cantidad || 0,
          stockUbicacion: producto.stock?.ubicacion || ''
        });
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

  onSubmit(): void {
    if (this.productoForm.valid) {
      this.saving = true;
      this.error = null;

      const formValue = this.productoForm.value;
      const request = {
        nombre: formValue.nombre,
        descripcion: formValue.descripcion || null,
        precio: formValue.precio,
        stockCantidad: formValue.stockCantidad,
        stockUbicacion: formValue.stockUbicacion || null
      };

      const operation = this.isEditMode && this.productoId
        ? this.productoService.update(this.productoId, request)
        : this.productoService.create(request);

      operation.subscribe({
        next: (producto) => {
          this.saving = false;
          Swal.fire({
            icon: 'success',
            title: '¡Éxito!',
            text: this.isEditMode 
              ? 'El producto ha sido actualizado correctamente.' 
              : 'El producto ha sido creado correctamente.',
            confirmButtonColor: '#3f51b5',
            timer: 2000,
            showConfirmButton: false
          }).then(() => {
            // Si es edicion, ir al detalle. Si es creación, ir a la lista
            if (this.isEditMode) {
              this.router.navigate(['/productos', producto.id]);
            } else {
              this.router.navigate(['/productos']);
            }
          });
        },
        error: (err) => {
          console.error('Error al guardar producto:', err);
          this.saving = false;
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo guardar el producto. Por favor, verifique los datos e intente nuevamente.',
            confirmButtonColor: '#3f51b5'
          });
        }
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/productos']);
  }
}