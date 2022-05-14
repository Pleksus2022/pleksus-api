import { Test, TestingModule } from '@nestjs/testing';
import { SendImagesController } from './send-images.controller';

describe('SendImagesController', () => {
  let controller: SendImagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SendImagesController],
    }).compile();

    controller = module.get<SendImagesController>(SendImagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
