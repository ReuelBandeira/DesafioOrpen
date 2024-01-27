export abstract class ValidFilter {
  public static from(headers: any) {
    let filter: any;

    if (
      !headers.filter ||
      headers.filter === 'undefined' ||
      headers.filter === 'null'
    ) {
      filter = {};
    } else {
      filter = JSON.parse(decodeURIComponent(headers.filter));
    }
    
    return { filter };
  }
}
