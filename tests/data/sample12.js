// Author: Venkat
// Website: https://www.facebook.com/nvnraju1234

var Person = {
  PersonalId: {
    type: 'Number',
    size: 8
  },
  firstName: {
    type: 'string',
    size: 15
  },
  lastName: {
    type: 'string',
    size: 15
  },
  email: {
    type: 'string',
    size: 30
  },

  $key: ['PersonalId']
};


var Phone = {
  PhoneId: {
    type: 'Number',
    size: 8
  },
  PersonalId: Person.PersonalId, //Foriegn Key
  Mobile: {
    type: 'Number',
    size: 10
  },
  Office: {
    type: 'Number',
    size: 10
  }
};


var Relationship = {
  RelationId: {
    type: 'Number',
    size: 8
  },
  PersonalId: Person.PersonalId, //Foriegn Key
  Name: {
    type: 'String',
    size: 30
  },
  Relation: {
    type: 'String',
    size: 15
  }
};
