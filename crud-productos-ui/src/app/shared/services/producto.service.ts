import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { 
  Producto, 
  ProductoCreateRequest, 
  ProductoUpdateRequest, 
  PageResponse 
} from '../models/producto.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private readonly apiUrl = `${environment.apiUrl}/productos`;

  constructor(private http: HttpClient) { }

  /**
   * Crear un nuevo producto
   */
  create(producto: ProductoCreateRequest): Observable<Producto> {
    return this.http.post<Producto>(this.apiUrl, producto);
  }

  /**
   * Obtener lista paginada de productos
   */
  list(page: number = 0, size: number = 10, sort: string = 'id', query?: string): Observable<PageResponse<Producto>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', sort);
    
    if (query && query.trim()) {
      params = params.set('q', query.trim());
    }

    return this.http.get<PageResponse<Producto>>(this.apiUrl, { params });
  }

  /**
   * Obtener producto por ID
   */
  getById(id: number): Observable<Producto> {
    return this.http.get<Producto>(`${this.apiUrl}/${id}`);
  }

  /**
   * Actualizar producto
   */
  update(id: number, producto: ProductoUpdateRequest): Observable<Producto> {
    return this.http.put<Producto>(`${this.apiUrl}/${id}`, producto);
  }

  /**
   * Eliminar producto lógicamente
   */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}