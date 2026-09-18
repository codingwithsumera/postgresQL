import { Module } from '@nestjs/common';
import { BookController } from './book.controller.js';
import { BookService } from './book.service.js';
import { BookResolver } from './resolvers/book.resolver.js';

@Module({
  controllers: [BookController],
  providers: [BookService, BookResolver]
})
export class BookModule {}
