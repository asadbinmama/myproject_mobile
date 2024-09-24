import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';  
import { HttpClient } from '@angular/common/http';  
import { CartService } from '../cart.service';  // นำเข้า CartService


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  items: any[] = [];  // เก็บรายการลูกชิ้น
  cart: any[] = [];  // เก็บรายการในตะกร้า

  constructor(
    private router: Router, 
    private http: HttpClient, 
    private alertController: AlertController, // Inject AlertController
    private cartService: CartService
  ) {}
// ฟังก์ชันดึงข้อมูลลูกชิ้นจาก API
  ionViewWillEnter() {
    this.getMeatballs();
    this.updateCart();  // อัปเดตจำนวนสินค้าที่อยู่ในตะกร้า
  }

  getMeatballs() {
    this.http.get<any[]>('https://std.mcs.psu.ac.th/6420310183/html/get_sod.php?category=ผัก')
      .subscribe(data => {
        this.items = data;
      }, error => {
        console.error('Error fetching data:', error);
      });
  }

  // ฟังก์ชันแสดง Alert เมื่อกดสินค้านั้นๆ
  async presentAlert(item: any) {  // ระบุ type ของ item
    const alert = await this.alertController.create({
      header: item.item_name,  
      subHeader: 'ราคา: ' + item.price + ' บาท',
      inputs: [
        {
          name: 'quantity',
          type: 'number',
          placeholder: 'จำนวน',
          value: 1,  // ตั้งค่าเริ่มต้นเป็น 1
          min: 1
        }
      ],
      buttons: [
        {
          text: 'ยกเลิก',
          role: 'cancel',
          handler: () => {
            console.log('การเพิ่มถูกยกเลิก');
          }
        },
        {
          text: 'เพิ่มไปยังตะกร้า',
          handler: (data) => {
            const quantity = data.quantity || 1;  // จำนวนที่ผู้ใช้ใส่หรือค่าเริ่มต้น
            this.addToCart(item, quantity);  // เรียกฟังก์ชันเพิ่มไปยังตะกร้า
          }
        }
      ]
    });

    await alert.present();
  }

  // ฟังก์ชันเพิ่มสินค้าไปยังตะกร้า
  addToCart(item: any, quantity: number) {  // ระบุ type ของ item และ quantity
    this.cart.push({ ...item, quantity });  // เพิ่มสินค้าพร้อมจำนวนไปยังตะกร้า
    console.log('เพิ่มไปยังตะกร้า:', item, 'จำนวน:', quantity);
    this.updateCart();  // อัปเดตจำนวนสินค้าในตะกร้า
  }

  // ฟังก์ชันอัปเดตจำนวนสินค้าในตะกร้า
  updateCart() {
    this.cart = this.cartService.getCart();  // ดึงข้อมูลตะกร้าจาก CartService
  }

  // ฟังก์ชันไปยังหน้าตะกร้า (มีการประกาศแค่ครั้งเดียว)
  goToCart() {
    this.router.navigate(['/order-summary'], {
      state: { cart: this.cart }  // ส่งข้อมูลตะกร้าไปยังหน้าตะกร้า
    });
  }
}
