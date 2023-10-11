import { Request, Response } from 'express';
import  mocked  from 'ts-jest';
import connection from "../database/connection";
import {ProductsController} from '../Controllers/ProductsController/ProductsController';


describe('ProductsController', () => {
  // Write your tests here
});

test('should return a 200 status code and the list of products', async () => {
  // Arrange
  const products = [{ id: 1, name: 'Product 1' }, { id: 2, name: 'Product 2' }];
  const request = {} as Request;
  const response = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as unknown as Response;

  mocked(connection).mockImplementation(() => ({
    select: jest.fn().mockResolvedValue(products),
  }));

  const productsController = new ProductsController();

  // Act
  await productsController.index(request, response);

  // Assert
  expect(response.status).toHaveBeenCalledWith(200);
  expect(response.json).toHaveBeenCalledWith(products);
});