export interface Item {
    item_id: number;
    item_name: string;
    price: number;
    image_url: string;
    quantity?: number;  // กำหนดให้ quantity เป็น optional
  }