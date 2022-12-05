import { Controller, Param, Post, Body, Get, Put, Delete } from '@nestjs/common';
import { CreateCarRequestDto } from 'src/dtos/request/car.request.dto';
import { CarsService } from './cars.service';

@Controller('cars')
export class CarsController {

    constructor(
        private carsService: CarsService,

    ) { }

    @Post('create')
    async createCategory(@Body() body: CreateCarRequestDto) {
        return await this.carsService.createCar(body)
    }

    @Get('getAll')
    async getAllCategories() {
        return await this.carsService.getAllCars()
    }

    @Get('getById/:id')
    async GetCategoryById(@Param('id') id: number) {
        return await this.carsService.getCarById(id)
    }

    @Put('update/:id')
    async UpdateCategory(@Param('id') id: number, @Body() body: CreateCarRequestDto) {
        return await this.carsService.UpdateCar(id,body)
    }

    @Delete('delete/:id')
    async DeleteCategory(@Param('id') id: number) {
        return await this.carsService.deleteCar(id)
    }
}
