import React, {useState, useEffect} from 'react'

import UserProfile from './UserProfile';
import Login from '../Login';
import Register from '../Register';

import {API} from '../../backend.js';

import {connect} from 'react-redux';

const Dashboard = (props) => {
	const [state, setState] = useState({
																			fname: "",
																			lname: "",
																			dob: "",
																			picuture: "",
																			email: "",
																			password: "",
																		})

	const [user, setUser] = useState(props.user)
	const [token, setToken] = useState(props.token)

	const [error, setError] = useState("")

	const [formState, setFormState] = useState({
																			showLogin: true,
																			showRegister: false,
																		})

	useEffect(() => {

		setUser(props.user);
		setToken(props.token);
	});

	if (token==="" || token===undefined) {
		return (
			<div>
					<table>
						<tbody>
							<tr>
								<td>
									<button
										className="tab"
										onClick={(e)=>setFormState({
																						showLogin: true,
																						showRegister: false,
																					})}
										>
										Log In
									</button>
								</td>
								<td>
									<button
										className="tab"
										onClick={(e)=>setFormState({
																						showLogin: false,
																						showRegister: true,
																					})}
										>
										Sign Up
									</button>
								</td>
							</tr>
							<tr>
								<td rowSpan="5" colSpan="2">
									{formState.showLogin && <Login/>}
									{formState.showRegister && <Register/>}
								</td>
							</tr>
						</tbody>
					</table>
			</div>
		)
	}
	else{
		return (
			<div>
				<UserProfile/>
			</div>
		)
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		token: state.token,
		user: {...state.user}
	}
}

export default connect(mapStateToProps)(Dashboard)
