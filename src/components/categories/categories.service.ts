import { Injectable, HttpStatus, NotFoundException } from '@nestjs/common';
import { sequelize } from '../utils/sequelize.connection.instance';
import { Category } from 'src/entities/category.entity';
import { GenericResponseDto } from 'src/dtos/response/generic.reponse.dto';

@Injectable()
export class CategoriesService {
    private categoryRepository;
    constructor() {
        this.categoryRepository = sequelize.getRepository(Category);
    }

    async createCategory(body) {
        const result = await this.categoryRepository.create(
            body
        );
        if (!result) {
            return new GenericResponseDto(HttpStatus.INTERNAL_SERVER_ERROR, 'Unable to create category');
        }
        return new GenericResponseDto(
            HttpStatus.CREATED,
            'Category Created Successfully',
            result,
        );
    }

    async getAllCategories() {
        const result = await this.categoryRepository.findAll();
        return new GenericResponseDto(
            HttpStatus.CREATED,
            'Fetched Categories Successfully',
            result,
        );
    }

    async getCategoryById(id) {
        let result = await this.categoryRepository.findOne({
            where: { id: id },
        });
        if (!result) {
            throw new NotFoundException('Category Not Found');
        }
        return new GenericResponseDto(
            HttpStatus.OK,
            'Fetched Category Successfully',
            result,
        );
    }

    async UpdateCategory(id, body) {
        let result = await this.categoryRepository.update(
            { category_name: body.category_name },
            { where: { id: id } },
        );
        if (!result) {
            throw new NotFoundException('Category Not Found');
        }
        return new GenericResponseDto(
            HttpStatus.OK,
            'Category Updated Successfully',
            result,
        );
    }

    async deleteCategory(id) {
        let result = await this.categoryRepository.destroy({
            where: { id: id },
        });
        if (!result) {
            throw new NotFoundException('Category Not Found');
        }
        return new GenericResponseDto(
            HttpStatus.OK,
            'Category Deleted Successfully',
            result,
        );
    }
}
