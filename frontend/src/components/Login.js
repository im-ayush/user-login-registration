import React, {useState, useEffect} from 'react'
import {API} from '../backend.js';

import {connect} from 'react-redux';
import useSafeState from 'react-use-safe-state';
import {getCookie} from '../helpers/getCookie';

const Login = (props) => {
	const [state, setState] = useSafeState({
																			email: "",
																			password: "",
																		})

	const [user, setUser] = useState({})
	const [token, setToken] = useState("")

	const [error, setError] = useState("")

	const loginUser = (event) => {
		event.preventDefault();
			fetch(`${API}auth/login/`, {
	        method: 'POST',
	        headers: {
						'Content-Type': 'application/json',
						'X-CSRFToken': getCookie('csrftoken'),
						'Accept': 'application/json',
					},
	        body: JSON.stringify(state)
		    })
	        .then(response => {
													 	 	if (response.ok) {
													         return response.json();
													     } else {
													         throw new Error('Something went wrong ...');
													     }
													 })
	        .then(json => {
						if (json.token!=="" && json.token!==undefined){
							props.getToken(json.token)
							// setToken(json.token)
							// setUser({...json.user})

																				fetch(`${API}users/${json.user.pk}`, {
																						method: 'GET',
																						headers: {
																							'Authorization': `jwt ${json.token}`
																						},
																					})
																						.then(response => response.json())
																						.then(json => {
																							if (json.is_active){
																								props.getLoggedUser(json);
																						} else{
																							setError(json);
																						}
																					}).catch(e => {
																						setError(e.message);
																					});

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
								<label>
									E-mail
								</label>
							</th>
							<td>
								<input
									type='email'
									placeholder='ayush-mishra@xyz.com'
									value={state.email}
									onChange={(e)=>setState({...state, email: e.target.value})}
									/>
							</td>
						</tr>

						<tr>
							<th>
								<label>
									Password
								</label>
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
								onClick={loginUser}
								>
								Login
							</button>
							</td>
						</tr>
					</tbody>
				</table>

			</form>
		</div>
	)
}


const mapDispatchToProps = (dispatch) => {
	return {
		getLoggedUser: (user) => {dispatch({type:'GET_LOGGED_USER', user })},
		getToken: (token) => {dispatch({type:'GET_JWT', token})}
	}
}

export default connect(null, mapDispatchToProps)(Login)
