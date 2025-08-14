import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductEntity } from './entities/product.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    try {
      this.productRepository.create({ ...createProductDto });
      const product = await this.productRepository.save(createProductDto);
      return {
        statusCode: 201,
        message: 'Product created successfully',
        data: product,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        `Error creating product: ${error.message}`,
      );
    }
  }

  async findAll() {
    try {
      const products = await this.productRepository.find();
      return {
        statusCode: 200,
        message: 'Products fetched successfully',
        data: products,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        `Error fetching products: ${error.message}`,
      );
    }
  }

  async findOne(id: number) {
    try {
      const product = await this.productRepository.findOne({ where: { id } });
      if (!product) {
        return {
          statusCode: 404,
          message: 'Product not found',
        };
      }
      return {
        statusCode: 200,
        message: 'Product fetched successfully',
        data: product,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        `Error fetching product: ${error.message}`,
      );
    }
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    try {
      const product = await this.productRepository.findOne({ where: { id } });
      if (!product) {
        return {
          statusCode: 404,
          message: 'Product not found',
        };
      }

      this.productRepository.merge(product, updateProductDto);
      const updatedProduct = await this.productRepository.save(product);
      return {
        statusCode: 200,
        message: 'Product updated successfully',
        data: updatedProduct,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        `Error updating product: ${error.message}`,
      )
    }
  }

  async remove(id: number) {
    try {
      const product = await this.productRepository.findOne({ where: { id } });
      if (!product) {
        return {
          statusCode: 404,
          message: 'Product not found',
        };
      }
      await this.productRepository.remove(product);
      return {
        statusCode: 200,
        message: 'Product deleted successfully',
      };
    } catch (error) {
      throw new InternalServerErrorException(
        `Error deleting product: ${error.message}`,
      )
    }
  }
}
