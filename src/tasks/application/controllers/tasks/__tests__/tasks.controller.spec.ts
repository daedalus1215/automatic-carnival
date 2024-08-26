import { TasksService } from "src/tasks/domain/tasks/tasks/services/tasks.service";
import { DateTimeDto } from "../../../dtos/update-task/date-time.dto";
import { UpdateTaskDto } from "../../../dtos/update-task/update-task.dto";
import { TasksController } from "../tasks.controller";

describe('TasksController', () => {
  let target: TasksController;
  let taskServiceMock: TasksService;

  beforeEach(async () => {
    taskServiceMock = jest.fn() as unknown as TasksService;
    target = new TasksController(taskServiceMock);
  });

  it('should find task with id', () => {
    // Arrange
    taskServiceMock.findOne = jest.fn();
    const id = "randomId";

    // Act
    target.findOne(id);

    // Assert
    expect(taskServiceMock.findOne).toHaveBeenNthCalledWith(1, id);
  });

  it('should find all tasks', () => {
    // Arrange
    taskServiceMock.findAll = jest.fn();

    // Act
    target.findAll();

    // Assert
    expect(taskServiceMock.findAll).toHaveBeenCalledTimes(1);
  });

  it('should update task', () => {
    // Arrange
    taskServiceMock.update = jest.fn();

    const body: UpdateTaskDto = {
      date: "05-12-2024",
      dateTimes: [],
      description: "description of task",
      tags: [],
      taskId: "task Id",
      time: 111,
      title: " title"
    };

    // Act
    target.updateTask(body);

    // Assert
    expect(taskServiceMock.update).toHaveBeenNthCalledWith(1, body);
  });

  it('should update date time of task', () => {
    // Arrange
    taskServiceMock.updateDateTimeOfTask = jest.fn();
    const taskId = 'taskId';
    const dateTime: DateTimeDto = {
      date: "05-12-2024",
      _id: "date time id",
      time: "1324234"
    };

    // Act
    target.updateDateTimeOfTask(taskId, dateTime);

    // Assert
    expect(taskServiceMock.updateDateTimeOfTask).toHaveBeenNthCalledWith(1, taskId, dateTime);
  });

  it('should fetch all task titles', () => {
    // Arrange
    taskServiceMock.fetchAllTitles = jest.fn();
    const title = '1';

    // Act
    target.fetchAllTaskTitles(title);

    // Assert
    expect(taskServiceMock.fetchAllTitles).toHaveBeenNthCalledWith(1, title);
  });
});