export class StudentAlreadyExistisError extends Error{
	constructor(){
		super("Student already exists error");
	}
}