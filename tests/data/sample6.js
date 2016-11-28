var student = {
  studentId: {

    type: 'string',
    size: 5

  },
  firstName: {

    type: 'string',
    size: 15

  },
  lastName: {

    type: 'string',
    size: 15

  },
  '$key': [
    'studentId'
  ]
};

var personalInfo = {
  studentId: student.studentId,
  fatherName: {

    type: 'string',
    size: 25

  },
  motherName: {

    type: 'string',
    size: 25

  },
  address: {

    type: 'string',
    size: 50

  },
  pincode: {

    type: 'string',
    size: 7

  }
};
