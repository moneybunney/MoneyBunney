import { TransactionQuery } from "./TransactionQuery";

describe("TransactionQuery", () => {
  let query: TransactionQuery;

  beforeEach(() => {
    query = new TransactionQuery();
  });

  it("Creates a valid 'any' selector DTO", async () => {
    const dto = query.any().getQueryDTO();
    expect(Array.isArray(dto.selectors)).toBeTruthy();
    expect(dto.selectors.length).toEqual(1);
    expect(dto.selectors[0].Name).toEqual("any");
    expect(dto.selectors[0].Value).toBeUndefined();
  });

  it("Creates a valid 'id' selector DTO", async () => {
    const testId = "123456";
    const dto = query.id(testId).getQueryDTO();
    expect(Array.isArray(dto.selectors)).toBeTruthy();
    expect(dto.selectors.length).toEqual(1);
    expect(dto.selectors[0].Name).toEqual("id");
    expect(dto.selectors[0].Value).toEqual(testId);
  });

  it("Creates a valid 'limit' selector DTO", async () => {
    const dto = query.limit(10).getQueryDTO();
    expect(Array.isArray(dto.selectors)).toBeTruthy();
    expect(dto.selectors.length).toEqual(1);
    expect(dto.selectors[0].Name).toEqual("limit");
    expect(dto.selectors[0].Value).toEqual(10);
  });

  it("Creates a valid 'sort' selector DTO", async () => {
    const dto = query.sort("Price", 1).getQueryDTO();
    expect(Array.isArray(dto.selectors)).toBeTruthy();
    expect(dto.selectors.length).toEqual(1);
    expect(dto.selectors[0].Name).toEqual("sort");
    expect(dto.selectors[0].Key).toEqual("Price");
    expect(dto.selectors[0].Value).toEqual(1);
  });

  it("Creates a valid 'equals' selector DTO", async () => {
    const dto = query.equals("Price", 420).getQueryDTO();
    expect(Array.isArray(dto.selectors)).toBeTruthy();
    expect(dto.selectors.length).toEqual(1);
    expect(dto.selectors[0].Name).toEqual("where");
    expect(dto.selectors[0].Key).toEqual("Price");
    const whereDescriptor = dto.selectors[0].Value as any;
    expect(whereDescriptor.Relationship).toEqual("eq");
    expect(whereDescriptor.Value).toEqual(420);
  });

  it("Creates a valid 'gt' selector DTO", async () => {
    const dto = query.gt("Price", 0).getQueryDTO();
    expect(Array.isArray(dto.selectors)).toBeTruthy();
    expect(dto.selectors.length).toEqual(1);
    expect(dto.selectors[0].Name).toEqual("where");
    expect(dto.selectors[0].Key).toEqual("Price");
    const whereDescriptor = dto.selectors[0].Value as any;
    expect(whereDescriptor.Relationship).toEqual("gt");
    expect(whereDescriptor.Value).toEqual(0);
  });

  it("Creates a valid 'gte' selector DTO", async () => {
    const dto = query.gte("Date", 1).getQueryDTO();
    expect(Array.isArray(dto.selectors)).toBeTruthy();
    expect(dto.selectors.length).toEqual(1);
    expect(dto.selectors[0].Name).toEqual("where");
    expect(dto.selectors[0].Key).toEqual("Date");
    const whereDescriptor = dto.selectors[0].Value as any;
    expect(whereDescriptor.Relationship).toEqual("gte");
    expect(whereDescriptor.Value).toEqual(1);
  });

  it("Creates a valid 'lte' selector DTO", async () => {
    const dto = query.lte("Date", 1).getQueryDTO();
    expect(Array.isArray(dto.selectors)).toBeTruthy();
    expect(dto.selectors.length).toEqual(1);
    expect(dto.selectors[0].Name).toEqual("where");
    expect(dto.selectors[0].Key).toEqual("Date");
    const whereDescriptor = dto.selectors[0].Value as any;
    expect(whereDescriptor.Relationship).toEqual("lte");
    expect(whereDescriptor.Value).toEqual(1);
  });

  it("Creates a valid 'lt' selector DTO", async () => {
    const dto = query.lt("Date", "2017-09-08").getQueryDTO();
    expect(Array.isArray(dto.selectors)).toBeTruthy();
    expect(dto.selectors.length).toEqual(1);
    expect(dto.selectors[0].Name).toEqual("where");
    expect(dto.selectors[0].Key).toEqual("Date");
    const whereDescriptor = dto.selectors[0].Value as any;
    expect(whereDescriptor.Relationship).toEqual("lt");
    expect(whereDescriptor.Value).toEqual("2017-09-08");
  });

  it("Creates a valid 'in' selector DTO", async () => {
    const dto = query.in("Tags", ["tag1", "tag2"]).getQueryDTO();
    expect(Array.isArray(dto.selectors)).toBeTruthy();
    expect(dto.selectors.length).toEqual(1);
    expect(dto.selectors[0].Name).toEqual("where");
    expect(dto.selectors[0].Key).toEqual("Tags");
    const whereDescriptor = dto.selectors[0].Value as any;
    expect(whereDescriptor.Relationship).toEqual("in");
    expect(whereDescriptor.Value).toEqual(["tag1", "tag2"]);
  });

  it("Creates a valid complex query DTO", async () => {
    const dto = query
      .lt("Date", "2017-09-08")
      .sort("Price", -1)
      .limit(10)
      .getQueryDTO();
    expect(Array.isArray(dto.selectors)).toBeTruthy();
    expect(dto.selectors.length).toEqual(3);

    expect(dto.selectors[0].Name).toEqual("where");
    expect(dto.selectors[0].Key).toEqual("Date");
    const whereDescriptor = dto.selectors[0].Value as any;
    expect(whereDescriptor.Relationship).toEqual("lt");
    expect(whereDescriptor.Value).toEqual("2017-09-08");

    expect(dto.selectors[1].Name).toEqual("sort");
    expect(dto.selectors[1].Key).toEqual("Price");
    expect(dto.selectors[1].Value).toEqual(-1);

    expect(dto.selectors[2].Name).toEqual("limit");
    expect(dto.selectors[2].Key).toBeUndefined();
    expect(dto.selectors[2].Value).toEqual(10);
  });
});
