import { AuthorRepository } from './models/author.model';

AuthorRepository.getById(100).then((res) => console.log('RES ', res));

console.log('s');
