import React, {useState} from 'react'

import {API} from '../backend.js';

import {getCookie} from '../helpers/getCookie';

import {connect} from 'react-redux';

const Register = (props) => {
	const [state, setState] = useState({
																			username: "",
																			first_name: "",
																			last_name: "",
																			dob: "",
																			photo: "",
																			email: "",
																			password: "",
																		})

	const [user, setUser] = useState(props.user)
	const [token, setToken] = useState(props.token)

	const [error, setError] = useState("")

	const registerUser = (event) => {
		event.preventDefault();
		const formData = new FormData();
		formData.append("first_name", state.first_name);
		formData.append("last_name", state.last_name);
		if (typeof(user.photo)==="object"){
			formData.append("photo", user.photo);
		}
		if (typeof(user.dob)==="string"){
			formData.append("dob", user.dob);
		}
		formData.append("email", state.email);
		formData.append("password", state.password);

		fetch(`${API}users/`, {
        method: 'POST',
        headers: {
					'X-CSRFToken': getCookie('csrftoken'),
				},
        body: formData
	    })
        .then(response => response.json())
        .then(json => {
					if (json.token!=="" && json.token!==undefined){
						props.getToken(json.token)
						console.log(json);
					} else{
						setError(json);
					}
				}).catch(e => {
					setError(e.message);
				});
	}


	return (
		<div>
			<form>
				<table>
					<tbody>
						<tr>
							<th>
								<label>First Name</label>
							</th>
							<td>
								<input
									type='text'
									placeholder='Ayush'
									value={state.first_name}
									onChange={(e)=>setState({...state, first_name: e.target.value})}
									/>
							</td>
						</tr>

						<tr>
							<th>
								<label>Last Name</label>
							</th>
							<td>
								<input
									type='text'
									placeholder='Mishra'
									value={state.last_name}
									onChange={(e)=>setState({...state, last_name: e.target.value})}
									/>
							</td>
						</tr>

						<tr>
							<th>
								<label>Date of Birth</label>
							</th>
							<td>
								<input
									type='date'
									value='1997-06-17'
									value={state.dob}
									onChange={(e)=>setState({...state, dob: e.target.value})}
									/>
							</td>
						</tr>

							<tr>
								<th>
									<label>Profile Picture</label>
								</th>
								<td>
									<input
										style={{"textAlignLast": "center"}}
										type="file"
										accept="image/*"
										defaultValue={state.photo}
										onChange={(e)=>setState({...state, photo: e.target.files[0]})}
										/>
								</td>
							</tr>

							<tr>
								<th>
									<label>E-mail</label>
								</th>
								<td>
									<input
										type='email'
										placeholder='ayush-mishra@xyz.com'
										value={state.email}
										onChange={(e)=>setState({...state, email:e.target.value})}
										/>
								</td>
							</tr>

							<tr>
								<th>
									<label>Password</label>
								</th>
								<td>
									<input
										type='password'
										placeholder='password'
										value={state.password}
										onChange={(e)=>setState({...state, password: e.target.value})}
										/>
								</td>
							</tr>

							<tr>
								<td colSpan="2">
									<button
										onClick={registerUser}
										>
										Sign Up
									</button>
								</td>
							</tr>
					</tbody>
				</table>

			</form>
		</div>
	)
}

const mapStateToProps = (state, ownProps) => {
	return {
		token: state.token,
		user: {...state.user}
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		getLoggedUser: (user) => {dispatch({type:'GET_LOGGED_USER', user})},
		getToken: (token) => {dispatch({type:'GET_JWT', token})}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)
