import { AutoIncrement, BelongsTo, Column, ForeignKey, HasMany, Model, PrimaryKey, Table, Unique } from "sequelize-typescript";
import { Category } from "./category.entity";
@Table({
    timestamps: true
})
export class Car extends Model {
    @PrimaryKey
    @AutoIncrement
    @Unique
    @Column
    id: number

    @Column
    color: string

    @Column
    model: string

    @Column
    registeration_no: string

    @ForeignKey(() => Category)
    @Column
    category_id: number

    @BelongsTo(() => Category)
    category: Category
}
