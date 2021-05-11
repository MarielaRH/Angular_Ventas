import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../model/product';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import {catchError, retry} from 'rxjs/operators'; // se utiliza para interceptar los datos y capturar error

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Auth-key': 'eyJzZXNzaW9uSWQiOjc1OSwidXNlcm5hbWUiOiJsc29zYUBnbWFpbC5jb20iLCJzdGF0dXMiOiJTIiwiY2xpZW50SWQiOjEsImFsZyI6IkhTNTEyIn0.eyJzdWIiOiIxIiwiZXhwIjoxNjIwNzY3OTYxfQ.SoBiUBWb_XQE46STo2efFVDtE55Yf-8zWAa55kIZYqI2T6l9_XszivoafCrKhpNfdTfn7T_gAnl2F-Pd2U71ZQ'

    })
  }
  // Inyectamos el;modulo http
  constructor( private httpClient : HttpClient) { }

  // Método para realizar una peticion get para obtener todos los productos
  getAll(): Observable <Product[]> {
    return this.httpClient.get<Product[]>(`${environment.backend}/tests`,this.httpHeader)//mandamos el header para decir que vamos hacer una peticion json
    // interceptamos los datos y si hay error lo capturamos con pipe
    .pipe(
      retry(1),
      catchError(this.httpError)
    )
  }


  // Método para realizar una petición post para crear un nuevo producto
  create(product: Product): Observable <Product> {
    return this.httpClient.post<Product>(`${environment.backend}/tests`,JSON.stringify(product),this.httpHeader)
    // interceptamos los datos y si hay error lo capturamos con pipe
    .pipe(
      retry(1),
      catchError(this.httpError)
      )
    }

  //Método para realizar una petición put para actualizar los datos de un producto
  update(product: Product): Observable <Product> {
    return this.httpClient.put<Product>(`${environment.backend}/tests`,JSON.stringify(product),this.httpHeader)//mandamos el header para decir que vamos hacer una peticion json
    // interceptamos los datos y si hay error lo capturamos con pipe
    .pipe(
      retry(1),
      catchError(this.httpError)
    )
  }

  //Método para realizar una petición delete para eliminar un producto
  delete(producto: Product){
    return this.httpClient.delete<Product>(`${environment.backend}/tests/${producto.id}`,this.httpHeader)
    // interceptamos los datos y si hay error lo capturamos con pipe
    .pipe(
      retry(1),
      catchError(this.httpError)
    )
  }


  // Manejamos los errores de las peticiones
  httpError(error:any) {
    let msg = '';
    if(error.error instanceof ErrorEvent) {
      // client side error
      msg = error.error.message;
    } else {
      // server side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(msg);
    return throwError(msg);
  }

}
