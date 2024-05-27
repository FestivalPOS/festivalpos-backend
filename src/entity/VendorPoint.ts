import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn, JoinTable } from 'typeorm';
import { Product } from './Product';
import { VendorPointProduct } from './VendorPointProducts';

@Entity('sales_stands')
export class VendorPoints {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => VendorPointProduct, vendorPointProduct => vendorPointProduct.vendorPoint)
  vendorPointProducts: VendorPointProduct[];
}