import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cart: any[] = [];  // เก็บรายการสินค้าในตะกร้า

  // ฟังก์ชันเพิ่มสินค้าไปยังตะกร้า
  addToCart(item: any) {
    const existingItem = this.cart.find(cartItem => cartItem.item_id === item.item_id);
    if (existingItem) {
      existingItem.quantity += Number(item.quantity);  // แปลงเป็นตัวเลขก่อนบวก
    } else {
      this.cart.push({ ...item, quantity: Number(item.quantity) });  // แปลงเป็นตัวเลข
    }
    console.log('Cart:', this.cart);
  }

  // ฟังก์ชันดึงรายการสินค้าทั้งหมดในตะกร้า
  getCart() {
    return this.cart;
  }
}
