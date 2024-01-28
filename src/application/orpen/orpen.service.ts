
import { Injectable } from '@nestjs/common';
import { GenId } from '../utils/genId'

import { ErrorHandler } from '../utils/ErrorHandler';
import { CreateOrpenDto } from './dto/create-orpen.dto';
import { UpdateOrpenDto} from './dto/update-orpen.dto';
import { OrpenRepository } from './orpen.repository';
import axios from 'axios';

@Injectable()
export class OrpenService {

  private readonly genId: GenId

  constructor(
        private readonly  orpenRepository:OrpenRepository
    ){
        this.genId = new GenId()
    }

    async create(createOrpen: CreateOrpenDto) {
      try {
        const result = await this.orpenRepository.create({
          ...createOrpen,
          _id: this.genId.id(),
          createdBy: 'admin',
          updatedBy: 'admin',
          deleted: false
        })
        return result
      } catch (error) {
        return ErrorHandler.handle(error)
      }
  }

  async findAll(city: string,country:string) {
    try {

      const apiUrl = `https://openweathermap.org/data/2.5/find?q=${city},${country}&appid=439d4b804bc8187953eb36d2a8c26a02&units=metric`;

      const apiResponse = await axios.get(apiUrl);
      const results = apiResponse.data;
      
      if (!results || results.length === 0 || results=== undefined || results=== null ) {
        ErrorHandler.NOT_FOUND_MESSAGE('not found');
      }

      const transformedResults = results.list.map((item: any) => {
        return {
          city: item.name,
          country: item.sys.country,
          // requestDate: new Date(item.dt * 1000).toISOString(),
          weatherData: {
            id: item.weather[0].id,
            main: item.weather[0].main,
            description: item.weather[0].description,
            icon: item.weather[0].icon,
          },
        };
      });
  
      if (!transformedResults || transformedResults.length === 0 ) {
        ErrorHandler.NOT_FOUND_MESSAGE('not found');
      }
      return {
        success: true,
        data: transformedResults,
        message: 'Consulta bem-sucedida',
      };
    } catch {

      ErrorHandler.NOT_FOUND_MESSAGE('Query not found! Provide other parameters!!');

      return {
        success: false,
        error: 'Erro ao chamar a API do OpenWeatherMap',
      };
    }
  }

  async findHistory() {
    try {
      const results = await this.orpenRepository.find({});
      if (!results || results.length === 0) {
        ErrorHandler.NOT_FOUND_MESSAGE('not found');
      }
  
      return results;
    } catch (error) {
      return ErrorHandler.handle(error);
    }
  }

  async list(limit: number, page: number, filter: any) {
    try {
      const result = await this.orpenRepository.list(
        { ...filter },
        limit,
        page
      )
  
      if (!result || result.list.length === 0) {
        ErrorHandler.NOT_FOUND_MESSAGE('not found')
      }

      return result
    } catch (error) {
      return ErrorHandler.handle(error)
    }
  }

  async update(id: string, updateOrpenDto: UpdateOrpenDto) {

    try {
      const result = await this.orpenRepository.findOneAndUpdate(
        { _id: id },
        updateOrpenDto
      )

      if (!result) {
        ErrorHandler.NOT_FOUND_MESSAGE('not found')
      }

      return result
    } catch (error) {
      return ErrorHandler.handle(error)
    }
  }

  async delete(id: string) {
    try {
      const result = await this.orpenRepository.delete({ _id: id })

      if (!result) {
        ErrorHandler.NOT_FOUND_MESSAGE('not found')
      }

      return result
    } catch (error) {
      return ErrorHandler.handle(error)
    }
  }  
  
}
