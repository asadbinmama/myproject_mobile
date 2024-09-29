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

  constructor(private router: Router, private cartService: CartService) { }

  ngOnInit() {}

  // ฟังก์ชันที่เรียกเมื่อเข้ามายังหน้า (ทุกครั้งที่เข้ามาใหม่)
  ionViewWillEnter() {
    this.cart = this.cartService.getCart();  // ดึงข้อมูลตะกร้าจาก CartService
    this.calculateTotal();  // คำนวณยอดรวม
  }

  // ฟังก์ชันคำนวณยอดรวม
  calculateTotal() {
    this.totalAmount = this.cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  }

  // ฟังก์ชันยืนยันการสั่งซื้อ
  confirmOrder() {
    console.log('ยืนยันการสั่งซื้อ', this.cart);
    // สามารถทำ API call เพื่อส่งข้อมูลการสั่งซื้อไปที่ backend ได้ที่นี่
  }
}
