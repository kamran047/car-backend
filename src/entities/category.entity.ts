import { AutoIncrement, BelongsTo, BelongsToMany, Column, ForeignKey, HasMany, HasOne, Model, PrimaryKey, Table, Unique } from "sequelize-typescript";
import { Car } from "./car.entity";
@Table({
    timestamps: true
})
export class Category extends Model {
    @PrimaryKey
    @AutoIncrement
    @Unique
    @Column
    id: number

    @Column
    category_name: string

    @HasMany(() => Car)
    car: Car[]
}
