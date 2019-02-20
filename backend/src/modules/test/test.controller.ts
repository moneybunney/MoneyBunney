import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { TestService } from './test.service';
import { CreateTestDto } from './dto/create-test.dto';
import { Test } from './interfaces/test.interface';

@Controller('test')
export class TestController {

  constructor(private readonly testService: TestService) {}

  // test object is created on post to /test with body like:
  // {
  //   "StringVariable": "HuHa!",
  //   "IntVariable":1234,
  //   "ObjectVariable":{"yee":1}
  // }
  @Post()
  async create(@Body() createTestDto: CreateTestDto) {
    console.log('Received test object:');
    console.log(createTestDto);
    this.testService.create(createTestDto);
  }

  @Get()
  getAllTests(): Promise<Test[]> {
    console.log(`GET to /test | getAllTests`);
    return this.testService.findAll();
  }

  // mongo by default creates a sort of id
  // they look like this:
  // "_id":"5c6db332ab56973d78228e2e"
  // and then this controller is called on url /test/5c6db332ab56973d78228e2e
  @Get(':id')
  getTest(@Param('id') id: string): Promise<Test> {
    console.log('GET to /test | getTest');
    return this.testService.findById(id);
  }
}
