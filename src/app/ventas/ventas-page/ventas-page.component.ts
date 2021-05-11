import { Component, OnInit } from '@angular/core';
import { Product } from '../model/product';
import { ProductService } from '../services/product.service';
import { ConfirmationService, MessageService } from 'primeng/api';


@Component({
  selector: 'app-ventas-page',
  templateUrl: './ventas-page.component.html',
  styleUrls: ['./ventas-page.component.css']
})


export class VentasPageComponent implements OnInit {

  //variables a utilizar
  displayBasic: boolean = false;
  productos: Product[] = [];
  producto : Product = {};
  dateStr : string = "";
  selectedProductos: Product[] = [];



  // inyectaamos el servicop
  constructor(protected service : ProductService,private messageService: MessageService, private confirmationService: ConfirmationService) {}

  //se muestra cuando se ha carga el componente
  ngOnInit(): void {
    this.loadingData();
  }

  // Método para cargar y pintar los productos en la tabla
  loadingData(){
    this.service.getAll().subscribe(response =>{
    this.productos = [...response];
    })
  }

  // Método para mostrar y vaciar los campos de <p-dialog></p-dialog>
  openNew(){
    this.displayBasic = true;
    this.producto = {};
  }

  // Método para convertir la fecha json a Date
  jsonDate(fecha: string){
    this.dateStr = JSON.parse(fecha);
    return new Date(this.dateStr);
  }

  // Método para verificar si un producto ya existe dentro del arreglo de productos
  findIndexById(producto: Product){
    let index = false;
        for (let i = 0; i < this.productos.length; i++) {
            if (this.productos[i].id === producto.id) {
                index = true;
                break;
            }
        }

        return index;
  }

  // Método para crear y actualizar un producto
  createProduct(producto: Product){
    // verificamos si el producto ya existe
    let resp = this.findIndexById(producto)
      if(resp){
        // Si existe lo actualizamos
        this.service.update(producto).subscribe(() =>{
        this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Updated', life: 3000});
        this.loadingData();
         })
      }else{
        // Si no existe se crea
        this.service.create(producto).subscribe(() =>{
          this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Created', life: 3000});
          this.loadingData();
          console.log(this.productos.length)
        })
      }
      // ocultamos el diálogo
      this.displayBasic = false
  }

  // Método para editar el producto
  editProduct(product : Product){
    // convertimos la fecha string tipo json a tipo Date
    product.startDate = this.jsonDate(`\"${product.startDate}\"`);
    // asignamos los valores del producto que nos envia el usuario
    this.producto = { ...product}
    this.displayBasic = true;
  }

  // Método para borrar un producto
  confirmDelete(event: Event, producto : Product) {
    this.confirmationService.confirm({
        target: event.target!,
        message: `Está seguro que quiere eliminar ${producto.name}?`,
        icon: 'pi pi-exclamation-triangle',
        // ejecutamos la accion de borrar
        accept: () => {
          this.service.delete(producto).subscribe(()=>{
            this.messageService.add({severity:'success', detail: 'Producto eliminado con éxito', life: 3000});
            this.loadingData();
           })
        },
        // abortamos la acción borrar
        reject: () => {
            this.messageService.add({severity:'error', detail:'Operacion cancelada'});
        }
    });
  }

  deleteSelectedProducts(event: Event){
    this.confirmationService.confirm({
      target: event.target!,
      message: `Está seguro que quiere eliminar esos productos?`,
      icon: 'pi pi-exclamation-triangle',
      // ejecutamos la accion de borrar
      accept: () => {
        // borramos los productos selecionados de manera individual
        for(let product of this.selectedProductos){
          this.service.delete(product).subscribe(()=>{
            this.messageService.add({severity:'success', detail: 'Producto eliminado con éxito', life: 3000});
            this.loadingData();
           })
        }
      },
      // abortamos la acción borrar
      reject: () => {
          this.messageService.add({severity:'error', detail:'Operacion cancelada'});
      }
    });
  }
}
