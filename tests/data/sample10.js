// Author: Guru
// Website: https://www.facebook.com/kolisetty.guru
// Source: https://dev.mysql.com/doc/employee/en/sakila-structure.html
// Employee Schema
// File: sample10.js
var employees = {
  emp_no: {
    type: 'int',
    size: 11
  },
  birth_date: {
    type: 'date',
  },
  first_name: {
    type: 'string',
    size: 14
  },
  last_name: {
    type: 'string',
    size: 16
  },
  gender: {
    type: 'char',
    size: 1
  },
  hire_date: {
    type: 'date',
  },
  $key: ['emp_no']
};



var salaries = {
  emp_no: employees.emp_no, //foreign key reference
  from_date: {
    type: 'date',
  },
  salary: {
    type: 'int',
    size: 11
  },
  to_date: {
    type: 'date',
  },
  $key: ['emp_no', 'from_date']
};

var departments = {
  dept_no: {
    type: 'char',
    size: 4
  },
  dept_name: {
    type: 'string',
    size: 40
  },
  $key: ['dept_no']
};

var dept_emp = {
  emp_no: employees.emp_no, //foreign key reference
  dept_no: departments.dept_no, //foreign key reference
  from_date: {
    type: 'date',
  },
  to_date: {
    type: 'date',
  },
  $key: ['emp_no', 'dept_no']
};


var dept_manager = {
  emp_no: employees.emp_no, //foreign key reference
  dept_no: departments.dept_no, //foreign key reference
  from_date: {
    type: 'date',
  },
  to_date: {
    type: 'date',
  },
  $key: ['emp_no', 'dept_no']
};


var titles = {
  emp_no: employees.emp_no, //foreign key reference
  from_date: {
    type: 'date',
  },
  to_date: {
    type: 'date',
  },
  title: {
    type: 'string',
    size: 50
  },
  $key: ['emp_no', 'title', 'from_date']
};
