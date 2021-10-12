import Dexie from 'dexie';

// Database inherits from the Dexie class to handle all database logic for the
// whoobe app.
// NOTE: For an app like this where the database interactions are pretty
// simple, it's not strictly necessary to subclass Dexie, but I personally
// prefer the subclassing pattern over having a global Dexie database class
// in order to structure all the database logic in a single class.
export class Database extends Dexie {
  constructor() {
    // run the super constructor Dexie(databaseName) to create the IndexedDB
    // database.
    super('database');

    // create the todos store by passing an object into the stores method. We
    // declare which object fields we want to index using a comma-separated
    // string; the ++ for the index on the id field indicates that "id" is an
    // auto-incrementing primary key, while the "done" field is just a regukar
    // IndexedDB index.
    this.version(1).stores({
      pages: '++id,name,category,description,*tags',
      settings: 'id'
    });

    // we can retrieve our todos store with Dexie.table, and then use it as a
    // field on our Database class for convenience; we can now write code such
    // as "this.todos.add(...)" rather than "this.table('todos').add(...)"
    this.pages = this.table('pages');
    this.settings = this.table('settings')
  }

  // getTodos retrieves all todos from the todos object store in a defined
  // order; order can be:
  // - forwardOrder to get the todos in forward chronological order
  // - reverseOrder to get the todos in reverse chronological order
  // - unfinishedFirstOrder to get the todos in reverse chronological order
  async getPages(category='',limit=10,offset=0,order='name') {
    // In Dexie, we create queries by chaining methods, 
    // The toArray method returns a promise that resolves to the array
    // of the items in the todos store.
    let pages = [];
    switch ( category ){
        case '':
        pages = await this.table('pages').offset(offset).limit(limit).toArray();
        break;

        default:
        pages = await this.table('pages').where("category").anyOfIgnoreCase(category).offset(offset).limit(limit).toArray();  
    }
    

    // The reason we need to modify the done field on each todo is because in
    // IndexedDB, integers can be indexed, but booleans cannot, so we represent
    // "done" status as an integer. Only the database logic needs to know that
    // detail, though, so for convenience when we return the todos, their "done"
    // status is a boolean.
    return pages
    // return pages.map((t) => {
    //   t.done = !!t.done;
    //   return t;
    // });
  }

  async searchPages ( field='tags' , search='' ){
    if ( !search ) return []
    let pages = [];
    pages = await this.table('pages').where(field).equals(search).toArray()
    console.log ( pages )
    return pages
  }

  // setTodoDone sets whether or not the todo with the ID passed in is done.
  // Returns a promise that resolves if the update is successful.
  updatePage(id, page) {
    return this.pages.update(id, page)
  }

  // addTodo adds a todo with the text passed in to the todos object store.
  // Returns a promise that resolves if the addition is successful.
  addPage(page) {
    // add a todo by passing in an object using Table.add.
    return this.pages.add(page)
  }

   // deleteTodo deletes a todo with the ID passed in from the todos object
  // store. Returns a promise that resolves if the deletion is successful.
  deletePage(pageID) {
    // delete a todo by passing in the ID of that todo.
    return this.pages.delete(pageID);
  }

  async getSettings(){
    return await this.table('settings').toArray();
  }

  addSettings(settings) {
    // add a todo by passing in an object using Table.add.
    return this.settings.add(settings)
  }

  updateSettings(id,settings){
    return this.settings.update(id, settings)
  }

 
}

// forwardOrder is passed into getTodos to retrieve todos in chronological
// order.
export const forwardOrder = 'forward';

// reverseOrder is passed into getTodos to retrieve todos in reverse
// chronological order.
export const reverseOrder = 'reverse';

// unfinishedFirstOrder is passed into getTodos to retrieve todos such that
// unfinished todos come before finished todos in the returned array.
export const unfinishedFirstOrder = 'unfinished-first';
