import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepo: Repository<Task>,
  ) {}

  async getAllTasks() {
    const getAllTasks = await this.taskRepo.find({});
    if (getAllTasks.length > 0) {
      return {
        status: 'SUCCESS',
        httpcode: HttpStatus.FOUND,
        message: 'All Tasks Found',
        data: getAllTasks,
      };
    } else {
      return {
        status: 'FAILURE',
        httpcode: HttpStatus.NOT_FOUND,
        message: 'All Tasks Not Found',
        data: [],
      };
    }
  }
  async getTaskByID(id) {
    const getTaskByID = await this.taskRepo.find({
      where: {
        id: id,
      },
    } as unknown);
    if (getTaskByID.length > 0) {
      return {
        status: 'SUCCESS',
        httpcode: HttpStatus.FOUND,
        message: 'Task Found',
        data: getTaskByID,
      };
    } else {
      return {
        status: 'FAILURE',
        httpcode: HttpStatus.NOT_FOUND,
        message: 'Task Not Found',
        data: [],
      };
    }
  }
  async createTask(createTaskDto: CreateTaskDto) {
    const datetime = new Date();
    const status = 'Pending';
    const isTaskExists = await this.taskRepo.find({
      where: {
        title: createTaskDto.title,
      },
    });
    if (isTaskExists.length > 0) {
      return {
        status: 'FAILURE',
        httpcode: HttpStatus.CONFLICT,
        message: 'Task Title Already ',
        data: [],
      };
    } else {
      const newTask = this.taskRepo.create({
        ...createTaskDto,
        date_time: datetime,
        status: status,
      });

      const result = await this.taskRepo.save(newTask);

      return {
        status: 'SUCCESS',
        httpcode: HttpStatus.CREATED,
        message: 'Task Created Successfully',
        data: result,
      };
    }
  }
  async updateTask(id: number, updateTaskDto: UpdateTaskDto) {
    const modifiedDateTime = new Date();
    const getTaskByID = await this.taskRepo.find({
      where: {
        id: id,
      },
    });

    if (getTaskByID.length > 0) {
      const updatedTask = await this.taskRepo.update(id, {
        ...updateTaskDto,
        modified_date_time: modifiedDateTime,
        status: status,
      });

      if (updatedTask.affected === 1) {
        return {
          status: 'SUCCESS',
          httpcode: HttpStatus.OK,
          message: 'Task Updated Successfully',
          data: updatedTask,
        };
      } else {
        return {
          status: 'FAILURE',
          httpcode: HttpStatus.CONFLICT,
          message: 'Task Update Failed',
          data: [],
        };
      }
    } else {
      return {
        status: 'FAILURE',
        httpcode: HttpStatus.NOT_FOUND,
        message: 'Task Not Found',
        data: [],
      };
    }
  }
  async deleteTask(id: number) {
    const modifiedDateTime = new Date();
    const status = 'Completed';
    const getTaskByID = await this.taskRepo.find({
      where: {
        id: id,
      },
    });

    if (getTaskByID.length > 0) {
      const updatedTask = await this.taskRepo.update(id, {
        modified_date_time: modifiedDateTime,
        status: status,
      });

      if (updatedTask.affected === 1) {
        return {
          status: 'SUCCESS',
          httpcode: HttpStatus.OK,
          message: 'Task Deleted Successfully',
          data: updatedTask,
        };
      } else {
        return {
          status: 'FAILURE',
          httpcode: HttpStatus.CONFLICT,
          message: 'Task Does Not Deleted',
          data: [],
        };
      }
    } else {
      return {
        status: 'FAILURE',
        httpcode: HttpStatus.NOT_FOUND,
        message: 'Task Not Found',
        data: [],
      };
    }
  }
}
