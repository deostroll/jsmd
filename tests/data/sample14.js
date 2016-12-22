// Author: Saranya Ramalingam
// Email: rsaranyamcet@gmail.com
// Source: https://conceptdraw.com/a670c3/preview

var MARKS= {
	MarkId:{
   	type: 'long',
   	size: 10
	},
	Student_Id:STUDENTS.Student_Id, //foreign key reference
	Subject_Id:SUBJECTS.Subject_Id, //foreign key reference
	Date:{
   	type: 'TimeStamp',
   	size: 10
	},
	Mark:{
   	type: 'number',
   	size: 5
	},
	$key: ['MarkId']
};

var STUDENTS= {
	Student_Id:{
   	type: 'long',
   	size: 10
	},
	FirstName:{
   	type: 'string',
   	size: 20
	},
	LastName:{
   	type: 'string',
   	size: 20
	},
	Group_Id:GROUPS.Group_Id, //foreign key reference
	$key: ['Student_Id']
};

var GROUPS= {
	Group_Id:{
   	type: 'long',
   	size: 10
	},
	Name:{
   	type: 'string',
   	size: 20
	},
	$key: ['Group_Id']
};

var SUBJECTS= {
	Subject_Id:{
   	type: 'long',
   	size: 10
	},
	Title:{
   	type: 'string',
   	size: 30
	},
	$key: ['Subject_Id']
};

var SUBJ_TEACH= {
	ST_Id:{
   	type: 'long',
   	size: 10
	},
	Subject_Id:SUBJECTS.Subject_Id, //foreign key reference
	Teacher_Id:TEACHERS.Teacher_Id, //foreign key reference
	Group_Id:GROUPS.Group_Id, //foreign key reference
	$key: ['ST_Id']
};

var TEACHERS= {
	Teacher_Id:{
   	type: 'long',
   	size: 10
	},
	FirstName:{
   	type: 'string',
   	size: 20
	},
	LastName:{
   	type: 'string',
   	size: 20
	},
	$key: ['Teacher_Id']
};
