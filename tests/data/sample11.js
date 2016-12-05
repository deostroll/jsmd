// Author: Guru
// Website: https://www.facebook.com/kolisetty.guru
// Source: https://www.kirupa.com/net/next_gen_data_access_linq_pg3.htm
// BookDetails Schema
var Books = {
  BookId: {
    type: 'int',
    size: 10
  },
  ISBN: {
    type: 'string',
    size: 10
  },
  PublisherID: {
    type: 'int',
    size: 15
  },
  Title: {
    type: 'string',
    size: 50
  },
  $key: ['BookId']
};

var Authors = {
  AuthorId: {
    type: 'int',
    size: 10
  },
  BookId: Books.BookId, //foreign key reference
  AuthorName: {
    type: 'string',
    size: 30
  },
  $key: ['AuthorId']
};


var Publishers = {
  PublisherId: {
    type: 'int',
    size: 10
  },
  PublisherName: {
    type: 'string',
    size: 30
  },
  $key: ['PublisherId']
};
