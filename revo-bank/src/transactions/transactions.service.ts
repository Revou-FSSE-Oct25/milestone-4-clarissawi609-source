import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class TransactionsService {
  constructor(private prisma: PrismaService) {}

  async deposit(accountId: number, amount: number) {
    const account = await this.prisma.account.update({
      where: { id: accountId },
      data: {
        balance: {
          increment: amount,
        },
      },
    })

    await this.prisma.transaction.create({
      data: {
        type: 'DEPOSIT',
        amount,
        toAccountId: accountId,
      },
    })

    return account
  }
}