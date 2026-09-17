import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { EmployeeService } from './employee.service.js';
import { Employee } from './employees.entity.js';
import { SupabaseAuthGuard } from '../auth/supabase-auth/supabase-auth.guard.js';

@Controller('employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}
  @UseGuards(SupabaseAuthGuard)
  @Post()
  async createEmployee(@Body() body: Partial<Employee>): Promise<Employee> {
    return this.employeeService.create(body as Employee);
  }
  @UseGuards(SupabaseAuthGuard)
  @Get()
  async findAll(): Promise<Employee[]> {
    return this.employeeService.findAll();
  }
  @Get('search')
  async searchEmployee(
    @Query('name') name?: string,
    @Query('department') department?: string,
  ): Promise<Employee[]> {
    return this.employeeService.search({ name, department });
  }
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Employee> {
    return this.employeeService.findOne(id);
  }
  @Put(':id')
  async updatedEmployee(
    @Param('id') id: number,
    @Body() body: Partial<Employee>,
  ): Promise<Employee> {
    return this.employeeService.update(id, body);
  }
  @Delete(':id')
  async deleteEmployee(@Param('id') id: number): Promise<{ message: string }> {
    return this.employeeService.delete(id);
  }
}
