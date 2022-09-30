import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DailyReportService {
  constructor(private prisma: PrismaService) {}

  async checkRole(token): Promise<boolean> {
    //Buscar token en db para saber si el usuario es autorizado
    const user = await this.prisma.users.findUnique({
      where: {
        id: token,
      },
      include: {
        Roles: true,
      },
    });
    if (user?.Roles.name !== 'Admin') return false;
    return true;
  }

  async createDaily(token: string) {
    const validation = await this.checkRole(token);
    if (validation === false) return new UnauthorizedException();
    //Trayendo todos los datos de db
    const sales = await this.prisma.sales.findMany({
      include: {
        Products: true,
      },
    });
    //Fecha actual
    const todaysDay = new Date().getDate();
    //Filtrando data
    const todaysSales = sales.filter((sale) => {
      return sale.sale_at.getDate() == todaysDay;
    });
    let totalSales = 0;
    todaysSales.map((sale) => {
      const valueSale = sale.qty * sale.Products.price;
      totalSales += valueSale;
    });
    return totalSales;
  }

  async createMonthly(token: string) {
    const validation = await this.checkRole(token);
    if (validation === false) throw new UnauthorizedException();
    //Trayendo todos los datos de db
    const sales = await this.prisma.sales.findMany({
      include: {
        Products: true,
      },
    });
    //Fecha actual
    const currentMonth = new Date().getMonth();
    //Filtrando data
    const monthSales = sales.filter((sale) => {
      return sale.sale_at.getMonth() == currentMonth;
    });
    let totalSales = 0;
    monthSales.map((sale) => {
      const valueSale = sale.qty * sale.Products.price;
      totalSales += valueSale;
    });
    return totalSales;
  }
}
