import {
    Body,
    Controller,
    Get,
    Res,
    Param,
    Patch,
    Headers,
    Delete  } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { Response } from 'express'
import { ErrorHandler } from '../utils/ErrorHandler'
import { ResponseHandler } from '../utils/ResponseHandler'
import { OrpenService} from './orpen.service'
import { ValidPagination } from '../utils/validPagination'
import { ValidFilter } from '../utils/validFilter'
import { deleteApiDecorator,findApiDecorator,listApiDecorator, updateApiDecorator } from './docs'
import { UpdateOrpenDto } from './dto/update-orpen.dto'
import { buildPDF } from './pdf/pdfkit'


@Controller('orpen')
@ApiTags('Orpens')
export class OrpenController {
    constructor(
        private readonly orpenService: OrpenService,
    ){}

    @Get('/weather')
    @findApiDecorator()
    async findAll(@Headers() headers,@Res() res: Response) {
        try {
            let city = headers.city;
            let country = headers.country;
            country = country.toUpperCase();
            if (country.length !== 2 || country===null || country===undefined) {
                ErrorHandler.NOT_FOUND_MESSAGE('Not found. To make the search more precise, enter the country with 2 letters (ISO3166).');
            }
            if (city.length === 0 || city===null || city===undefined) {
                ErrorHandler.NOT_FOUND_MESSAGE('Enter a valid city name!.');
            }
            const results = await this.orpenService.findAll(city,country);
            const createOrpen={
                city:results.data[0].city,
                country:results.data[0].country,
                weatherData:results.data[0].weatherData,
                requestDate:results.data[0].requestDate,

            }

            const resultCreate=await this.orpenService.create(
                createOrpen
            )
            return ResponseHandler.sendResponse(resultCreate, res);
        } catch (error) {
            return ErrorHandler.errorResponse(res, error);
        }
    }

    @Get('/history')
    @findApiDecorator()
    async findHistory(@Res() res: Response) {
        try {
            const results = await this.orpenService.findHistory();
            return ResponseHandler.sendResponse(results, res);
        } catch (error) {
            return ErrorHandler.errorResponse(res, error);
        }
    }

    @Get('/history/pagination')
    @listApiDecorator()
    async list(@Headers() headers, @Res() res: Response) {
      try {
        const { page, limit } = ValidPagination.from(headers)
        const { filter } = ValidFilter.from(headers)

        const result = await this.orpenService.list(
          limit,
          page,
          filter
        )
  
        return ResponseHandler.sendResponse(result, res)
      } catch (error) {
        return ErrorHandler.errorResponse(res, error)
      }
    }
    
    @Patch('/id/:id')
    @updateApiDecorator()
    async update(
        @Param('id') id: string,
        @Body() updateOrpenDto: UpdateOrpenDto,
        @Res() res: Response
    ) {
        try {
        const result = await this.orpenService.update(
            id,
            updateOrpenDto
        )
        return ResponseHandler.sendAcceptedResponse(result, res)
        } catch (error) {
        return ErrorHandler.errorResponse(res, error)
        }
    }

    @Delete('/id/:id')
    @deleteApiDecorator()
    async delete(@Param('id') id: string, @Res() res: Response) {
        try {
        const result = await this.orpenService.delete(id)
        return ResponseHandler.sendNoContentResponse(res)
        } catch (error) {
        return ErrorHandler.errorResponse(res, error)
        }
    }

    @Get('/generate-pdf')
    async generatePdf(@Res() res: Response) {
      const stream = res.writeHead(200, {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=teste.pdf",
      });

      let teste="teste de texto"

      let results = [
        {
            "_id": "a1d758c9-b6f8-49a6-a386-89f5152bcd8a",
            "codigo": "120688",
            "posto": "posto de teste",
            "quantidade": "501",
            "descricao": "teste descricao",
            "observacao": "teste dobs",
            "updatedBy": "admin",
            "createdBy": "admin",
            "createdAt": "2024-02-02T17:29:18.771Z",
            "updatedAt": "2024-02-02T17:29:18.771Z",
            "__v": 0
        }
      ];   
           
      buildPDF(
        teste,
        results,
        (data) => stream.write(data),
        () => stream.end()
      );
    }

}



