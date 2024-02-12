import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Req, Res, UseGuards } from "@nestjs/common";
import { SuitService } from "./suit.service";
import { Roles } from "src/auth/roles/roles.decorator";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { RoleGuard } from "src/auth/role/role.guard";
import { CreateSuitDto } from "./dto/create-suit.dto";
import { BatchDeleteSuitsDto } from "./dto/batch-delete-suits.dto";
import { UpdateSuitDto } from "./dto/update-suit.dto";

@Controller("suits")
export class SuitController {
    constructor(private readonly suitService: SuitService) {}

    @Get()
    async getAll(@Req() req, @Res() res) {
        const suits = await this.suitService.getAll();
        return res.status(HttpStatus.OK).json([...suits]);
    }

    @Roles("admin")
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Post()
    async create(@Body() createSuitDto: CreateSuitDto, @Res() res) {
        try {
            const suit = await this.suitService.createOne(createSuitDto);
            return res.status(HttpStatus.CREATED).json({ message: "Created Succesfully", suit: suit });
        } catch (error) {
            return res.status(error.status).json({ message: error.message });
        }
    }

    @Roles("admin")
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Delete(":id")
    async delete(@Param("id") id: string, @Res() res) {
        try {
            await this.suitService.deleteById(id);
            return res.status(HttpStatus.OK).json({ message: "Deleted Succesfully" });
        } catch (error) {
            return res.status(error.status).json({ message: error.message });
        }
    }

    @Roles("admin")
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Post("multiple-suits-delete")
    async batchDelete(@Body() batchDeleteSuitsDto: BatchDeleteSuitsDto, @Res() res) {
        try {
            const deletedCount = await this.suitService.deleteBatch(batchDeleteSuitsDto);
            return res.status(HttpStatus.OK).json({ message: `${deletedCount} items removed.` });
        } catch (error) {
            return res.status(error.status).json({ message: error.message });
        }
    }

    @Roles("admin")
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Put(":id")
    async update(@Param("id") id: string, @Body() updateSuitDto: UpdateSuitDto, @Res() res) {
        try {
            const modifiedCount = await this.suitService.updateOne(id, updateSuitDto);
            return res.status(HttpStatus.OK).json({ message: `${modifiedCount} item updated succesfully.` });
        } catch (error) {
            return res.status(error.status).json({ message: error.message });
        }
    }
}
