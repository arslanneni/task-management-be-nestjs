import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post('createTask')
  createTask(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.createTask(createTaskDto);
  }

  @Get('getAllTasks')
  getAllTasks() {
    return this.tasksService.getAllTasks();
  }

  @Get('getTaskByID/:id')
  getTaskByID(@Param('id') id: string) {
    return this.tasksService.getTaskByID(id);
  }

  @Put('updateTask/:id')
  async updateTask(
    @Param('id') id: number,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.tasksService.updateTask(id, updateTaskDto);
  }

  @Put('deleteTask/:id')
  async deleteTask(@Param('id') id: number) {
    return this.tasksService.deleteTask(id);
  }
}
