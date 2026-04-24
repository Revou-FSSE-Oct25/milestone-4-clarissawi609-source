import { Body, Controller, Post } from '@nestjs/common'
import { TransactionsService } from './transactions.service'

@Module({
  imports: [PrismaModule],
  controllers: [TransactionsController],
  providers: [TransactionsService],
})
export class TransactionsModule {}

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly service: TransactionsService) {}

  @Post('deposit')
  deposit(@Body() body: any) {
    return this.service.deposit(body.accountId, body.amount)
  }
}