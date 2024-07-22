import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { TagService } from "../../domain/services/tag.service";
import { tagDto } from "../../domain/ports/dtos/tag.dto";
import { UpdateTagDto } from "../dtos/update-tag.dto";

@Controller('tags')
export class TagController {
    constructor(private readonly service: TagService) { }

    @Get()
    async findAll() {
        console.log('findAll')
        return await this.service.findAll();
    }

    @Get('/:id')
    async findOne(@Param('id') id?: string) {
        return await this.service.findOne(id);
    }

    @Delete('/:id')
    async deleteTask(@Query('id') id: string) {
        return await this.service.delete(id);
    }

    @Delete()
    async deleteTasks() {
        return await this.service.deleteAll();
    }

    @Post()
    async addTag() {
        return this.service.create();
    }

    @Patch()
    async updateTag(@Body() body: UpdateTagDto) {
        return this.service.update(body);
    }

    @Post('/import-tags')
    async importTags(@Body() body: tagDto[]) {
        return this.service.importTags(body);
    }
}