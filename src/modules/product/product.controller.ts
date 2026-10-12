import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { SkipThrottle, Throttle } from '@nestjs/throttler';

// Overrides the global 'short' and 'medium' configs for this route specifically
// @Throttle({
//   short: { limit: 1, ttl: 5000 }, // Max 1 request every 5 seconds
//   medium: { limit: 5, ttl: 60000 }, // Max 5 login attempts per minute
// })
@SkipThrottle({ short: true, medium: true }) // Skips rate limiting for ALL routes in this controller
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  // Explicitly tell NestJS NOT to skip your named throttlers on this route
  @SkipThrottle({ short: false, medium: false })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }
}
