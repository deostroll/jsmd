var student = {
  studentId: {
    definition : {
      type: 'string',
      size: 5
    }
  },
  firstName: {
    definition: {
      type: 'string',
      size: 15
    }
  },
  lastName: {
    defition: {
      type: 'string',
      size: 15
    }
  },
  '$key': [
    'studentId'
  ]
};

var personalInfo = {
  studentId: student.studentId,
  fatherName: {
    definition: {
      type: 'string',
      size: 25
    }
  },
  motherName: {
    definition: {
      type: 'string',
      size: 25
    }
  },
  address : {
    definition: {
      type: 'string',
      size: 50
    }
  },
  pincode: {
    definition: {
      type: 'string',
      size: 7
    }
  }
};
