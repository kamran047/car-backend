import { Body, Controller, Post, Get, Put, Delete, Param } from '@nestjs/common';
import { CategoryRequestDto } from 'src/dtos/request/category.request.dto';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
    constructor(
        private categoriesService: CategoriesService,

    ) { }

    @Post('create')
    async createCategory(@Body() body: CategoryRequestDto) {
        return await this.categoriesService.createCategory(body)
    }

    @Get('getAll')
    async getAllCategories() {
        return await this.categoriesService.getAllCategories()
    }

    @Get('getById/:id')
    async GetCategoryById(@Param('id') id: number) {
        return await this.categoriesService.getCategoryById(id)
    }

    @Put('update/:id')
    async UpdateCategory(@Param('id') id: number, @Body() body: CategoryRequestDto) {
        return await this.categoriesService.UpdateCategory(id, body)
    }

    @Delete('delete/:id')
    async DeleteCategory(@Param('id') id: number) {
        return await this.categoriesService.deleteCategory(id)
    }
}
