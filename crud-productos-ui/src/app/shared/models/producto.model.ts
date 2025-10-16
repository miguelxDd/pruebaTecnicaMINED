export interface Stock {
  id?: number;
  cantidad: number;
  ubicacion?: string;
  ultimaActualizacion?: string;
}

export interface Producto {
  id?: number;
  nombre: string;
  descripcion?: string;
  precio: number;
  estado?: boolean;
  fechaCreacion?: string;
  fechaModificacion?: string;
  stock?: Stock;
  // Campos calculados para la vista
  codigo?: string;
  categoria?: string;
  stockTotal?: number;
  stocks?: Stock[];
  almacen?: string;
}

export interface ProductoCreateRequest {
  nombre: string;
  descripcion?: string;
  precio: number;
  stockCantidad: number;
  stockUbicacion?: string;
}

export interface ProductoUpdateRequest {
  nombre?: string;
  descripcion?: string;
  precio?: number;
  stockCantidad?: number;
  stockUbicacion?: string;
}

export interface PageResponse<T> {
  content: T[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      sorted: boolean;
      direction: string;
      orderBy: string[];
    };
  };
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
}