export class TourParams {
  start = new Date(new Date().setFullYear(new Date().getFullYear() - 3)).toISOString().slice(0, 10);
  end = new Date(new Date().setFullYear(new Date().getFullYear() + 2)).toISOString().slice(0, 10);
  pageNumber = 1;
  pageSize = 9;
  orderBy = 'name';
}
