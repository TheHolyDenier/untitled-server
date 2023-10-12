import { Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class QueryPipeline implements PipeTransform {
  transform(
    request: {
      page?: number;
      elementsPerPage?: number;
      where?: any;
      orderBy?: string[];
      select?: string;
      include?: string;
    } = {},
  ) {
    const query: any = {};

    const page = request.page,
      elementsPerPage = request.elementsPerPage;

    const orderBy = request.orderBy ? [...request.orderBy] : null;

    const select = request.select;
    const include = request.include;

    const where = request.where;

    if (orderBy) {
      query.orderBy = [];
      for (const element of orderBy) {
        query.orderBy.push(JSON.parse(element));
      }
    }

    if (select) {
      query.select = JSON.parse(select);
    }

    if (include) {
      query.include = JSON.parse(include);
    }

    if (where) {
      query.where = JSON.parse(where);
    }

    if (page && elementsPerPage) {
      const take = Number(elementsPerPage);
      const skip = (Number(page) - 1) * take;
      query.take = take;
      query.skip = skip;
    }

    return query;
  }
}
