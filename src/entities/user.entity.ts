import { AutoIncrement, BelongsTo, BelongsToMany, Column, ForeignKey, HasMany, HasOne, Model, PrimaryKey, Table, Unique } from "sequelize-typescript";
@Table({
    timestamps: true
})
export class User extends Model {
    @PrimaryKey
    @AutoIncrement
    @Unique
    @Column
    id: number

    @Column
    email: string

    @Unique
    @Column
    password: string
}
