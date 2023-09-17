import { Injectable } from '@nestjs/common';
import { db, Order } from '../db';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class OrdersService {
  public getAll(): Order[] {
    return db.orders;
  }
  public getOrderById(id: Order['id']): Order | null {
    return db.orders.find((order) => order.id === id);
  }

  public deleteOrderById(id: Order['id']): boolean | void {
    db.orders.filter((order) => order.id !== id);
  }

  public create(orderData: Omit<Order, 'id'>): Order {
    const newOrder = { ...orderData, id: uuidv4() };
    db.orders.push(newOrder);
    return newOrder;
  }

  public updateById(orderId: Order['id'], orderData: Omit<Order, 'id'>): void {
    db.orders = db.orders.map((order) => {
      if (order.id === orderId) {
        return { ...order, ...orderData };
      }
      return order;
    });
  }
}
