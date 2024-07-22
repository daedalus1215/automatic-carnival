import { DateTimeDto } from "../../../dtos/update-task/date-time.dto";
import { UpdateTaskDto } from "../../../dtos/update-task/update-task.dto";
import { TasksService } from "../../../services/tasks.service";
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

  it('should fetch tasks with includeTags, but not the ones with excludedTags', () => {
    // Arrange
    taskServiceMock.fetchAllMonthTasks = jest.fn();
    const includeTags = ['1', '2'];
    const excludeTags = ['3', '4'];

    // Act
    target.fetchAllMonthTasks(includeTags, excludeTags);

    // Assert
    expect(taskServiceMock.fetchAllMonthTasks).toHaveBeenNthCalledWith(1, includeTags, excludeTags);
  });

  it('should fetch all task titles', () => {
    // Arrange
    taskServiceMock.fetchAllTaskTitles = jest.fn();
    const title = '1';

    // Act
    target.fetchAllTaskTitles(title);

    // Assert
    expect(taskServiceMock.fetchAllTaskTitles).toHaveBeenNthCalledWith(1, title);
  });
});