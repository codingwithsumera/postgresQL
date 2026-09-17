import { Module } from '@nestjs/common';
import { EmployeeController } from './employee.controller.js';
import { EmployeeService } from './employee.service.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './employees.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([Employee])],
  controllers: [EmployeeController],
  providers: [EmployeeService],
})
export class EmployeeModule {}
