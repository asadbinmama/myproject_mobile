import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';  // นำเข้า CartService

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.page.html',
  styleUrls: ['./order-summary.page.scss'],
})
export class OrderSummaryPage implements OnInit {

  cart: any[] = [];  // เก็บรายการสินค้าในตะกร้า
  totalAmount: number = 0;  // เก็บจำนวนเงินรวม
  cartItems: any[] = [];

  constructor(private router: Router,private cartService: CartService) { 
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state) {
      this.cart = navigation.extras.state['cart'];  // รับข้อมูลตะกร้าจาก state
      this.calculateTotal();  // คำนวณราคาทั้งหมด
    }
  }

  ngOnInit() {}

  // ฟังก์ชันคำนวณยอดรวม
  calculateTotal() {
    this.totalAmount = this.cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  }

  // ฟังก์ชันยืนยันการสั่งซื้อ
  confirmOrder() {
    console.log('ยืนยันการสั่งซื้อ', this.cart);
    // สามารถทำ API call เพื่อส่งข้อมูลการสั่งซื้อไปที่ backend ได้ที่นี่
  }
  ionViewWillEnter() {
    this.cartItems = this.cartService.getCart();  // ดึงข้อมูลสินค้าที่อยู่ในตะกร้ามาแสดง
  }

}
