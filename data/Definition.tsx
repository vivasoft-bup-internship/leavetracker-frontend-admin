export const apiBaseUrl = 'http://app:8080';

export type EmployeeField = {
	employeeid: number;
	name: string;
};

export type Employee = {
	employeeid: number;
	managerid: string;
	roleid: string;
	name: string;
	username: string;
	password: string;
}

export type Roles = {
	roleid: number;
	name: string;
	permission: string;
}

//   type LeaveRequest struct {
// 	ID           int       `json:"leaverequestid"`
// 	EmployeeID   int       `json:"employeeid"`
// 	LeaveTypeID  int       `json:"leaveTypeid"`
// 	ApprovedBy   int       `json:"approvedby"`
// 	StartDate    time.Time `json:"startdate"`
// 	EndDate      time.Time `json:"enddate"`
// 	TotalDays    int       `json:"totaldays"`
// 	Status       string    `json:"status"`
// 	RequestDate  time.Time `json:"requestdate"`
// 	ApprovalDate time.Time `json:"approvaldate"`
// }

export type LeaveRequest = {
	leaverequestid: number;
	employeeid: number;
	leavetypeid: number;
	approvedby: number;
	startdate: string;
	enddate: string;
	totaldays: number;
	status: string;
	requestdate: string;
	approvaldate: string;
};

export type LeaveRequestResponse = {
	leaverequestid: number;
	employeename: string;
	leavetypename: string;
	approvedbyname: string;
	startdate: string;
	enddate: string;
	totaldays: number;
	status: string;
	requestdate: string;
	approvaldate: string;
}

export type EmployeeResponse = {
	employeeid: number;
	name: string;
	username: string;
	rolename: string;
	managername: string;
	onleave: boolean;
	bio: string;
	phone: string;
	email: string;
	address: string;
	dob: string;
	profilephoto: string;
	coverphoto: string;
}

export type LeaveRequestForm = {
	employeeid: number;
	leavetypeid: number;
	startdate: string;
	enddate: string;
};


// type LeaveType struct {
// 	ID      int    `json:"leavetypeid"`
// 	Name    string `json:"name"`
// 	MaxDays int    `json:"maxdays"`
// }

export type LeaveTypeForm = {
	name: string;
	maxdays: number;
};

export type LeaveTypeField = {
	leavetypeid: number;
	name: string;
	maxdays: number;
};

export type AllStats = {
	totalrequests: number;
	totalapproved: number;
	totalrejected: number;
	totalpending: number;
}

export function StatusIndicator({ status }) {
	let color;

	switch (status) {
		case 'approved':
			color = 'success';
			break;
		case 'pending':
			color = 'info';
			break;
		case 'rejected':
			color = 'danger';
			break;
		default:
			color = 'secondary';
	}

	return (
		<span className={`badge bg-${color}`}>{status}</span>
	);
}