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
      existingItem.quantity += item.quantity;  // เพิ่มจำนวนถ้าสินค้าซ้ำ
    } else {
      this.cart.push(item);  // เพิ่มสินค้าใหม่
    }
    console.log('Cart:', this.cart);  // ตรวจสอบตะกร้าผ่าน console
  }

  // ฟังก์ชันดึงรายการสินค้าทั้งหมดในตะกร้า
  getCart() {
    return this.cart;
  }
}
