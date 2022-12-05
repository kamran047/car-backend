import { Injectable, HttpStatus, NotFoundException } from '@nestjs/common';
import { GenericResponseDto } from 'src/dtos/response/generic.reponse.dto';
import { Car } from 'src/entities/car.entity';
import { Category } from 'src/entities/category.entity';
import { sequelize } from '../utils/sequelize.connection.instance';

@Injectable()
export class CarsService {
    private carRepository;
    constructor() {
        this.carRepository = sequelize.getRepository(Car);
    }

    async createCar(body) {
        const result = await this.carRepository.create(
            body
        );
        if (!result) {
            return new GenericResponseDto(HttpStatus.INTERNAL_SERVER_ERROR, 'Unable to create Car');
        }
        return new GenericResponseDto(
            HttpStatus.CREATED,
            'Car Created Successfully',
            result,
        );
    }

    async getAllCars() {
        const result = await this.carRepository.findAll({
            include: [
                {
                    model: Category,
                    required: true
                }
            ],
            attributes: { exclude: ['category_id'] }
        });
        return new GenericResponseDto(
            HttpStatus.CREATED,
            'Fetched Cars Successfully',
            result,
        );
    }

    async getCarById(id) {
        let result = await this.carRepository.findOne({
            include: [
                {
                    model: Category,
                    required: true
                }
            ],
            attributes: { exclude: ['category_id'] },
            where: { id: id },
        });
        if (!result) {
            throw new NotFoundException('Car Not Found');
        }
        return new GenericResponseDto(
            HttpStatus.OK,
            'Fetched Car Successfully',
            result,
        );
    }

    async UpdateCar(id, body) {
        let result = await this.carRepository.update(
            {
                category_id: body.category_id,
                color: body.color,
                model: body.model,
                registeration_no: body.registeration_no
            },
            { where: { id: id } },
        );
        if (!result) {
            throw new NotFoundException('Car Not Found');
        }
        return new GenericResponseDto(
            HttpStatus.OK,
            'Car Updated Successfully',
            result,
        );
    }

    async deleteCar(id) {
        let result = await this.carRepository.destroy({
            where: { id: id },
        });
        if (!result) {
            throw new NotFoundException('Car Not Found');
        }
        result = await this.carRepository.findAll({
            include: [
                {
                    model: Category,
                    required: true
                }
            ],
            attributes: { exclude: ['category_id'] }
        });
        return new GenericResponseDto(
            HttpStatus.OK,
            'Car Deleted Successfully',
            result,
        );
    }
}
