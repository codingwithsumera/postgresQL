import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './employees.entity.js';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {}

  async create(employeedata: Employee): Promise<Employee> {
    const employee = this.employeeRepository.create(employeedata);
    return this.employeeRepository.save(employee);
  }

  async findAll(): Promise<Employee[]> {
    return this.employeeRepository.find();
  }

  async findOne(id: number): Promise<Employee> {
    const employee = await this.employeeRepository.findOneBy({ id });
    if (!employee) {
      throw new NotFoundException(`Employee with ID: ${id} not found!`);
    }
    return employee;
  }

  async update(id: number, updatedData: Partial<Employee>): Promise<Employee> {
    const employee = await this.employeeRepository.findOneBy({
      id,
    });
    if (!employee) {
      throw new NotFoundException(`Employee with ID: ${id} not found!`);
    }
    const updated = Object.assign(employee, updatedData);
    return this.employeeRepository.save(updated);
  }

  async delete(id: number): Promise<{ message: string }> {
    const result = await this.employeeRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Employee with ID: ${id} not found!`);
    }
    return {
      message: `Employee with ID: ${id} has been deleted successfully!`,
    };
  }
  async search(filters: {
    name?: string;
    department?: string;
  }): Promise<Employee[]> {
    const query = this.employeeRepository.createQueryBuilder('employee');
    if (filters.name) {
      query.andWhere('employee.name ILIKE :name', {
        name: `%${filters.name}%`,
      });
    }
    if (filters.department) {
      query.andWhere('employee.department  = :dept', {
        dept: filters.department,
      });
    }

    return query.getMany();
  }
}
