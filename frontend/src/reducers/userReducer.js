const userState = {
	token: "",
	user: {
		id:"",
		username: "",
		email: "",
		dob: "",
		photo: "",
		first_name: "",
		last_name: ""
	}
}

const userReducer = (state=userState, userAction) => {
	// console.log(state);
	switch(userAction.type) {
    case 'GET_LOGGED_USER':
      return {
				...state,
				user: userAction.user
			};
		case 'GET_JWT':
			return {
				...state,
				token: userAction.token
			};
		case 'UPDATE_USER':
      return {...state, user: userAction.user};
		case 'RESET_STORE':
      return {token:"", user:{}};
		default:
			return state;
  }
}

export default userReducer
