import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity('product')
export class ProductEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    title: string;

    @Column()
    imgUrl: string;

    @Column()
    description: string;

    @Column('decimal', { precision: 10, scale: 2 })
    discountPrice: number;

    @Column('decimal', { precision: 10, scale: 2 })
    price: number;

    @CreateDateColumn({default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date;

    @UpdateDateColumn({default: () => 'CURRENT_TIMESTAMP'})
    updatedAt: Date;
}